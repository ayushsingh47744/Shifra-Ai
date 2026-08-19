// import { generateGeminiResponse } from "../Configs/gemini.js"
// import User from "../Models/user.model.js"


// export const getAgentConfig = async (req, res) => {
//     try {
//         const { userId } = req.params

//         const user = await User.findById(userId).select("-geminiApiKey")
//         if (!user) {
//             return res.status(404).json({ message: "failed to get user" })
//         }

//         return res.status(200).json({ message: "Agent Config data ", user })

//     } catch (error) {
//         return res.status(500).json({ message: `Agent Config failed ${error}` })
//     }
// }


// export const askAgent = async (req, res) => {
//     try {
//         const { message, userId, history } = req.body

//         if (!message || !userId) {
//             return res.status(400).json({ message: "Message and UserId are required" })
//         }

//         const user = await User.findById(userId)

//         if (!user) {
//             return res.status(404).json({ message: "User is not found" })
//         }
//         if (!user.geminiApiKey) {
//             return res.status(400).json({ message: "gemini apikey is not added" })
//         }

//         if (user.plan === "free"
//             && user.totalMessages >= user.requestLimit) {
//             return res.status(400).json({ message: "Free limit reached" })
//         }

//         if (user.plan === "pro" && new Date(user.proExpiresAt) < new Date()) {
//             user.plan === "free"

//             await user.save()

//             return res.status(400).json({ message: "Pro plan expired" })
//         }

//         const cleanMessage = message.toLowerCase()

//         if (user.enableNavigation) {

//             // Navigation Commands
//             const navigationWords = [

//                 "open",
//                 "go",
//                 "start",
//                 "show",
//                 "navigate",
//                 "take me",

//             ];

//             // Check navigation intent
//             const wantsNavigation =
//                 navigationWords.some((word) =>

//                     cleanMessage.startsWith(word)
//                 );

//             // User wants navigation
//             if (wantsNavigation) {

//                 // Find matching page
//                 const matchedPage =
//                     user.pages.find((page) =>

//                         page.keywords.some((keyword) =>

//                             cleanMessage.includes(
//                                 keyword.toLowerCase()
//                             )
//                         )
//                     );

//                 // Page found
//                 if (matchedPage) {

//                     // Already open
//                     if (
//                         req.body.currentPath ===
//                         matchedPage.path
//                     ) {

//                         return res.json({

//                             success: true,

//                             response:
//                                 `${matchedPage.name} already open`

//                         });
//                     }

//                     // Navigate
//                     return res.json({

//                         success: true,

//                         action: "navigate",

//                         path: matchedPage.path,

//                         response:
//                             `Opening ${matchedPage.name}`,

//                     });
//                 }
//             }
//         }



//         const languageMap = {
//             "en-US": "English",
//             "hi-IN": "Hindi",
//         };

//         const responseLanguage = languageMap[user.language] || "English";

//         const historyText =
//             Array.isArray(history) && history.length > 0
//                 ? history
//                       .map((h) => `${h.role === "user" ? "User" : "Agent"}: ${h.text}`)
//                       .join("\n")
//                 : "No previous conversation.";

//         const prompt = `

// You are ${user.agentName}.

// Business Name:
// ${user.businessName}

// Business Type:
// ${user.businessType}

// Business Description:
// ${user.businessDescription}

// Agent Tone:
// ${user.tone}

// Previous Conversation:
// ${historyText}


// Rules:

// - Respond ONLY in ${responseLanguage}
// - Keep replies under 15 words
// - Give fast direct responses
// - Talk naturally
// - Use previous conversation for context if relevant
// - Behave like smart voice agent
// - Avoid long explanations
// - Keep responses short for quick voice playback

// User Question:
// ${message}

// `;

//      const aiResponse = await generateGeminiResponse({prompt ,apikey: user.geminiApiKey , user })

//     if(user.plan === "free"){
//         user.totalMessages += 1

//      await user.save()

//     }
//     return  res.json({
//                 success: true,
//                 aiResponse
//             });

