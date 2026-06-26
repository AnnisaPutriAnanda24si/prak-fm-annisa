import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://uyktgotxeobcqvfynnpd.supabase.co"
const supabaseAnonKey = "sb_publishable_861xnPODpA5piBCRCdc6Sw_BDMXaNHp"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
