import axios from 'axios'
import { CheckCircle, Loader2, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError("")
            const res = await axios.post(`http://localhost:8000/api/forgot-password`, { email })
            if (res.data.message) {
                navigate(`/verify-otp/${email}`)
                toast.success(res.data.message)
                setEmail("")
            }
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden px-8">

            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ...iosSpring }}
                className="relative z-10 w-full max-w-md"
            >
                {isSubmitted ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ ...iosSpring }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-[#4d7c6f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4d7c6f]/20">
                            <CheckCircle size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Check your inbox</h2>
                        <p className="text-gray-400 mt-3 text-sm">
                            We've sent a reset link to <span className="text-[#4d7c6f] font-semibold">{email}</span>. If you don't see it, check your spam folder or{" "}
                            <button onClick={() => setIsSubmitted(false)} className="text-[#4d7c6f] font-bold hover:underline underline-offset-4">try again</button>.
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Icon + Header */}
                        <div className="text-center mb-10">
                            <motion.div
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ ...iosSpring }}
                                className="w-20 h-20 bg-[#4d7c6f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4d7c6f]/20"
                            >
                                <Mail size={32} className="text-white" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Forgot Password?</h1>
                            <p className="text-gray-500 mt-2 text-sm">Enter your email and we'll send you a reset link.</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm mb-5 bg-red-50 px-4 py-3 rounded-2xl text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <form onSubmit={handleForgotPassword} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#4d7c6f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : "Send Reset Link"}
                            </motion.button>
                        </form>

                        <p className="text-gray-500 text-sm text-center mt-8">
                            Remember your password?{" "}
                            <Link to="/login" className="text-[#4d7c6f] font-bold hover:underline underline-offset-4">Sign in</Link>
                        </p>
                    </>
                )}
            </motion.div>
        </div>
    )
}

export default ForgotPassword