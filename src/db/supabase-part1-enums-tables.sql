-- ============================================================
-- PART 1: ENUM TYPES & TABLES
-- ============================================================

-- 1. ENUM TYPES
CREATE TYPE user_role AS ENUM ('Admin', 'Member', 'Guest');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled');
CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold');

-- 2. TABLES

-- Table: profiles (synced with auth.users)
CREATE TABLE profiles (
    id              uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name       text,
    role            user_role DEFAULT 'Member',
    tier            member_tier DEFAULT 'Bronze',
    total_points    integer DEFAULT 0,
    created_at      timestamp with time zone DEFAULT now()
);

-- Table: products
CREATE TABLE products (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    description text,
    price       numeric NOT NULL,
    stock       integer NOT NULL DEFAULT 0,
    image_url   text,
    created_at  timestamp with time zone DEFAULT now()
);

-- Table: orders
CREATE TABLE orders (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         uuid REFERENCES profiles(id) ON DELETE SET NULL,
    total_amount    numeric NOT NULL,
    status          order_status DEFAULT 'pending',
    points_earned   integer DEFAULT 0,
    created_at      timestamp with time zone DEFAULT now()
);

-- Table: order_items
CREATE TABLE order_items (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id            uuid REFERENCES orders(id) ON DELETE CASCADE,
    product_id          uuid REFERENCES products(id) ON DELETE SET NULL,
    quantity            integer NOT NULL,
    price_at_purchase   numeric NOT NULL
);
