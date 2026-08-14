import axios from "axios"
import { ServerUrl } from "../App"

export const fetchConversations = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString()
    const res = await axios.get(`${ServerUrl}/api/conversation?${params}`, { withCredentials: true })
    return res.data
}

export const fetchConversationById = async (id) => {
    const res = await axios.get(`${ServerUrl}/api/conversation/${id}`, { withCredentials: true })
    return res.data
}