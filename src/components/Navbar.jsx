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

    // Close dropdown on outside click
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
            toast.error("Logout failed")
        }
    }

    return (
        <nav className="w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 font-[-apple-system,BlinkMacSystemFont,sans-serif] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4d7c6f] rounded-xl flex items-center justify-center">
                        <Leaf size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">Note<span className="text-[#4d7c6f]">Leaf</span></span>
                </Link>

                {/* Nav Links + Actions */}
                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex items-center gap-7 text-[15px] font-medium text-gray-500">
                        <li className="hover:text-gray-900 cursor-pointer transition-colors">Features</li>
                        <li className="hover:text-gray-900 cursor-pointer transition-colors">Pricing</li>
                        <li className="hover:text-gray-900 cursor-pointer transition-colors">About</li>
                    </ul>

                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Avatar Button */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 cursor-pointer outline-none"
                            >
                                <div className="w-9 h-9 rounded-full bg-[#4d7c6f] border-2 border-[#4d7c6f]/30 flex items-center justify-center text-white font-bold text-sm">
                                    {user?.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                            </motion.button>

                            {/* Dropdown */}
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-1 z-50"
                                    >
                                        <div className="px-3 py-2">
                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">My Account</p>
                                            <p className="text-gray-900 text-xs font-semibold truncate">{user?.fullName || user?.username}</p>
                                        </div>
                                        <hr className="border-gray-100 mb-1" />
                                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                            <User size={15} /> Profile
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                            <BookOpen size={15} /> Notes
                                        </button>
                                        <hr className="border-gray-100 my-1" />
                                        <button
                                            onClick={logoutHandler}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                                        >
                                            <LogOut size={15} /> Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {/* Login Link */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    Login
                                </Link>
                            </motion.div>

                            {/* Sign Up Button */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    to="/signup"
                                    className="bg-[#4d7c6f] text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#4d7c6f]/20 hover:bg-[#3d6b5e] transition-all"
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