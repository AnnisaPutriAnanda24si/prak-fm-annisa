-- ============================================================
-- PART 0: CLEANUP - Hapus semua objects sebelum re-run
-- Jalankan ini dulu jika SQL sudah pernah dijalankan (walaupun error)
-- Urutan penting: policies → triggers → functions → tables → types
-- ============================================================

-- 1. Hapus RLS policies terlebih dahulu (mereka depend on is_admin())
DROP POLICY IF EXISTS "Admin full access to profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admin full access to products" ON products;
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admin full access to orders" ON orders;
DROP POLICY IF EXISTS "Members can view own orders" ON orders;
DROP POLICY IF EXISTS "Members can insert own orders" ON orders;
DROP POLICY IF EXISTS "Admin full access to order_items" ON order_items;
DROP POLICY IF EXISTS "Members can view own order_items" ON order_items;
DROP POLICY IF EXISTS "Members can insert own order_items" ON order_items;

-- 2. Hapus triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_order_completed ON orders;

-- 3. Hapus functions (sudah aman karena policies sudah dihapus)
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_order_completed();
DROP FUNCTION IF EXISTS public.is_admin();

-- 4. Hapus tables (CASCADE untuk hapus dependent objects)
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 5. Hapus custom enum types
DROP TYPE IF EXISTS public.user_role;
DROP TYPE IF EXISTS public.order_status;
DROP TYPE IF EXISTS public.member_tier;
