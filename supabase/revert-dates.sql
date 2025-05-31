-- Revert dates back to their original values
-- This undoes the date changes and restores real event dates

-- Revert June 3 back to May 27
UPDATE events SET date = '2025-05-27' WHERE date = '2025-06-03';

-- Revert June 4 back to May 28
UPDATE events SET date = '2025-05-28' WHERE date = '2025-06-04';

-- Revert June 5 back to May 29
UPDATE events SET date = '2025-05-29' WHERE date = '2025-06-05';

-- Revert June 30 back to May 30 (note: this was a typo in the original, should have been June 6)
UPDATE events SET date = '2025-05-30' WHERE date = '2025-06-30';

-- Also check if any were set to June 6 and revert those to May 30
UPDATE events SET date = '2025-05-30' WHERE date = '2025-06-06';

-- Verify the reversion
SELECT date, COUNT(*) as event_count 
FROM events 
GROUP BY date 
ORDER BY date;

-- Show sample of events with their restored dates
SELECT id, name, date, time 
FROM events 
ORDER BY date, time 
LIMIT 20;