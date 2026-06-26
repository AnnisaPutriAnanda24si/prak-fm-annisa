-- ============================================================
-- E-Commerce Dashboard & Member System - FULL SCHEMA
-- 
-- INSTRUKSI: Jalankan 4 part secara berurutan:
--   1. supabase-part1-enums-tables.sql
--   2. supabase-part2-triggers.sql
--   3. supabase-part3-rls.sql
--   4. supabase-part4-points-seed.sql
-- ============================================================

-- Untuk menjalankan sekaligus, copy dari sini sampai akhir file:

-- ============================================================
-- PART 1: ENUM TYPES & TABLES
-- ============================================================
CREATE TYPE user_role AS ENUM ('Admin', 'Member', 'Guest');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold');

CREATE TABLE profiles (
    id              uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name       text,
    role            user_role DEFAULT 'Member',
    tier            member_tier DEFAULT 'Bronze',
    total_points    integer DEFAULT 0,
    created_at      timestamp with time zone DEFAULT now()
);

CREATE TABLE products (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    description text,
    price       numeric NOT NULL,
    stock       integer NOT NULL DEFAULT 0,
    image_url   text,
    created_at  timestamp with time zone DEFAULT now()
);

CREATE TABLE orders (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         uuid REFERENCES profiles(id) ON DELETE SET NULL,
    total_amount    numeric NOT NULL,
    status          order_status DEFAULT 'pending',
    points_earned   integer DEFAULT 0,
    created_at      timestamp with time zone DEFAULT now()
);

CREATE TABLE order_items (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id            uuid REFERENCES orders(id) ON DELETE CASCADE,
    product_id          uuid REFERENCES products(id) ON DELETE SET NULL,
    quantity            integer NOT NULL,
    price_at_purchase   numeric NOT NULL
);

-- ============================================================
-- PART 2: TRIGGERS & HELPER FUNCTIONS
-- ============================================================

-- SECURITY DEFINER helper untuk menghindari infinite recursion di RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'Admin'
    );
$$;

-- Trigger: auto-create profile saat user register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, tier, total_points)
    VALUES (
        new.id,
        new.raw_user_meta_data->>'full_name',
        'Member',
        'Bronze',
        0
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- PART 3: ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Admin full access to profiles"
    ON profiles FOR ALL TO authenticated
    USING (public.is_admin());

CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT TO authenticated
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE TO authenticated
    USING (id = auth.uid());

-- PRODUCTS
CREATE POLICY "Admin full access to products"
    ON products FOR ALL TO authenticated
    USING (public.is_admin());

CREATE POLICY "Anyone can view products"
    ON products FOR SELECT TO authenticated
    USING (true);

-- ORDERS
CREATE POLICY "Admin full access to orders"
    ON orders FOR ALL TO authenticated
    USING (public.is_admin());

CREATE POLICY "Members can view own orders"
    ON orders FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Members can insert own orders"
    ON orders FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- ORDER ITEMS
CREATE POLICY "Admin full access to order_items"
    ON order_items FOR ALL TO authenticated
    USING (public.is_admin());

CREATE POLICY "Members can view own order_items"
    ON order_items FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

CREATE POLICY "Members can insert own order_items"
    ON order_items FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.user_id = auth.uid()
        )
    );

-- ============================================================
-- PART 4: POINTS TRIGGER & SEED DATA
-- ============================================================

-- Trigger: auto-hitung poin saat order status jadi 'completed'
CREATE OR REPLACE FUNCTION public.handle_order_completed()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    points_to_add INTEGER;
    new_tier member_tier;
    current_points INTEGER;
BEGIN
    points_to_add := FLOOR(NEW.total_amount / 10000);
    NEW.points_earned := points_to_add;

    UPDATE profiles
    SET total_points = total_points + points_to_add
    WHERE id = NEW.user_id
    RETURNING total_points INTO current_points;

    IF current_points > 1500 THEN
        new_tier := 'Gold';
    ELSIF current_points >= 501 THEN
        new_tier := 'Silver';
    ELSE
        new_tier := 'Bronze';
    END IF;

    UPDATE profiles SET tier = new_tier WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_completed
    BEFORE UPDATE OF status ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed')
    EXECUTE FUNCTION public.handle_order_completed();

-- SEED DATA: 20 produk sample
INSERT INTO products (name, description, price, stock) VALUES
    ('Wireless Mouse M330', 'Ergonomic wireless mouse with silent clicks', 250000, 45),
    ('Mechanical Keyboard K845', 'RGB mechanical keyboard with Cherry MX switches', 850000, 20),
    ('UltraSharp 27 Monitor', '27-inch 4K UHD monitor with IPS panel', 4500000, 12),
    ('ThinkPad E14 Gen 5', 'Business laptop with Intel Core i5', 12500000, 8),
    ('MacBook Air M2', 'Apple laptop with M2 chip, 13.6-inch display', 16999000, 15),
    ('iPhone 15 Pro', 'Apple smartphone with A17 Pro chip', 19500000, 25),
    ('Galaxy S24 Ultra', 'Samsung flagship with S Pen and AI features', 18999000, 18),
    ('WH-1000XM5 Headphones', 'Sony wireless noise-cancelling headphones', 4200000, 30),
    ('AirPods Pro 2nd Gen', 'Apple wireless earbuds with ANC', 3499000, 40),
    ('Ergonomic Office Chair', 'Adjustable lumbar support chair', 1850000, 10),
    ('Standing Desk Electric', 'Electric height-adjustable standing desk', 3200000, 7),
    ('HD Webcam C920e', '1080p webcam with autofocus', 950000, 22),
    ('External SSD T7 1TB', 'Portable SSD with 1050MB/s read speed', 1650000, 50),
    ('MicroSD Ultra 128GB', 'High-speed microSD for cameras and drones', 180000, 100),
    ('DualSense Controller', 'PS5 wireless controller with haptic feedback', 999000, 14),
    ('Gaming Mouse DeathAdder', 'Razer ergonomic gaming mouse', 450000, 35),
    ('Smart TV 43 Inch 4K', 'LG 43-inch 4K UHD Smart TV', 4100000, 9),
    ('Air Purifier 4 Compact', 'Xiaomi smart air purifier', 1199000, 16),
    ('Coffee Maker Machine', 'DeLonghi automatic coffee machine', 2750000, 5),
    ('Electric Kettle 1.5L', 'Philips fast-boil electric kettle', 350000, 28);
