-- ============================================================
-- PART 3: ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
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
