import axios from 'axios'
import { KeyRound, Loader2, Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const ChangePassword = () => {
    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()

    const handleChangePassword = async () => {
        setError("")
        setSuccess("")
        if (!newPassword || !confirmPassword) { setError("Please fill in all fields"); return }
        if (newPassword !== confirmPassword) { setError("Passwords do not match"); return }
        try {
            setIsLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/change-password/${email}`, { newPassword, confirmPassword })
            setSuccess(res.data.message)
            setTimeout(() => navigate('/login'), 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden px-8">

            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ...iosSpring }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Icon + Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ ...iosSpring }}
                        className="w-20 h-20 bg-[#4d7c6f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4d7c6f]/20"
                    >
                        <KeyRound size={32} className="text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Change Password</h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Set a new password for <span className="text-[#4d7c6f] font-semibold">{email}</span>
                    </p>
                </div>

                {/* Error / Success */}
                {error && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mb-5 bg-red-50 px-4 py-3 rounded-2xl text-center">
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                        className="text-[#4d7c6f] text-sm mb-5 bg-[#4d7c6f]/10 px-4 py-3 rounded-2xl text-center">
                        {success}
                    </motion.p>
                )}

                <div className="space-y-5">
                    {/* New Password */}
                    <div className="space-y-1.5 relative">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">New Password</label>
                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                        />
                        <button type="button" onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 bottom-4 text-gray-400">
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5 relative">
                        <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 bottom-4 text-gray-400">
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleChangePassword}
                        disabled={isLoading}
                        className="w-full bg-[#4d7c6f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isLoading ? <><Loader2 className="animate-spin" size={20} /> Changing...</> : "Change Password"}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}

export default ChangePassword