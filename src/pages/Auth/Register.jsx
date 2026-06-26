import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (evt) => {
        const { name, value } = evt.target
        setDataForm({
            ...dataForm,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.")
            setLoading(false)
            return
        }

        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter.")
            setLoading(false)
            return
        }

        try {
            await signUp(dataForm.email, dataForm.password, dataForm.fullName)
            setSuccess("Registrasi berhasil! Silakan cek email Anda untuk verifikasi.")
            setDataForm({ fullName: "", email: "", password: "", confirmPassword: "" })
        } catch (err) {
            setError(err.message || "Registrasi gagal. Silakan coba lagi.")
        } finally {
            setLoading(false)
        }
    }

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null

    const successInfo = success ? (
        <div className="bg-green-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-green-600 me-2 text-lg" />
            {success}
        </div>
    ) : null

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <ImSpinner2 className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            {errorInfo}
            {successInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={dataForm.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Your full name"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Min 6 characters"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:underline font-medium">
                    Login
                </Link>
            </p>
        </div>
    )
}
