import { Plus, Trash2, Pencil, X, Check, Leaf, LogOut, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../context/userContext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'sonner'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }
const API = import.meta.env.VITE_BACKEND_URL

const Hero = () => {
    const { user, setUser } = getData()
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")

    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editNote, setEditNote] = useState(null)
    const [form, setForm] = useState({ title: "", description: "" })
    const [saving, setSaving] = useState(false)
    const [deletingId, setDeletingId] = useState(null)

    const headers = { Authorization: `Bearer ${accessToken}` }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get(`${API}api/notes`, { headers })
                setNotes(res.data.notes)
            } catch (error) {
                toast.error("Failed to load notes")
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    const openCreate = () => {
        setEditNote(null)
        setForm({ title: "", description: "" })
        setShowModal(true)
    }

    const openEdit = (note) => {
        setEditNote(note)
        setForm({ title: note.title, description: note.description })
        setShowModal(true)
    }

    const handleSave = async () => {
        if (!form.title.trim()) return toast.error("Title is required")
        try {
            setSaving(true)
            if (editNote) {
                const res = await axios.put(`${API}api/notes/${editNote._id}`, form, { headers })
                setNotes(prev => prev.map(n => n._id === editNote._id ? res.data.note : n))
                toast.success("Note updated")
            } else {
                const res = await axios.post(`${API}api/notes`, form, { headers })
                setNotes(prev => [res.data.note, ...prev])
                toast.success("Note created")
            }
            setShowModal(false)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setDeletingId(id)
            await axios.delete(`${API}api/notes/${id}`, { headers })
            setNotes(prev => prev.filter(n => n._id !== id))
            toast.success("Note deleted")
        } catch (error) {
            toast.error("Failed to delete note")
        } finally {
            setDeletingId(null)
        }
    }

    const handleLogout = async () => {
        try {
            await axios.post(`${API}api/logout`, {}, { headers })
            setUser(null)
            localStorage.clear()
            toast.success("Logged out")
            navigate('/login')
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    return (
        <div className="relative w-full min-h-screen bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">

            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

                {/* Refined Header */}
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-[#4d7c6f] rounded-xl flex items-center justify-center shadow-lg shadow-[#4d7c6f]/20">
                            <Leaf size={18} className="text-white" />
                        </div>
                        <span className="font-bold text-2xl text-gray-900 tracking-tight">Note<span className="text-[#4d7c6f]">Leaf</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        {user && (
                            <div className="hidden sm:block text-right leading-tight">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged in as</p>
                                <p className="text-sm font-bold text-gray-900">{user.fullName}</p>
                            </div>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        >
                            <LogOut size={16} /> <span>Logout</span>
                        </motion.button>
                    </div>
                </div>

                {/* Title + Add button */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">My Notes</h1>
                        <p className="text-gray-400 mt-1.5 text-sm font-medium">{notes.length} saved note{notes.length !== 1 ? 's' : ''}</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={openCreate}
                        className="bg-[#4d7c6f] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#4d7c6f]/20 flex items-center gap-2"
                    >
                        <Plus size={20} /> New Note
                    </motion.button>
                </div>

                {/* Notes Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 size={32} className="animate-spin text-[#4d7c6f]" />
                    </div>
                ) : notes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24"
                    >
                        <div className="w-16 h-16 bg-[#4d7c6f]/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                            <Leaf size={28} className="text-[#4d7c6f]" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-700">No notes yet</h2>
                        <p className="text-gray-400 mt-1 text-sm">Click "New Note" to get started</p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        <AnimatePresence>
                            {notes.map((note) => (
                                <motion.div
                                    key={note._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ ...iosSpring }}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{note.title}</h3>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEdit(note)}
                                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(note._id)}
                                                disabled={deletingId === note._id}
                                                className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                {deletingId === note._id
                                                    ? <Loader2 size={14} className="animate-spin" />
                                                    : <Trash2 size={14} />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {note.description && (
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{note.description}</p>
                                    )}
                                    <p className="text-[11px] font-bold text-gray-300 mt-5 uppercase tracking-wider">
                                        {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ ...iosSpring }}
                            className="fixed z-50 inset-0 flex items-center justify-center px-4"
                        >
                            <div className="bg-white rounded-4xl shadow-2xl w-full max-w-md p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                        {editNote ? "Edit Note" : "New Note"}
                                    </h2>
                                    <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                                            placeholder="What's on your mind?"
                                            className="w-full bg-gray-50 border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px] placeholder:text-gray-300"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            value={form.description}
                                            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                            placeholder="Add some details..."
                                            rows={5}
                                            className="w-full bg-gray-50 border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px] resize-none placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 py-4 rounded-2xl font-bold text-white bg-[#4d7c6f] shadow-lg shadow-[#4d7c6f]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <><Check size={18} /> {editNote ? "Save" : "Create"}</>}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Hero