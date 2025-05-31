-- Fix event images and update old dates to future dates
-- This script updates placeholder images with actual event images
-- and moves past events to future dates for demo purposes

-- Update images for specific events based on their names
UPDATE events SET image = '/assets/eventosImg/imagen_2.jpg' WHERE name = 'Laboratorio Taller: Herramientas artisticas creativas';
UPDATE events SET image = '/assets/eventosImg/imagen_6.jpg' WHERE name = 'Lanzamiento del libro: "Piriri Teatro"';
UPDATE events SET image = '/assets/eventosImg/imagen_9.jpg' WHERE name = 'Open Mic';
UPDATE events SET image = '/assets/eventosImg/imagen_1.jpg' WHERE name = 'Un Métier Sérieux';
UPDATE events SET image = '/assets/eventosImg/imagen_3.jpg' WHERE name = 'Nicole Arz | Tributo a Laferte';
UPDATE events SET image = '/assets/eventosImg/imagen_4.jpg' WHERE name = 'Black Baby Roast';
UPDATE events SET image = '/assets/eventosImg/imagen_5.jpg' WHERE name = 'Juanma Ferreira & Los Socios del Altillo como Yendo al Sur';
UPDATE events SET image = '/assets/eventosImg/imagen_7.jpg' WHERE name = 'Tributo: System of a down';
UPDATE events SET image = '/assets/eventosImg/imagen_8.jpg' WHERE name = 'Ayvu + Una sola primavera';
UPDATE events SET image = '/assets/eventosImg/imagen_10.jpg' WHERE name = '3 Decaídas';
UPDATE events SET image = '/assets/eventosImg/imagen_11.jpg' WHERE name = 'Voyage - Clásicos del Rock';
UPDATE events SET image = '/assets/eventosImg/imagen_12.jpg' WHERE name = 'Mi Bosque - Victor Beckelmann';
UPDATE events SET image = '/assets/eventosImg/imagen_13.jpg' WHERE name = 'Gala de Aniversario por los 34 años de la Universidad del Norte';
UPDATE events SET image = '/assets/eventosImg/imagen_14.jpg' WHERE name = 'Full Smoke | Noche especial de Blues';
UPDATE events SET image = '/assets/eventosImg/imagen_15.jpg' WHERE name = 'Si Escucho el Tren, no necesito ver la estación.';
UPDATE events SET image = '/assets/eventosImg/imagen_16.jpg' WHERE name = 'GEA - Obras de Laura Piñeiro';
UPDATE events SET image = '/assets/eventosImg/imagen_17.jpg' WHERE name = 'Donde habitan las formas';
UPDATE events SET image = '/assets/eventosImg/imagen_18.jpg' WHERE name = 'Resonancia';
UPDATE events SET image = '/assets/eventosImg/imagen_19.jpg' WHERE name = 'Feria de Vinilos, CDs y Cassettes';
UPDATE events SET image = '/assets/eventosImg/imagen_20.jpg' WHERE name = 'El Supremo visto por los jóvenes';
UPDATE events SET image = '/assets/eventosImg/imagen_21.jpg' WHERE name = '¡Buscá, encontrá y cambiá!';
UPDATE events SET image = '/assets/eventosImg/imagen_22.jpg' WHERE name = 'Lanzamiento del Libro: "Hernandarias"';
UPDATE events SET image = '/assets/eventosImg/imagen_23.jpg' WHERE name = 'Imprudentes';
UPDATE events SET image = '/assets/eventosImg/imagen_24.jpg' WHERE name = 'Antología de Yerbatales';
UPDATE events SET image = '/assets/eventosImg/imagen_25.jpg' WHERE name = 'Orbis Veritas';
UPDATE events SET image = '/assets/eventosImg/imagen_26.jpg' WHERE name = 'Guerra Gaja';
UPDATE events SET image = '/assets/eventosImg/imagen_27.jpg' WHERE name = 'Tributo a The Cure Bloodflowers';
UPDATE events SET image = '/assets/eventosImg/imagen_28.jpg' WHERE name = 'Historia del Arte';
UPDATE events SET image = '/assets/eventosImg/imagen_29.jpg' WHERE name = 'Lanzamiento del libro: Leyes de superación gravitacional';
UPDATE events SET image = '/assets/eventosImg/imagen_30.jpg' WHERE name = 'Taller de iniciación a la escritura creativa';

-- Update past events to future dates for demo purposes
-- Move May 27 events to June 3
UPDATE events SET date = '2025-06-03' WHERE date = '2025-05-27';

-- Move May 28 events to June 4
UPDATE events SET date = '2025-06-04' WHERE date = '2025-05-28';

-- Move May 29 events to June 5
UPDATE events SET date = '2025-06-05' WHERE date = '2025-05-29';

-- Move May 30 events to June 6
UPDATE events SET date = '2025-06-30' WHERE date = '2025-05-30';

-- Keep May 31 events as they are (today)

-- Remove any test events
DELETE FROM events WHERE id LIKE 'test-%';

-- Verify the updates
SELECT id, name, date, image 
FROM events 
WHERE date >= CURRENT_DATE 
ORDER BY date, time 
LIMIT 10;