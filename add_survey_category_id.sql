-- Add category_id column to surveys table
ALTER TABLE public.surveys ADD COLUMN IF NOT EXISTS category_id TEXT DEFAULT 'starter';

-- Update existing surveys to have category_id based on their category name
-- Starter/free surveys
UPDATE public.surveys SET category_id = 'starter' WHERE category IN ('General', 'Starter', 'Free') OR category IS NULL;

-- Bronze Plus surveys (Technology, Finance, etc.)
UPDATE public.surveys SET category_id = 'bronze_plus' WHERE category IN ('Technology', 'Finance');

-- Silver Plus surveys (Health, Lifestyle)
UPDATE public.surveys SET category_id = 'silver_plus' WHERE category IN ('Health', 'Lifestyle');

-- Gold Plus surveys (Entertainment, Education)
UPDATE public.surveys SET category_id = 'gold_plus' WHERE category IN ('Entertainment', 'Education');

-- Set default for any remaining surveys
UPDATE public.surveys SET category_id = 'starter' WHERE category_id IS NULL;
