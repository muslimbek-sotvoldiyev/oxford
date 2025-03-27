"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function SuccessMessage() {
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (isMobile) {
    return (
      <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg overflow-hidden relative">
        {/* Top wave decoration */}
        <motion.div
          className="absolute top-0 left-0 w-full h-24 bg-green-500 rounded-b-[50%] z-0"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        ></motion.div>

        <div className="relative z-10 p-6 flex flex-col items-center">
          <motion.div
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-600 text-3xl shadow-lg mt-4 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
              duration: 0.5,
            }}
          >
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              ✓
            </motion.span>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-center mb-2 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Muvaffaqiyatli yuborildi!
          </motion.h2>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md w-full mt-4 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.p
              className="text-gray-600 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Sizning so'rovingiz qabul qilindi. Tez orada mutaxassislarimiz siz bilan bog'lanishadi.
            </motion.p>

            <motion.div
              className="bg-blue-50 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-medium text-blue-800 mb-2 text-center">Oxford O'quv Markazi</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                <motion.span
                  className="text-blue-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1.5,
                    },
                  }}
                >
                  📱
                </motion.span>
                <span>+998 77 323 33 77</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <motion.span
                  className="text-blue-500"
                  animate={{
                    y: [0, -3, 0],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1.5,
                      delay: 0.5,
                    },
                  }}
                >
                  📍
                </motion.span>
                <span>Toshkent shahri, Yunusobod tumani</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="space-y-3 w-full">
            <motion.a
              href="https://maps.app.goo.gl/t46samrMYZh97fk16"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition text-center flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Manzilni ko'rish
            </motion.a>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
              <Link
                href="/"
                className="block w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition text-center border border-gray-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Bosh sahifaga qaytish
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  // Desktop version
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Success message */}
      <motion.div
        className="bg-green-600 p-8 text-white md:w-2/5 flex flex-col justify-center items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-3xl mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: [0.5, 1.2, 1] }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            ✓
          </motion.span>
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Muvaffaqiyatli yuborildi!
        </motion.h2>

        <motion.p
          className="text-green-100 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Sizning so'rovingiz qabul qilindi. Tez orada mutaxassislarimiz siz bilan bog'lanishadi.
        </motion.p>
      </motion.div>

      {/* Right side - Contact info */}
      <motion.div
        className="p-8 md:w-3/5"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Oxford O'quv Markazi
        </motion.h3>

        <motion.div
          className="bg-blue-50 p-5 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="flex items-start gap-3 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span
              className="text-blue-500 text-xl"
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                },
              }}
            >
              📱
            </motion.span>
            <div>
              <h4 className="font-medium text-gray-800">Telefon raqam</h4>
              <p className="text-gray-600">+998 XX XXX XX XX</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.span
              className="text-blue-500 text-xl"
              animate={{
                y: [0, -3, 0],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                },
              }}
            >
              📍
            </motion.span>
            <div>
              <h4 className="font-medium text-gray-800">Manzil</h4>
              <p className="text-gray-600">Buvayda tumani, Yangiqo`rg`on shaharchasi</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              className="text-blue-500 text-xl"
              animate={{
                rotate: [0, 10, 0, -10, 0],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 2,
                  delay: 1,
                },
              }}
            >
              🕒
            </motion.span>
            <div>
              <h4 className="font-medium text-gray-800">Ish vaqti</h4>
              <p className="text-gray-600">Dushanba - Shanba: 9:00 - 18:00</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.a
            href="https://www.google.com/maps/place/Oxford+O'quv+Markazi/@41.2995,69.2401,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Manzilni ko'rish
          </motion.a>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition text-center border border-gray-300 flex items-center justify-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Bosh sahifaga qaytish
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

