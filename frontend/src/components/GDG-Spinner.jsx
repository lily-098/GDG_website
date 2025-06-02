"use client"
import { motion } from "framer-motion"
export default function Spinner() {
  const colors = [
    "bg-blue-500", // Google Blue
    "bg-red-500", // Google Red
    "bg-yellow-500", // Google Yellow
    "bg-green-500", // Google Green
  ]
 const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
      repeatType: "loop",
      duration: 2,
    },
  },
};
  const dotVariants = {
    initial: {
      y: 0,
      scale: 1,
    },
    animate: {
      y: [-20, 0, -20],
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        {/* Pulsing background circle */}
        <motion.div
          className="absolute inset-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          variants={pulseVariants}
          animate="animate"
        />

        {/* Main loader container */}
        <motion.div className="flex space-x-3 relative z-10" variants={containerVariants} animate="animate">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full ${color}`}
              variants={dotVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </motion.div>
      </div>

      {/* GDG Text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Google Developer Groups</h2>
        <motion.p
          className="text-gray-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading amazing content...
        </motion.p>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="mt-6 w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
