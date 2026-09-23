-- Remove duplicate starter surveys (keep only the first occurrence of each title)
DELETE FROM surveys 
WHERE id NOT IN (
    SELECT MIN(id) 
    FROM surveys 
    WHERE category_id = 'starter'
    GROUP BY title
)
AND category_id = 'starter';

-- Also delete any orphaned questions for removed surveys
DELETE FROM survey_questions 
WHERE survey_id NOT IN (SELECT id FROM surveys);

-- Verify the cleanup
SELECT title, COUNT(*) as count 
FROM surveys 
WHERE category_id = 'starter'
GROUP BY title
ORDER BY title;
