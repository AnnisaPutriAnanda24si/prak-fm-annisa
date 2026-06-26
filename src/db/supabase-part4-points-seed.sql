-- ============================================================
-- PART 4: POINTS TRIGGER & SEED DATA
-- ============================================================

-- Trigger: Auto-calculate points when order is completed
CREATE OR REPLACE FUNCTION public.handle_order_completed()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
    points_to_add INTEGER;
    new_tier member_tier;
    current_points INTEGER;
BEGIN
    -- Calculate points: setiap Rp 10.000 = 1 poin
    points_to_add := FLOOR(NEW.total_amount / 10000);

    -- Set points earned on the order
    NEW.points_earned := points_to_add;

    -- Update user's total points in profile
    UPDATE profiles
    SET total_points = total_points + points_to_add
    WHERE id = NEW.user_id
    RETURNING total_points INTO current_points;

    -- Update tier based on total points
    IF current_points > 1500 THEN
        new_tier := 'Gold';
    ELSIF current_points >= 501 THEN
        new_tier := 'Silver';
    ELSE
        new_tier := 'Bronze';
    END IF;

    UPDATE profiles
    SET tier = new_tier
    WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_completed
    BEFORE UPDATE OF status ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'completed' AND OLD.status IS DISTINCT FROM 'completed')
    EXECUTE FUNCTION public.handle_order_completed();

-- ============================================================
-- SEED DATA: Insert sample products
-- ============================================================
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
