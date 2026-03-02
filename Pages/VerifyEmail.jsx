import React from 'react'
import { motion } from 'framer-motion'
import { Leaf, Mail } from 'lucide-react'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const VerifyEmail = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fbfbfd] font-[-apple-system,BlinkMacSystemFont,sans-serif] overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#4d7c6f] rounded-full blur-[140px] opacity-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#4d7c6f] rounded-full blur-[120px] opacity-10" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, ...iosSpring }}
        className="relative z-10 w-full max-w-md text-center px-8"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...iosSpring }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-[#4d7c6f] shadow-xl shadow-[#4d7c6f]/20"
        >
          <Mail size={32} className="text-white" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Check Your Email</h1>
        <p className="text-gray-400 mt-3 text-base max-w-sm mx-auto">
          We've sent a verification link to your inbox. Click it to activate your NoteLeaf account.
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Leaf size={14} className="text-[#4d7c6f]" />
          <span>NoteLeaf</span>
        </div>
      </motion.div>

    </div>
  )
}

export default VerifyEmail