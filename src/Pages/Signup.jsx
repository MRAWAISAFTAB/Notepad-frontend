import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Leaf, ShieldCheck, Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        try {
            setIsLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, formData, {
                headers: { "Content-Type": "application/json" }
                
            })
            console.log(res.data) // add this
            if (res.data.message) {
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
    const message = error?.response?.data?.errors?.[0] || error?.response?.data?.message || 'Something went wrong'
    toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">
            
            {/* LEFT SIDE */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex w-1/2 relative bg-[#4d7c6f] items-center justify-center p-12 overflow-hidden"
            >
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#5e8c7f] rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#3a5e54] rounded-full blur-[100px] opacity-50" />

                <div className="relative z-10 max-w-md text-white">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30"
                    >
                        <Leaf size={32} className="text-white" />
                    </motion.div>
                    <h2 className="text-5xl font-bold tracking-tight leading-[1.1]">
                        Organize your <br /> 
                        <span className="opacity-60">thoughts beautifully.</span>
                    </h2>
                    
                    <div className="mt-12 space-y-6">
                        <FeatureItem icon={<ShieldCheck size={20}/>} text="End-to-end encrypted notes" />
                        <FeatureItem icon={<Sparkles size={20}/>} text="AI-powered summarization" />
                    </div>
                </div>

                <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-20 w-64 h-80 bg-white/10 backdrop-blur-lg rounded-4xl border border-white/20"
                />
            </motion.div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, ...iosSpring }}
                    className="w-full max-w-105"
                >
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Get Started</h1>
                        <p className="text-gray-500 mt-2">Create your NoteLeaf account in seconds.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                            <input 
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Muhammad Awais"
                                required
                                className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="awais@example.com"
                                required
                                className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                            />
                        </div>

                        <div className="space-y-1.5 relative">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#f5f5f7] border-2 border-transparent px-5 py-4 rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none text-[16px]"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 bottom-4 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#4d7c6f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 mt-8 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
                        </motion.button>
                    </form>

                    <footer className="mt-10 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account? <a className="text-[#4d7c6f] font-bold cursor-pointer hover:underline underline-offset-4" href="/login">Log in</a>
                        </p>
                    </footer>
                </motion.div>
            </div>
        </div>
    )
}

const FeatureItem = ({ icon, text }) => (
    <div className="flex items-center gap-4 text-white/90">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            {icon}
        </div>
        <span className="font-medium text-lg">{text}</span>
    </div>
)

export default Signup