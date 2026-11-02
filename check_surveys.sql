-- Check all surveys and their category_id values
SELECT id, title, category_id, is_active, category FROM surveys ORDER BY id;

-- Count surveys by category_id
SELECT category_id, COUNT(*) as count 
FROM surveys 
GROUP BY category_id;

-- Check specifically for starter surveys
SELECT id, title, category_id 
FROM surveys 
WHERE category_id = 'starter' OR category_id IS NULL OR category_id = '';
