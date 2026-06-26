-- ============================================================
-- SEED ACCOUNTS: Admin & Member
-- Aman dijalankan berkali-kali (ada pengecekan duplicate)
-- ============================================================

-- Enable pgcrypto (sudah ada di Supabase, aman di-run ulang)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Buat akun Admin
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@sedap.com') THEN
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, 
            email_confirmed_at, raw_user_meta_data, created_at, updated_at)
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@sedap.com',
            crypt('admin123', gen_salt('bf')),
            now(),
            '{"full_name":"Admin Sedap"}',
            now(),
            now()
        );
    END IF;
END $$;

-- Buat akun Member
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'member@sedap.com') THEN
        INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, 
            email_confirmed_at, raw_user_meta_data, created_at, updated_at)
        VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'member@sedap.com',
            crypt('member123', gen_salt('bf')),
            now(),
            '{"full_name":"Member User"}',
            now(),
            now()
        );
    END IF;
END $$;

-- Update profile Admin (trigger sudah create dgn role 'Member')
UPDATE profiles 
SET role = 'Admin', tier = 'Gold', total_points = 5000
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@sedap.com')
  AND role != 'Admin';

-- Update profile Member (tambah poin awal)
UPDATE profiles 
SET total_points = 100
WHERE id = (SELECT id FROM auth.users WHERE email = 'member@sedap.com')
  AND total_points < 100;
