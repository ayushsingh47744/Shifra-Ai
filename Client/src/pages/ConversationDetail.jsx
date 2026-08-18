import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchConversationById } from "../api/conversation.api"

function ConversationDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [conversation, setConversation] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchConversationById(id)
                setConversation(data.conversation)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    if (loading) return <p className="p-6 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen">Loading...</p>
    if (!conversation) return <p className="p-6 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen">Conversation not found.</p>

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950">
        <div className="p-6 max-w-2xl mx-auto">
            <button onClick={() => navigate(-1)} className="text-sm text-blue-600 dark:text-blue-400 mb-4">← Back</button>

            <h1 className="text-xl font-bold mb-1 text-[#081028] dark:text-gray-50">Conversation Transcript</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Visitor: {conversation.visitorId} • Status: {conversation.status}
            </p>

            <div className="space-y-4">
                {conversation.messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2 rounded-lg ${
                            msg.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                        }`}>
                            <p className="text-xs opacity-70 mb-1">{msg.role === "user" ? "User" : "AI"}</p>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
}

export default ConversationDetail
