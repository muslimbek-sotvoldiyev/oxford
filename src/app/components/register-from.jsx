"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { sendToTelegram } from "@/lib/send-telegram-bot"
import { motion, AnimatePresence } from "framer-motion"

const courses = [
  "Ingliz tili",
  "Rus tili",
  "Matematika",
  "Kimyo",
  "Biologiya",
  "Ona tili",
  "Tarix",
  "Huquq",
  "Geografiya",
  "Prezident maktablariga tayyorlov",
  "Kompyuter savodxonligi",
  "FrontEnd dasturlash",
  "Backend dasturlash",
  "IT dasturlash",
  "Kompyuter grafikasi",
  "Robototexnika",
  "Pazandachilik",
  "Uy hamshiralik",
]

export default function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    phone: "",
    course: "Ingliz tili",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [activeField, setActiveField] = useState(null)

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

  // New phone number formatting function
  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, "")

    // Limit to 9 digits
    const trimmedDigits = digitsOnly.slice(0, 9)

    // Format phone number
    if (trimmedDigits.length <= 2) {
      return trimmedDigits
    } else if (trimmedDigits.length <= 5) {
      return `${trimmedDigits.slice(0, 2)} ${trimmedDigits.slice(2)}`
    } else if (trimmedDigits.length <= 7) {
      return `${trimmedDigits.slice(0, 2)} ${trimmedDigits.slice(2, 5)} ${trimmedDigits.slice(5)}`
    } else {
      return `${trimmedDigits.slice(0, 2)} ${trimmedDigits.slice(2, 5)} ${trimmedDigits.slice(5, 7)} ${trimmedDigits.slice(7)}`
    }
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value)

    setFormData((prev) => ({ ...prev, phone: formattedPhone }))

    // Clear error when user types
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.phone
        return newErrors
      })
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Iltimos, ismingizni kiriting"
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Iltimos, familiyangizni kiriting"
    }

    if (!formData.age.trim()) {
      newErrors.age = "Iltimos, yoshingizni kiriting"
    } else if (Number.parseInt(formData.age) < 5 || Number.parseInt(formData.age) > 80) {
      newErrors.age = "Yoshingiz 5 dan 80 gacha bo'lishi kerak"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Iltimos, telefon raqamingizni kiriting"
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, "")
      if (digitsOnly.length !== 9) {
        newErrors.phone = "Telefon raqami aniq 9 raqamdan iborat bo'lishi kerak"
      } else if (!/^(9[01234789]|88|33|71|90|93|94|95|97|98|99|55|77)/.test(digitsOnly)) {
        newErrors.phone = "Noto'g'ri telefon raqami kodi"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await sendToTelegram({
        ...formData,
        phone: "+998 " + formData.phone,
      })
      router.push("/success")
    } catch (error) {
      console.error("Xatolik yuz berdi:", error)
      alert("Ma'lumotlarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }
  // Mobile step-by-step form
  if (isMobile) {
    return (
      <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg overflow-hidden animate-fadeIn relative">
        {/* Top wave decoration */}
        <motion.div
          className="absolute top-0 left-0 w-full h-24 bg-blue-600 rounded-b-[50%] z-0"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        ></motion.div>

        <div className="relative z-10 p-6">
          <motion.div
            className="flex justify-center mb-8 mt-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg">
              <img src="/image.png" alt="logo" className="rounded-full" />
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-center mb-1 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Oxford O'quv Markazi
          </motion.h2>

          <motion.p
            className="text-blue-100 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Biz bilan o'qish orqali eng yaxshi bilim va tajribaga ega bo'ling!
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Progress indicator */}
            <div className="flex justify-between mb-6">
              {["firstname", "lastname", "age", "phone", "course"].map((step, index) => (
                <motion.div
                  key={step}
                  className={`w-8 h-2 rounded-full ${
                    activeField === step
                      ? "bg-blue-600"
                      : Object.keys(formData).indexOf(activeField || "") > index
                        ? "bg-green-500"
                        : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={
                    activeField === step
                      ? {
                          scale: [1, 1.1, 1],
                          transition: {
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          },
                        }
                      : {}
                  }
                ></motion.div>
              ))}
            </div>

            {/* Conditional rendering based on active field */}
            <AnimatePresence mode="wait">
              {(!activeField || activeField === "firstname") && (
                <motion.div
                  key="firstname"
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="firstname" className="block font-medium text-gray-700 mb-2 text-lg">
                    Ismingiz
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={formData.firstname}
                    onChange={handleChange}
                    onFocus={() => setActiveField("firstname")}
                    className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.firstname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.firstname && (
                      <motion.p
                        className="text-red-500 text-sm mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.firstname}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    onClick={() => {
                      if (!formData.firstname.trim()) {
                        setErrors((prev) => ({ ...prev, firstname: "Iltimos, ismingizni kiriting" }))
                        return
                      }
                      setActiveField("lastname")
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition mt-4 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Keyingi
                  </motion.button>
                </motion.div>
              )}

              {activeField === "lastname" && (
                <motion.div
                  key="lastname"
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="lastname" className="block font-medium text-gray-700 mb-2 text-lg">
                    Familiyangiz
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Familiyangizni kiriting"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.lastname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.lastname && (
                      <motion.p
                        className="text-red-500 text-sm mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.lastname}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      type="button"
                      onClick={() => setActiveField("firstname")}
                      className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Orqaga
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (!formData.lastname.trim()) {
                          setErrors((prev) => ({ ...prev, lastname: "Iltimos, familiyangizni kiriting" }))
                          return
                        }
                        setActiveField("age")
                      }}
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Keyingi
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeField === "age" && (
                <motion.div
                  key="age"
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="age" className="block font-medium text-gray-700 mb-2 text-lg">
                    Yoshingiz
                  </label>
                  <input
                    id="age"
                    type="number"
                    placeholder="Yoshingizni kiriting"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.age ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <AnimatePresence>
                    {errors.age && (
                      <motion.p
                        className="text-red-500 text-sm mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.age}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      type="button"
                      onClick={() => setActiveField("lastname")}
                      className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Orqaga
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        if (!formData.age.trim()) {
                          setErrors((prev) => ({ ...prev, age: "Iltimos, yoshingizni kiriting" }))
                          return
                        } else if (Number.parseInt(formData.age) < 5 || Number.parseInt(formData.age) > 80) {
                          setErrors((prev) => ({ ...prev, age: "Yoshingiz 5 dan 80 gacha bo'lishi kerak" }))
                          return
                        }
                        setActiveField("phone")
                      }}
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Keyingi
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeField === "phone" && (
                <motion.div
                  key="phone"
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="phone" className="block font-medium text-gray-700 mb-2 text-lg">
                    Telefon raqamingiz
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">+998</span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="90 123 45 67"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pl-16 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Misol: 90 123 45 67 (9 ta raqam)</p>
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        className="text-red-500 text-sm mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      type="button"
                      onClick={() => setActiveField("age")}
                      className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Orqaga
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        const digitsOnly = formData.phone.replace(/\D/g, "")
                        if (digitsOnly.length !== 9) {
                          setErrors((prev) => ({
                            ...prev,
                            phone: "Telefon raqami aniq 9 raqamdan iborat bo'lishi kerak",
                          }))
                          return
                        } else if (!/^(9[01234789]|88|33|71|90|93|94|95|97|98|99|55|77)/.test(digitsOnly)) {
                          setErrors((prev) => ({ ...prev, phone: "Noto'g'ri telefon raqami kodi" }))
                          return
                        }
                        setActiveField("course")
                      }}
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Keyingi
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeField === "course" && (
                <motion.div
                  key="course"
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <label htmlFor="course" className="block font-medium text-gray-700 mb-2 text-lg">
                    Kursni tanlang
                  </label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  >
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      type="button"
                      onClick={() => setActiveField("phone")}
                      className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Orqaga
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Yuborilmoqda...
                        </>
                      ) : (
                        "Yuborish"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    )
  }

  // Desktop version with side-by-side layout
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Info */}
      <motion.div
        className="bg-blue-600 p-8 text-white md:w-2/5 flex flex-col justify-center items-center"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24  rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 },
          }}
        >
          <img src="/image.png" alt="logo" className="rounded-full" />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oxford O'quv Markazi
        </motion.h2>

        <motion.p
          className="text-blue-100 text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Biz bilan o'qish orqali eng yaxshi bilim va tajribaga ega bo'ling!
        </motion.p>

        <motion.div
          className="bg-blue-500/30 p-4 rounded-lg w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="font-medium text-lg mb-2">Bizning kurslarimiz:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-100">
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
              Ingliz tili
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
              Matematika
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
              Kompyuter savodxonligi
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}>
              FrontEnd dasturlash
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}>
              Va boshqalar...
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
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
          Ro'yxatdan o'tish
        </motion.h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="firstname" className="block font-medium text-gray-700">
                O`quvchining ismi
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Ismingizni kiriting"
                value={formData.firstname}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                }`}
              />
              <AnimatePresence>
                {errors.firstname && (
                  <motion.p
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.firstname}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="lastname" className="block font-medium text-gray-700">
                O`quvchining familiyasi
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Familiyangizni kiriting"
                value={formData.lastname}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.lastname ? "border-red-500" : "border-gray-300"
                }`}
              />
              <AnimatePresence>
                {errors.lastname && (
                  <motion.p
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.lastname}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="age" className="block font-medium text-gray-700">
                Yoshi
              </label>
              <input
                id="age"
                type="number"
                placeholder="Yoshingizni kiriting"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.age ? "border-red-500" : "border-gray-300"
                }`}
              />
              <AnimatePresence>
                {errors.age && (
                  <motion.p
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.age}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label htmlFor="phone" className="block font-medium text-gray-700">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+998</span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="90 123 45 67"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pl-14 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Misol: 90 123 45 67 (9 ta raqam)</p>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label htmlFor="course" className="block font-medium text-gray-700">
              Kursni tanlang
            </label>
            <select
              id="course"
              value={formData.course}
              onChange={(e) => handleSelectChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed mt-6"
            disabled={isSubmitting}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Yuborilmoqda...
              </>
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

