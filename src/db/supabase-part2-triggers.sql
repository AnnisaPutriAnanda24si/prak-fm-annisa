-- ============================================================
-- PART 2: TRIGGERS & HELPER FUNCTIONS
-- ============================================================

-- Helper function: Check if current user is Admin (SECURITY DEFINER)
-- to avoid infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'Admin'
    );
$$;

-- Trigger: Auto-create profile on user registration
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
