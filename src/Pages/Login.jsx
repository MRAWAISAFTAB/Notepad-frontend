import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '../../context/userContext'

// Design Constants
const accent = '#4d7c6f'
const iosSpring = { type: "spring", stiffness: 300, damping: 30 };

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 5C9.6 39.6 16.3 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.6-2.7 4.8-5 6.3l6.2 5.2C40.3 36.4 44 30.7 44 24c0-1.3-.1-2.7-.4-4z"/>
    </svg>
)

const Login = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`${process.env.VITE_BACKEND_URL}/api/login`, formData, {
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.data.message) {
                // Logic preserved but context dependency removed for now
                console.log("User Data:", res.data.message) 
                localStorage.setItem('accessToken', res.data.accessToken)
                toast.success(res.data.message)
                setUser(res.data.user)  // add this right before navigate('/')
                navigate('/Home')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">
            
            {/* LEFT SIDE: Brand Experience (Desktop Only) */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex w-1/2 relative bg-[#4d7c6f] items-center justify-center p-12 overflow-hidden"
            >
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#5e8c7f] rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#3a5e54] rounded-full blur-[100px] opacity-40" />

                <div className="relative z-10 max-w-md text-white">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30"
                    >
                        <Leaf size={32} className="text-white" />
                    </motion.div>
                    <h2 className="text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                        Welcome back to <br /> 
                        <span className="opacity-60 text-white/80">your digital garden.</span>
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"><ShieldCheck size={20}/></div>
                            <span className="font-medium text-lg text-white">Secure biometric access</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"><Sparkles size={20}/></div>
                            <span className="font-medium text-lg text-white">Synced across all devices</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, ...iosSpring }}
                    className="w-full max-w-105"
                >
                    <header className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Login</h1>
                        <p className="text-gray-500 mt-2">Enter your credentials to access your notes.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                            />
                        </div>

                        <div className="space-y-1.5 relative">
                            <div className="flex justify-between items-center">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#4d7c6f] hover:underline">Forgot?</Link>
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 bottom-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#4d7c6f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                        </motion.button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-px bg-gray-100 flex-1" />
                            <span className="text-[12px] font-bold text-gray-300 uppercase tracking-widest">or</span>
                            <div className="h-px bg-gray-100 flex-1" />
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => window.open('http://localhost:8000/auth/google', '_self')}
                            className="w-full py-4 rounded-2xl text-[15px] font-bold text-gray-700 bg-white border-2 border-gray-100 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </motion.button>
                    </form>

                    <footer className="mt-10 text-center">
                        <p className="text-gray-500 text-sm">
                            New to NoteLeaf? <Link to="/signup" className="text-[#4d7c6f] font-bold hover:underline underline-offset-4">Create Account</Link>
                        </p>
                    </footer>
                </motion.div>
            </div>
        </div>
    )
}

export default Login