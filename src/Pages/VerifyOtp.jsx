import axios from 'axios'
import { CheckCircle, Leaf, Loader2, RotateCcw } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const iosSpring = { type: "spring", stiffness: 300, damping: 30 }

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) { setError("Please enter all 6 digits"); return }
    try {
      setIsLoading(true)
      setError("")
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/verify-otp/${email}`, { otp: finalOtp })
      setSuccessMessage(res.data.message)
      setIsVerified(true)
      setTimeout(() => navigate(`/change-password/${email}`), 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
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
        {isVerified ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...iosSpring }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-[#4d7c6f] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#4d7c6f]/20">
              <CheckCircle size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verified!</h2>
            <p className="text-gray-400 mt-2">{successMessage || "Redirecting you to reset your password..."}</p>
            <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm">Redirecting...</span>
            </div>
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
                <Leaf size={32} className="text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Enter OTP</h1>
              <p className="text-gray-500 mt-2 text-sm">
                We've sent a 6-digit code to <span className="text-[#4d7c6f] font-semibold">{email || "your email"}</span>
              </p>
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

            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-full aspect-square text-center text-2xl font-bold bg-[#f5f5f7] border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#4d7c6f] transition-all outline-none"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerify}
                disabled={isLoading || otp.some((d) => d === "")}
                className="w-full bg-[#4d7c6f] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-[#4d7c6f]/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <><Loader2 className="animate-spin" size={20} /> Verifying...</> : "Verify Code"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearOtp}
                disabled={isLoading}
                className="w-full py-4 rounded-2xl font-bold text-gray-500 bg-[#f5f5f7] flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw size={18} />
                Clear
              </motion.button>
            </div>

            <p className="text-gray-500 text-sm text-center mt-8">
              Wrong email?{" "}
              <Link to="/forgot-password" className="text-[#4d7c6f] font-bold hover:underline underline-offset-4">Go back</Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default VerifyOTP