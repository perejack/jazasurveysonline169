-- Update all existing surveys that don't have a category_id set to 'starter'
-- This ensures all original free surveys are properly categorized as starter surveys
UPDATE surveys
SET category_id = 'starter'
WHERE category_id IS NULL OR category_id = '';

-- Verify the update
SELECT id, title, category_id FROM surveys ORDER BY id;
