-- Restore all original events with correct dates and images
-- First, let's clear existing events to avoid duplicates
TRUNCATE TABLE events RESTART IDENTITY CASCADE;

-- Now insert all events with their original data
INSERT INTO events (id, name, date, time, address, description, price, image, tag, source_name, event_hash) VALUES
-- Missing events (IDs 1-5)
('event-1', 'Laboratorio Taller: Herramientas artisticas creativas', '2025-05-27', '18:00', 'Galeria Multi Arte', 'TEMARIO:
-Abstracción organica.
-Abstracción figurativa botanica.
-Textura y color.
-Experimentacion Creativa.', '450000', '/assets/eventosImg/imagen_2.jpg', 'Capacitación', 'manual', 'event-1'),

('event-2', 'Lanzamiento del libro: "Piriri Teatro"', '2025-05-27', '19:00', 'Teatro de las Americas del Centro Cultural Paraguayo Aleman', 'Tributo Green Day 🤯', '0', '/assets/eventosImg/imagen_6.jpg', 'Charlas', 'manual', 'event-2'),

('event-3', 'Open Mic', '2025-05-27', '20:00', 'Jazz Cube', 'Tributo Green Day 🤯', '0', '/assets/eventosImg/imagen_9.jpg', 'Música', 'manual', 'event-3'),

('event-4', 'Un Métier Sérieux', '2025-05-27', '19:30', 'Alianza Francesa', '🎬 Ciclo de cine europeo 🇪🇺 | Este martes 27, no te pierdas la proyección de "Un métier sérieux" en la Alianza Francesa de Asunción, una mirada honesta y conmovedora al mundo de la docencia 💼📚', '0', '/assets/eventosImg/imagen_1.jpg', 'Cine', 'manual', 'event-4'),

('event-5', 'Nicole Arz | Tributo a Laferte', '2025-05-28', '21:30', 'Jazz Cube', '', '30000', '/assets/eventosImg/imagen_3.jpg', 'Música', 'manual', 'event-5'),

-- Continue with existing events (6+)
('event-6', 'Black Baby Roast', '2025-05-29', '22:00', 'Mil Noveciento 1900 Comedy Club', 'El jueves 29 de mayo se viene el baby shower más jodido del condado de Hazzard en @1900elclub', '30000', '/assets/eventosImg/imagen_12.jpg', 'Teatro', 'manual', 'event-6'),

('event-7', 'Juanma Ferreira & Los Socios del Altillo como Yendo al Sur', '2025-05-29', '22:00', 'Black Mango', 'Primer viaje para el sur ❣️@blackmangocompany recibe el 29/05 a Juanma Ferreira y Los Socios del Altillo, será la primera fecha de un ciclo de conciertos que tendrá su aterrizaje en el gran Teatro Municipal de Asunción, Ignacio A. Pane, el 23 de julio. Vení a disfrutar de buenísima música, sabores irresistibles y la mejor onda de la ciudad. 👫🪘👬🎷👭📻🇦🇷🌞🇺🇾🌞🇵🇾😎🤝📸☺️🤩', '30000', '/assets/eventosImg/imagen_13.jpg', 'Música', 'manual', 'event-7'),

('event-8', 'Tributo: System of a down', '2025-05-29', '18:00', 'Sacramento Brewing Co.', 'Vuelve el tributo a @systemofadown este Jueves 29 de Mayo! Te esperamos en @sacramentobrewc para cantar y romper todo 🔥🤘🏻 No podes faltar 🔥🤘🏻', '0', '/assets/eventosImg/imagen_14.jpg', 'Música', 'manual', 'event-8'),

('event-9', 'Ayvu + Una sola primavera', '2025-05-29', '18:50', 'Teatro de las Americas del CCPA', 'Proyección del teaser de "Ayvu" y el largometraje "Una Sola Primavera".', '0', '/assets/eventosImg/imagen_15.jpg', 'Cine', 'manual', 'event-9'),

('event-10', '3 Decaídas', '2025-05-29', '21:30', 'The Comedy Club Asunción', '3 DECAíDAS 🦿 - SEGUNDA EDICIÓN', '50000', '/assets/eventosImg/imagen_16.jpg', 'Teatro', 'manual', 'event-10'),

('event-11', 'Voyage - Clásicos del Rock', '2025-05-29', '22:00', 'Jazz Cube', '', '30000', '/assets/eventosImg/imagen_17.jpg', 'Música', 'manual', 'event-11'),

('event-12', 'Mi Bosque - Victor Beckelmann', '2025-05-30', '19:30', 'BGN Galeria de Arte', 'Les esperamos el Miercoles 30 de Abril a las 19:30 h para la muestra "Mi bosque" de Victor Beckelmann', '0', '/assets/eventosImg/imagen_18.jpg', 'Arte', 'manual', 'event-12'),

('event-13', 'Gala de Aniversario por los 34 años de la Universidad del Norte', '2025-05-30', '20:00', 'Teatro de las Americas del CCPA', '', '0', '/assets/eventosImg/imagen_19.jpg', 'Charlas', 'manual', 'event-13'),

('event-14', 'Full Smoke | Noche especial de Blues', '2025-05-30', '22:30', 'Jazz Cube', '', '30000', '/assets/eventosImg/imagen_20.jpg', 'Música', 'manual', 'event-14'),

('event-15', 'Si Escucho el Tren, no necesito ver la estación.', '2025-05-31', '19:00', 'Instituto Paraguayo Aleman', '🎬Te invitamos a participar de éste taller intensivo de escritura audiovisual, impartido por Joaquín Pedretti @joaquim_pedretti. El taller busca ser un espacio de exploración creativa para desarrollar historias a partir de la escucha, y transformarlas en proyectos cinematográficos.', '0', '/assets/eventosImg/imagen_21.jpg', 'Cine', 'manual', 'event-15'),

('event-16', 'GEA - Obras de Laura Piñeiro', '2025-05-31', '17:00', 'Galeria Matices', '✨ El SABADO 31 DE MAYO, Matices Art Gallery abrirá sus puertas para la NOCHE DE GALERÍAS con la muestra "GEA" de Laura Piñeiro, bajo la curaduría de Albán Martínez Gueyraud, en el marco del evento organizado por ASGAPA (Asociación de Galerías de Paraguay).', '0', '/assets/eventosImg/imagen_22.jpg', 'Arte', 'manual', 'event-16'),

('event-17', 'Donde habitan las formas', '2025-05-31', '17:00', 'Galeria Casa Mayor', 'En el marco de la decimoprimera edición de Noche de Galerías, evento organizado por ASGAPA (Asociación de Galerías del Paraguay), Casa Mayor Galería de Arte y Verónica Torres invitan a la inauguración de la Exposición DONDE HABITAN LAS FORMAS de PAZ MORENO RE con la curaduría de Silvana Domínguez.', '0', '/assets/eventosImg/imagen_23.jpg', 'Arte', 'manual', 'event-17'),

('event-18', 'Resonancia', '2025-05-31', '17:00', 'Galeria Viedma', '✨ El renombrado ingeniero que encontró en el dibujo y el metal su lenguaje artístico presenta RESONANCIA en Viedma Galería de Arte. Un recorrido por la trayectoria de quien convirtió sus dibujos en imponentes esculturas que desafían la gravedad.', '0', '/assets/eventosImg/imagen_24.jpg', 'Arte', 'manual', 'event-18'),

('event-19', 'Feria de Vinilos, CDs y Cassettes', '2025-05-31', '11:00', 'Absoluto Rock Bar', 'Invitación abierta y gratuita para todos los interesados en comprar, vender y/o cambiar materiales.', '0', '/assets/eventosImg/imagen_25.jpg', 'Ferias', 'manual', 'event-19'),

('event-20', 'El Supremo visto por los jóvenes', '2025-05-31', '15:00', 'Feria Internacional del Libro', '', '0', '/assets/eventosImg/imagen_26.jpg', 'Charlas', 'manual', 'event-20'),

('event-21', '¡Buscá, encontrá y cambiá!', '2025-05-31', '17:00', 'Punto Divertido', 'Un encuentro para intercambiar libros con otros lectores.', '0', '/assets/eventosImg/imagen_27.jpg', 'Charlas', 'manual', 'event-21'),

('event-22', 'Lanzamiento del Libro: "Hernandarias"', '2025-05-31', '19:00', 'Centro de Convenciones Mariscal', '✨📚 Te invitamos al lanzamiento de la novela histórica "Hernandarias", de la escritora Irina Ráfols, en la Feria Internacional del Libro Asunción ✨📚', '0', '/assets/eventosImg/imagen_28.jpg', 'Charlas', 'manual', 'event-22'),

('event-23', 'Imprudentes', '2025-05-31', '21:00', 'The Comedy Club Asunción', '⚠️ Te traemos un nuevo show de IMPRO para hacerte llegar a junio mientras te divertís con las nuevas figuras de acción de Lollipost que están para el des-mayo…', '30000', '/assets/eventosImg/imagen_29.jpg', 'Teatro', 'manual', 'event-23'),

('event-24', 'Antología de Yerbatales', '2025-05-31', '17:00', 'Galeria Del Rey', 'Una muestra que revive la identidad de un pueblo representada en un surrealismo sublime, donde podrán apreciar en detalle pequeños personajes y otros imponentes, todos ellos expresados a través de una perfecta combinación del grafito y óleo sobre lienzo.', '0', '/assets/eventosImg/imagen_30.jpg', 'Arte', 'manual', 'event-24'),

('event-25', 'Orbis Veritas', '2025-05-31', '17:00', 'Galeria Pablo Avila', 'Este 31 de mayo, desde las 17:00 hasta las 22:00, Galería Pablo Ávila se suma a la 11.ª edición de Noche de Galerías con la muestra "Orbis Veritas", una propuesta curada por Felix Cardozo @felixcardozomarecos que reúne obras de Jorge Ocampos @jorge_ocampos_roa y Renatta Ávila @renattavila', '0', '/assets/eventosImg/imagen_31.jpg', 'Arte', 'manual', 'event-25'),

('event-26', 'Guerra Gaja', '2025-05-31', '17:00', 'Expresiones Galeria de Arte', 'Juan Guerra Gaja fue un artista uruguayo radicado en Paraguay durante los años 80 y 90. Su obra transita del costumbrismo a una expresión personal con rasgos surrealistas y existenciales, consolidando un lenguaje propio centrado en la figura humana y la identidad latinoamericana.', '0', '/assets/eventosImg/imagen_32.jpg', 'Arte', 'manual', 'event-26'),

('event-27', 'Tributo a The Cure Bloodflowers', '2025-05-31', '22:30', 'Jazz Cube', '', '40000', '/assets/eventosImg/imagen_33.jpg', 'Música', 'manual', 'event-27'),

('event-28', 'Historia del Arte', '2025-06-03', '18:00', 'BGN Arte', 'Sumate a este apasionante recorrido por el Renacimiento con el historiador del arte Juanma Talavera.', '500000', '/assets/eventosImg/imagen_34.jpg', 'Capacitación', 'manual', 'event-28'),

('event-29', 'Lanzamiento del libro: Leyes de superación gravitacional', '2025-06-06', '19:00', 'Manzana de la Rivera', 'Te invitamos a ser parte de una noche única en la que celebraremos el lanzamiento de Leyes de Superación Gravitacional, un libro que nace desde lo más profundo del alma y busca inspirarte a elevarte por encima de tus propias barreras.', '0', '/assets/eventosImg/imagen_35.jpg', 'Charlas', 'manual', 'event-29'),

('event-30', 'Taller de iniciación a la escritura creativa', '2025-06-07', '10:30', 'Librería Nicolás Guillén', 'Un espacio para dar tus primeros pasos como escritora o escritor, despertar la imaginación y animarte a escribir desde tu voz.', '80000', '/assets/eventosImg/imagen_36.jpg', 'Capacitación', 'manual', 'event-30'),

('event-31', 'Taller de iniciación a la escritura creativa', '2025-06-21', '10:30', 'Librería Nicolás Guillén', 'Un espacio para dar tus primeros pasos como escritora o escritor, despertar la imaginación y animarte a escribir desde tu voz.', '80000', '/assets/eventosImg/imagen_36.jpg', 'Capacitación', 'manual', 'event-31'),

('event-32', 'Taller de iniciación a la escritura creativa', '2025-06-28', '10:30', 'Librería Nicolás Guillén', 'Un espacio para dar tus primeros pasos como escritora o escritor, despertar la imaginación y animarte a escribir desde tu voz.', '80000', '/assets/eventosImg/imagen_36.jpg', 'Capacitación', 'manual', 'event-32'),

('event-34', 'Alma Nómada', '2025-06-03', '21:00', 'El Jardin del Jaguareté', 'Vení como te sientas más top, liberate, viví tu momento y dejá que tu esencia fluya.', '35000', '/assets/eventosImg/almanomada.png', 'Teatro', 'manual', 'event-34'),

('event-35', 'Bocanada artemisa la mula enas', '2025-06-02', '20:00', 'El Jardin del Jaguareté', '', '25000', '/assets/eventosImg/bocanada.png', 'Música', 'manual', 'event-35'),

('event-38', 'Tribute Live Performance: Artic Monkeys', '2025-05-30', '23:00', 'Black Mango', 'El Viernes 30 de Mayo llega al Mango Tributo a la Banda británica Arctic Monkeys 🐵 les esperamos!', '25000', '/assets/eventosImg/artic.png', 'Música', 'manual', 'event-38'),

('event-39', 'Hilando Arte', '2025-06-07', '16:00', 'Location TBD', 'Taller de pintura y bordado --Inscripciones al 0971355999--', '300000', '/assets/eventosImg/hilandoarte.jpg', 'Capacitación', 'manual', 'event-39'),

('event-39b', '¿Dónde quedó la siesta?', '2025-06-07', '16:30', 'Location TBD', 'Taller de autoedición de textos', '270000', '/assets/eventosImg/dondequedolasiesta.jpg', 'Capacitación', 'manual', 'event-39b'),

('event-40', 'Presentación del libro: "Pequeñas historias que hacen grande la vida"', '2025-05-29', '19:00', 'Location TBD', '', '0', '/assets/eventosImg/pequeniashistorias.jpg', 'Charlas', 'manual', 'event-40'),

('event-41', 'Mengoré Eterno', '2025-05-29', '20:30', 'Location TBD', '', '0', '/assets/eventosImg/mengoreeterno.jpg', 'Música', 'manual', 'event-41');

-- Verify the restoration
SELECT COUNT(*) as total_events FROM events;
SELECT date, COUNT(*) as events_per_date FROM events GROUP BY date ORDER BY date;