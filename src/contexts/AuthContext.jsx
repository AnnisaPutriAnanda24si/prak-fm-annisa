import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch profile data from profiles table
    const fetchProfile = async (userId) => {
        if (!userId) {
            setProfile(null)
            return
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle()

        if (error) {
            console.error("Error fetching profile:", error.message)
            // Set fallback profile so user isn't locked out
            setProfile({ role: "Guest", tier: "Bronze", total_points: 0 })
            return
        }

        if (!data) {
            // Profile belum ada (user lama atau trigger belum jalan)
            // Set fallback profile agar user tetap bisa akses
            setProfile({ role: "Guest", tier: "Bronze", total_points: 0 })
            return
        }

        setProfile(data)
    }

    useEffect(() => {
        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)
            if (currentUser) {
                fetchProfile(currentUser.id)
            }
            setLoading(false)
        })

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                const currentUser = session?.user ?? null
                setUser(currentUser)
                if (currentUser) {
                    fetchProfile(currentUser.id)
                } else {
                    setProfile(null)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
        } catch (err) {
            // Error dari server Supabase (sudah punya status code)
            if (err.status) throw err

            // Error jaringan/koneksi
            if (err.message?.includes("Failed to fetch") || err.message?.includes("NetworkError")) {
                throw new Error("Tidak dapat terhubung ke server. Periksa koneksi internet Anda atau coba lagi nanti.")
            }

            // Error tak terduga lainnya
            throw new Error("Gagal terhubung ke server autentikasi. Silakan coba lagi.")
        }
    }

    const signUp = async (email, password, fullName) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })
        if (error) throw error
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setProfile(null)
    }

    const resetPassword = async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login`,
        })
        if (error) throw error
    }

    const value = {
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        isAdmin: profile?.role === "Admin",
        isMember: profile?.role === "Member",
        refreshProfile: () => fetchProfile(user?.id),
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export default AuthContext
