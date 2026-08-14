import Conversation from "../Models/conversation.model.js"

// Get all conversations for logged-in user (dashboard list view)
export const getConversations = async (req, res) => {
    try {
        const userId = req.userId // isAuth middleware se milta hai

        const { language, status, search } = req.query

        const filter = { userId }

        if (status) filter.status = status

        let conversations = await Conversation.find(filter)
            .sort({ createdAt: -1 })
            .select("visitorId status createdAt updatedAt messages")

        // Optional text search in messages (simple, in-memory filter)
        if (search) {
            const searchLower = search.toLowerCase()
            conversations = conversations.filter((conv) =>
                conv.messages.some((m) => m.text.toLowerCase().includes(searchLower))
            )
        }

        const formatted = conversations.map((conv) => {
            const duration = Math.floor(
                (new Date(conv.updatedAt) - new Date(conv.createdAt)) / 1000
            )

            return {
                _id: conv._id,
                visitorId: conv.visitorId,
                status: conv.status,
                startTime: conv.createdAt,
                duration,
                messageCount: conv.messages.length,
                lastMessage: conv.messages[conv.messages.length - 1]?.text || "",
            }
        })

        return res.status(200).json({ success: true, conversations: formatted })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `getConversations error ${error}` })
    }
}


// Get single conversation full transcript
export const getConversationById = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params

        const conversation = await Conversation.findOne({ _id: id, userId })

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" })
        }

        return res.status(200).json({ success: true, conversation })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `getConversationById error ${error}` })
    }
}


// Mark conversation as completed (call this when widget session ends)
export const endConversation = async (req, res) => {
    try {
        const { visitorId, userId } = req.body

        if (!visitorId || !userId) {
            return res.status(400).json({ message: "visitorId and userId required" })
        }

        await Conversation.findOneAndUpdate(
            { userId, visitorId, status: "ongoing" },
            { status: "completed" }
        )

        return res.status(200).json({ success: true, message: "Conversation ended" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `endConversation error ${error}` })
    }
}