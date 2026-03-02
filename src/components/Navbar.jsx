import { Leaf, LogOut, User, BookOpen, ChevronDown } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getData } from '../../context/userContext'
import axios from 'axios'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const { user, setUser } = getData()
    const accessToken = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`, {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            if (res.data.success) {
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 font-[-apple-system,BlinkMacSystemFont,sans-serif] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 bg-[#4d7c6f] rounded-xl flex items-center justify-center shadow-lg shadow-[#4d7c6f]/20 group-hover:scale-105 transition-transform">
                        <Leaf size={18} className="text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">Note<span className="text-[#4d7c6f]">Leaf</span></span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 cursor-pointer outline-none"
                            >
                                <div className="w-9 h-9 rounded-full bg-[#4d7c6f] border-2 border-[#4d7c6f]/10 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                    {user?.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 p-1.5 z-50"
                                    >
                                        <div className="px-3 py-2">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account</p>
                                            <p className="text-sm font-bold text-gray-900 truncate">{user.fullName}</p>
                                        </div>
                                        <hr className="border-gray-50 my-1" />
                                        <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                            <User size={15} /> Profile
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                            <BookOpen size={15} /> My Notes
                                        </button>
                                        <hr className="border-gray-50 my-1" />
                                        <button
                                            onClick={logoutHandler}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                                        >
                                            <LogOut size={15} /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                Login
                            </Link>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    to="/signup"
                                    className="bg-[#4d7c6f] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#4d7c6f]/20 hover:shadow-[#4d7c6f]/30 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar