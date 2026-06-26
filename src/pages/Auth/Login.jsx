import { useState } from "react"
import { BsFillExclamationDiamondFill } from "react-icons/bs"
import { ImSpinner2 } from "react-icons/im"
import { MdSignalWifiOff, MdCloudOff } from "react-icons/md"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [errorType, setErrorType] = useState("generic") // "generic", "server", "network", "credentials"
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
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
        setErrorType("generic")

        try {
            await signIn(dataForm.email, dataForm.password)
            navigate("/")
        } catch (err) {
            const msg = err.message || ""
            
            // Deteksi jenis error untuk pesan yang lebih informatif
            if (msg.includes("Failed to fetch") || msg.includes("NetworkError") || msg.includes("jaringan")) {
                setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.")
                setErrorType("network")
            } else if (msg.includes("500") || msg.includes("Internal Server Error") || msg.includes("server error")) {
                setError("Server autentikasi mengalami gangguan (error 500). Silakan coba lagi dalam beberapa saat.")
                setErrorType("server")
            } else if (msg.includes("Invalid login credentials") || msg.includes("Email not confirmed")) {
                setError(msg === "Invalid login credentials" 
                    ? "Email atau password salah. Silakan periksa kembali."
                    : msg)
                setErrorType("credentials")
            } else {
                setError(msg || "Login gagal. Silakan coba lagi.")
                setErrorType("generic")
            }
        } finally {
            setLoading(false)
        }
    }

    const errorStyles = {
        generic: "bg-red-200 border-red-400 text-red-700",
        server: "bg-orange-100 border-orange-400 text-orange-700",
        network: "bg-yellow-100 border-yellow-400 text-yellow-700",
        credentials: "bg-red-200 border-red-400 text-red-700",
    }

    const errorIcons = {
        generic: <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg shrink-0" />,
        server: <MdCloudOff className="text-orange-600 me-2 text-lg shrink-0" />,
        network: <MdSignalWifiOff className="text-yellow-600 me-2 text-lg shrink-0" />,
        credentials: <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg shrink-0" />,
    }

    const errorInfo = error ? (
        <div className={`mb-5 p-5 text-sm font-light rounded-xl border flex items-start ${errorStyles[errorType]}`}>
            {errorIcons[errorType]}
            <span>{error}</span>
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
                Welcome Back 👋
            </h2>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        name="email"
                        onChange={handleChange}
                        value={dataForm.email}
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        name="password"
                        onChange={handleChange}
                        value={dataForm.password}
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <Link to="/forgot" className="text-sm text-green-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-green-600 hover:underline font-medium">
                    Register
                </Link>
            </p>
        </div>
    )
}
