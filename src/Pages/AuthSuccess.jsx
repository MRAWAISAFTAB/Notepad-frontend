import { getData } from '../../context/userContext'
import axios from 'axios'
import { Leaf, Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate()

    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get(`${process.env.VITE_BACKEND_URL}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                    if (res.data.success) {
                        setUser(res.data.user)
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                }
            }
        }
        handleAuth()
    }, [navigate])

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ...iosSpring }}
                className="relative z-10 text-center"
            >
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...iosSpring }}
                    className="w-20 h-20 bg-[#4d7c6f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4d7c6f]/20"
                >
                    <Leaf size={32} className="text-white" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Logging you in...</h1>
                <p className="text-gray-400 mt-2 text-sm">Please wait while we set things up.</p>

                <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">Authenticating...</span>
                </div>
            </motion.div>
        </div>
    )
}

export default AuthSuccess