-- Make a user an admin by their email
-- Replace 'your-email@example.com' with the actual email

UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';

-- Verify the change
SELECT id, email, full_name, is_admin, role 
FROM public.profiles 
WHERE email = 'your-email@example.com';
