import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const Verify = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("verifying") // "verifying" | "success" | "error"
    const [message, setMessage] = useState("Verifying your email...")
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`${process.env.VITE_BACKEND_URL}/api/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.message === "Email Verified Successfully") {
                    setStatus("success")
                    setMessage("Email Verified Successfully")
                    setTimeout(() => navigate('/login'), 2000)
                } else {
                    setStatus("error")
                    setMessage("Invalid or Expired Token")
                }
            } catch (error) {
                console.log(error)
                setStatus("error")
                setMessage("Verification Failed. Please try again.")
            }
        }
        verifyEmail()
    }, [token, navigate])

    const iconMap = {
        verifying: <Loader2 size={32} className="text-white animate-spin" />,
        success: <CheckCircle size={32} className="text-white" />,
        error: <XCircle size={32} className="text-white" />,
    }

    const colorMap = {
        verifying: '#4d7c6f',
        success: '#4d7c6f',
        error: '#c0392b',
    }

    const currentColor = colorMap[status]

    return (
        <div className="min-h-screen w-full flex bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">

            {/* LEFT SIDE: Brand Panel */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden"
                style={{ backgroundColor: currentColor, transition: 'background-color 0.6s ease' }}
            >
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-white/10 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-black/10 rounded-full blur-[100px] opacity-40" />

                <div className="relative z-10 max-w-md text-white">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30"
                    >
                        <Leaf size={32} className="text-white" />
                    </motion.div>
                    <h2 className="text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                        One last step <br />
                        <span className="opacity-60">to your garden.</span>
                    </h2>
                    <p className="text-white/70 text-lg mt-4">
                        Confirming your identity keeps your notes safe and secure.
                    </p>
                </div>

                {/* Floating glass card */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-20 w-64 h-80 bg-white/10 backdrop-blur-lg rounded-4xl border border-white/20"
                />
            </motion.div>

            {/* RIGHT SIDE: Status Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, ...iosSpring }}
                    className="w-full max-w-md text-center"
                >
                    {/* Animated Icon */}
                    <motion.div
                        key={status}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ ...iosSpring }}
                        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                        style={{ backgroundColor: currentColor, boxShadow: `0 20px 40px ${currentColor}33` }}
                    >
                        {iconMap[status]}
                    </motion.div>

                    <motion.h1
                        key={message}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-gray-900 tracking-tight"
                    >
                        {message}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 mt-3 text-base"
                    >
                        {status === "verifying" && "Please wait while we confirm your email address."}
                        {status === "success" && "Redirecting you to login in a moment..."}
                        {status === "error" && "The verification link may have expired. Please request a new one."}
                    </motion.p>

                    {/* Progress bar for success redirect */}
                    {status === "success" && (
                        <motion.div
                            className="mt-8 h-1 rounded-full bg-gray-100 overflow-hidden"
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: currentColor }}
                            />
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Verify