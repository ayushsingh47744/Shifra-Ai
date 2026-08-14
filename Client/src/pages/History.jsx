import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchConversations } from "../api/conversation.api"

function History() {
    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const navigate = useNavigate()

    const loadConversations = async () => {
        setLoading(true)
        try {
            const filters = {}
            if (search) filters.search = search
            if (statusFilter) filters.status = statusFilter

            const data = await fetchConversations(filters)
            setConversations(data.conversations)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadConversations()
    }, [statusFilter])

    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60)
        const sec = seconds % 60
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
    }

    return (
        <div className="p-6 min-h-screen bg-white dark:bg-gray-950">
            <h1 className="text-2xl font-bold mb-4 text-[#081028] dark:text-gray-50">Conversation History</h1>

            <div className="flex gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Search transcripts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && loadConversations()}
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 rounded w-64"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded"
                >
                    <option value="">All Status</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : conversations.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No conversations found.</p>
            ) : (
                <div className="space-y-3">
                    {conversations.map((conv) => (
                        <div
                            key={conv._id}
                            // onClick={() => navigate(`/dashboard/history/${conv._id}`)}
                            onClick={() => navigate(`/history/${conv._id}`)}
                            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
                        >
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-800 dark:text-gray-100">Visitor: {conv.visitorId.slice(0, 8)}</span>
                                <span className={`text-sm px-2 py-1 rounded ${conv.status === "completed" ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400" : "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400"}`}>
                                    {conv.status}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Duration: {formatDuration(conv.duration)} • {conv.messageCount} messages
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 truncate">
                                Last: {conv.lastMessage}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {new Date(conv.startTime).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default History