//     } catch (error) {

//         console.log(error)

//         return  res.status(500).json({
//                 success: false,
//                 message:
//                     "Agent AI Error",
//             });

//     }
// }

import { generateGeminiResponse } from "../Configs/gemini.js"
import User from "../Models/user.model.js"
import Conversation from "../Models/conversation.model.js"


export const getAgentConfig = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await User.findById(userId).select("-geminiApiKey")
        if (!user) {
            return res.status(404).json({ message: "failed to get user" })
        }

        return res.status(200).json({ message: "Agent Config data ", user })

    } catch (error) {
        return res.status(500).json({ message: `Agent Config failed ${error}` })
    }
}


export const askAgent = async (req, res) => {
    try {
        const { message, userId, history, visitorId } = req.body

        if (!message || !userId) {
            return res.status(400).json({ message: "Message and UserId are required" })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User is not found" })
        }
        if (!user.geminiApiKey) {
            return res.status(400).json({ message: "gemini apikey is not added" })
        }

        if (user.plan === "free"
            && user.totalMessages >= user.requestLimit) {
            return res.status(400).json({ message: "Free limit reached" })
        }

        if (user.plan === "pro" && new Date(user.proExpiresAt) < new Date()) {
            user.plan === "free"

            await user.save()

            return res.status(400).json({ message: "Pro plan expired" })
        }

        const cleanMessage = message.toLowerCase()

        if (user.enableNavigation) {

            const navigationWords = [
                "open", "go", "start", "show", "navigate", "take me",
            ];

            const wantsNavigation =
                navigationWords.some((word) =>
                    cleanMessage.includes(word)
                );

            if (wantsNavigation) {

                const matchedPage =
                    user.pages.find((page) =>
                        page.keywords.some((keyword) =>
                            cleanMessage.includes(keyword.toLowerCase())
                        )
                    );

                if (matchedPage) {

                    if (req.body.currentPath === matchedPage.path) {
                        return res.json({
                            success: true,
                            response: `${matchedPage.name} already open`
                        });
                    }

                    return res.json({
                        success: true,
                        action: "navigate",
                        path: matchedPage.path,
                        response: `Opening ${matchedPage.name}`,
                    });
                }
            }
        }

        const languageMap = {
            "en-US": "English",
            "hi-IN": "Hindi",
        };

        const responseLanguage = languageMap[user.language] || "English";

        const historyText =
            Array.isArray(history) && history.length > 0
                ? history
                      .map((h) => `${h.role === "user" ? "User" : "Agent"}: ${h.text}`)
                      .join("\n")
                : "No previous conversation.";

        const prompt = `

You are ${user.agentName}.

Business Name:
${user.businessName}

Business Type:
${user.businessType}

Business Description:
${user.businessDescription}

Agent Tone:
${user.tone}

Previous Conversation:
${historyText}


Rules:

- Respond ONLY in ${responseLanguage}
- Keep replies under 15 words
- Give fast direct responses
- Talk naturally
- Use previous conversation for context if relevant
- Behave like smart voice agent
- Avoid long explanations
- Keep responses short for quick voice playback

User Question:
${message}

`;

        const aiResponse = await generateGeminiResponse({ prompt, apikey: user.geminiApiKey, user })

        if (user.plan === "free") {
            user.totalMessages += 1
            await user.save()
        }

        // Save conversation (non-blocking — agar fail bhi ho, response user ko mil jaana chahiye)
        if (visitorId) {
            try {
                let conversation = await Conversation.findOne({ userId, visitorId, status: "ongoing" })

                if (!conversation) {
                    conversation = new Conversation({ userId, visitorId, messages: [] })
                }

                conversation.messages.push({ role: "user", text: message })
                conversation.messages.push({ role: "agent", text: aiResponse })

                await conversation.save()
            } catch (saveError) {
                console.log("Conversation save failed:", saveError)
            }
        }

        return res.json({
            success: true,
            aiResponse
        });

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            success: false,
            message: "Agent AI Error",
        });

    }
}
