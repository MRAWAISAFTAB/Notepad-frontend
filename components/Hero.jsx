import { ArrowRight, Zap, Leaf } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getData } from '../context/userContext'
import { motion } from 'framer-motion'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const Hero = () => {
    const { user } = getData()
    const navigate = useNavigate()

    return (
        <div className="relative w-full min-h-screen bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] flex items-center justify-center overflow-hidden">

            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

                {/* Welcome badge if logged in */}
                {user && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...iosSpring }}
                        className="inline-flex items-center gap-2 bg-[#4d7c6f]/10 text-[#4d7c6f] text-sm font-semibold px-4 py-2 rounded-full mb-6"
                    >
                        <Leaf size={14} />
                        Welcome back, {user.username}
                    </motion.div>
                )}

                {/* AI Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, ...iosSpring }}
                    className="inline-flex items-center gap-2 bg-[#4d7c6f]/10 text-[#4d7c6f] text-sm font-semibold px-4 py-2 rounded-full mb-8"
                >
                    <Zap size={14} />
                    New: AI-powered note organization
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, ...iosSpring }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6"
                >
                    Your thoughts,{' '}
                    <span className="text-[#4d7c6f]">organized</span>
                    <br />and accessible everywhere
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, ...iosSpring }}
                    className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto mb-10"
                >
                    Capture ideas, organize thoughts, and collaborate seamlessly. The modern note-taking app that grows with you.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, ...iosSpring }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/create-todo')}
                        className="bg-[#4d7c6f] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 flex items-center gap-2"
                    >
                        Start Taking Notes
                        <ArrowRight size={20} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 rounded-2xl font-bold text-gray-600 bg-white border-2 border-gray-100 hover:bg-gray-50 transition-colors text-lg"
                    >
                        Watch Demo
                    </motion.button>
                </motion.div>

                {/* Fine print */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-sm text-gray-400"
                >
                    Free forever • No credit card required • 2 minutes setup
                </motion.p>
            </div>
        </div>
    )
}

export default Hero