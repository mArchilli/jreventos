<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ShowService;

class ShowSeeder extends Seeder
{
    public function run(): void
    {
        #region SHOWS/SERVICIO 1: ALFOMBRAS GLAMOUR + DECORACION
        ShowService::create([
            'title' => 'Alfombras Glamour + Decoración',
            'description' => <<<'DESC'
            <p>Servicio de Alfombras Glamour para Eventos. Transforma la entrada de tu evento con nuestro servicio de alfombras glamour. Ofrecemos una amplia selección de alfombras elegantes y sofisticadas que añaden un toque de lujo y estilo a cualquier ocasión, desde bodas y galas hasta eventos corporativos. Nuestras alfombras están disponibles en diversos colores y materiales de alta calidad para complementar la temática y la decoración de tu evento, asegurando una llegada memorable y elegante para tus invitados.</p>
            DESC,
            'img_portada' => 'alfombras-vista.jpg',
            'img_vista' => 'alfombras-vista.jpg',
        ]);
        #endregion

        #region SHOWS/SERVICIO 2: ANIMACION & LOCUCION

        ShowService::create([
            'title' => 'Animación y Locución',
            'description' => <<<'DESC'
                <p>¡Confía en nosotros para llevar tu evento al siguiente nivel! Nuestro equipo ofrece servicios completos de locución y conducción, asegurando que cada momento sea presentado de manera profesional y cautivadora. Además, nos encargaremos de los recibimientos y la animación de las tandas de baile, manteniendo a tus invitados emocionados y comprometidos. Con nuestra experiencia en el manejo de cronogramas, garantizamos que tu evento se desarrolle sin contratiempos.</p>

                <p>¡Deja en nuestras manos la organización y disfruta de un evento impecable y lleno de diversión!</p>

                <p>El servicio incluye:</p>

                <ul>
                    <li>Locución / conducción del evento</li>
                    <li>Recibimientos</li>
                    <li>Animación tandas de baile</li>
                    <li>Presentación de cada momento</li>
                    <li>Manejo de cronograma</li>
                </ul>

                <p>En el siguiente enlace obtendrá más videos: <a href="https://www.youtube.com/watch?v=nhyi73a1Uqk" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=nhyi73a1Uqk</a></p>

                <p>#Animadores #Animador #Locutor #Conductor</p>
                DESC,
            'img_portada' => 'locucion-portada.png',
            'img_vista' => 'locucion-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 3: AMBIENTACION & DECORACION EN FLORES

        ShowService::create([
            'title' => 'Ambientacion & Decoracion en Flores',
            'description' => <<<'DESC'
            <p>Ambientación y Decoración integral en flores naturales y preservadas.</p>

            <p>Fusionamos arte, diseño y creatividad para lograr momentos únicos con herramientas de alta calidad logrando que tú evento sea una experiencia inolvidable. Personalizamos cada detalle buscando una combinación armoniosa y de estilos que lo hagan único.</p>

            <p>Creamos climas exquisitos para que tus invitados se sientan cómodos y disfruten de cada momento. Enriquecemos los diferentes espacios con arreglos florales, estructuras con telas y apliques, atriles de bienvenida, fanales colgantes, accesorios vintage, y todo lo que puedas imaginar en flores naturales o preservadas lo diseñamos para vos y con vos. Contamos con un equipo de ambientadoras certificadas para ofrecerte diseño, logística, producción y coordinación, garantizando que tu acontecimiento sea un éxito.</p>

            <p>Para crear un evento único, innovador e irrepetible es esencial escucharte, conocerte e interpretar cuáles son tus ideas; nosotros te ayudamos a potenciarlas y llevarlas a cabo para que tu día sea soñado.</p>

            <p>Te ofrecemos la personalización y ambientación integral mediante:</p>

            <ul>
                <li>Ramos de diseño para Novias, Civil, Bouqutes, Damas de Honor, Cortejo</li>
                <li>Libro de firmas en madera troquelada</li>
                <li>Deco integral Iglesias y bancos con bouquets</li>
                <li>Photo Call</li>
                <li>Deco de autos de ceremonia</li>
                <li>Centros de mesa, Candelabros en bronce de 5 brazos, Centros en altura, Centros con leds</li>
                <li>Estructuras con arreglos florales y telas</li>
                <li>Atriles de Bienvenida con accesorios</li>
                <li>Deco de eventos al aire libre, Uniones Civiles, Deco de sillas, Altares, Escaleras</li>
                <li>Tiaras, Coronitas, Boutoniers, Tocados, Pins, Lluvia de pétalos</li>
            </ul>

            <p>y todo lo que puedas imaginar, ¡lo creamos!</p>
            DESC,
            'img_portada' => 'ambiente-vista.jpeg',
            'img_vista' => 'ambiente-vista.jpeg',
        ]);
        #endregion

        #region SHOWS/SERVICIO 4: APARICION MAGICA

        ShowService::create([
            'title' => 'Aparicion Magica',
            'description' => <<<'DESC'
            <p>Aparición mágica para todo tipo de eventos. Una experiencia única y sorprendente donde el/la protagonista emerge en asombrosa magia</p>

            <p>- Una manera distinta en tu ingreso -</p>
            DESC,
            'img_portada' => 'magia-portada.png',
            'img_vista' => 'magia-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 5: BAILE NEON

        ShowService::create([
            'title' => 'Baile neón',
            'description' => <<<'DESC'
            <p>¡Prepárate para un increíble espectáculo de baile neón! Nuestro equipo de 4 o 5 bailarines profesionales te deleitará con sus movimientos y energía. Además, proporcionamos disfraces extras para que tus invitados se sumerjan en la experiencia. Disfruta de una coreografía de apertura sorprendente y luego déjate llevar por una coreografía urbana llena de estilo.</p>

            <p>¡Brilla en la pista de baile con nuestra experiencia en baile neón!</p>

            <p>El servicio incluye:</p>

            <ul>
                <li>4 o 5 bailarines profesionales</li>
                <li>Disfraces extra para invitados</li>
                <li>Coreografía de apertura</li>
                <li>Coreografía estilo urbano</li>
            </ul>

            <p>https://youtu.be/KpPx0qbE1Uk</p>
            DESC,
            'img_portada' => 'neon-portada.png',
            'img_vista' => 'neon-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 6: BARRA MOVIL

        ShowService::create([
            'title' => 'Barra Móvil',
            'description' => <<<'DESC'
            <p>Disfruta de la perfección líquida en tu evento con nuestra Barra Móvil: una mezcla de tragos creativos, opciones sin alcohol y deliciosos aperitivos que deleitarán a tus invitados.</p>

            <p>Nuestros expertos mixólogos y equipo profesional se encargarán de brindar una experiencia única, con sabores inigualables y atención impecable. Eleva el nivel de tu evento con nuestra Barra Móvil y déjate sorprender por una explosión de sabor y diversión.</p>

            <p>¡Pide ya nuestro servicio de Barra Móvil!</p>
            DESC,
            'img_portada' => 'barra-vista.jpeg',
            'img_vista' => 'barra-vista.jpeg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 7: BATUCADA

        ShowService::create([
            'title' => 'Batucada',
            'description' => <<<'DESC'
            <p>¡Prepárate para una explosión de ritmo y alegría con nuestra comparsa de batucada profesional! Nuestro talentoso equipo incluye 2 bailarines, 2 bailarinas, 3 percusionistas y 2 trompetistas que te harán vibrar al son de los tambores y los ritmos tropicales. Con una duración de 35 minutos, te sumergirás en un ambiente festivo y lleno de energía. ¡Deja que nuestra batucada profesional te lleve a un viaje lleno de diversión y ritmo!</p>

            <p>El servicio incluye:</p>

            <ul>
                <li>Comparsa profesional</li>
                <li>2 bailarines</li>
                <li>2 bailarinas</li>
                <li>3 percusionistas</li>
                <li>2 trompetistas</li>
                <li>Duración de 35 minutos</li>
            </ul>

            <p>https://youtu.be/W_8qVy_ltSc</p>
            DESC,
            'img_portada' => 'batucada-portada.png',
            'img_vista' => 'batucada-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 8: CABINA DE FOTOS INFLABLE

        ShowService::create([
            'title' => 'Cabina de Fotos Inflable',
            'description' => <<<'DESC'
            <p>¡Agrega diversión instantánea a tu evento con nuestra cabina de fotos! Durante 2 horas, nuestro servicio te brindará momentos inolvidables. Nos encargamos de llevar el cotillón para que te diviertas al máximo en cada foto. Además, personalizamos la tira de foto con la fecha, nombre o temática del evento, dándole un toque especial. Y lo mejor de todo, podés capturar fotos ilimitadas, impresas al instante.</p>

            <p>¡No te pierdas esta oportunidad de crear recuerdos inolvidables con nuestra cabina de fotos!</p>

            <p>El servicio incluye:</p>

            <ul>
                <li>2 horas de servicio</li>
                <li>Llevamos cotillón para el momento de las fotos</li>
                <li>Se personaliza la tira de foto agregándole la fecha/nombre/temática del evento.</li>
                <li>Fotos ilimitadas e impresas en el momento</li>
            </ul>

            DESC,
            'img_portada' => 'fotos-vista.jpeg',
            'img_vista' => 'fotos-vista.jpeg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 9: CATERING

        ShowService::create([
            'title' => 'Catering',
            'description' => <<<'DESC'
            <p><strong>Servicio de Catering Personalizado</strong></p>

            <p><strong>Nivel Básico:</strong> Ofrecemos una selección deliciosa de platos preparados con ingredientes frescos y de calidad, perfectos para reuniones informales y eventos casuales. Incluye opciones variadas de entradas, platos principales y postres.</p>

            <p><strong>Nivel Intermedio:</strong> Ampliamos tu experiencia con un servicio más completo que incluye estaciones de comida en vivo, opciones gourmet y presentaciones cuidadosamente elaboradas. Ideal para eventos corporativos y celebraciones formales.</p>

            <p><strong>Nivel Premium:</strong> Experiencia culinaria de lujo con menús personalizados por chefs experimentados, maridajes exclusivos de vinos y servicio de alto nivel. Diseñado para eventos de gala y ocasiones especiales que requieren lo mejor en gastronomía y atención al detalle.</p>

            <p><strong>Mesa Dulce:</strong> Deléitate con nuestra mesa dulce que ofrece una variedad exquisita de postres artesanales, desde macarons y mini tartas hasta trufas y dulces gourmet. Perfecta para complementar cualquier evento con un toque dulce y elegante.</p>

            <p><strong>Torta:</strong> Nuestras tortas son obras maestras culinarias, diseñadas a medida según tus preferencias. Desde decoraciones clásicas hasta diseños personalizados, cada detalle se cuida para garantizar que sea el centro de atención de tu celebración.</p>
            DESC,
            'img_portada' => 'barra-vista.jpg',
            'img_vista' => 'barra-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 10: GAZEBOS/CARPAS

        ShowService::create([
            'title' => 'Gazebos/Carpas',
            'description' => <<<'DESC'
            <p>Celebra tus eventos con estilo y comodidad con nuestra amplia variedad de gazebos/carpas en diferentes tamaños, con y sin iluminación. Además, ofrecemos sillas, mesas, livings y sistemas de calefacción para asegurar que todos disfruten al máximo.</p>

            <p>En JR, nos enorgullece brindarte una selección de gazebos/carpas que se adaptan a tus necesidades específicas. Ya sea que estés planeando una reunión íntima o un evento de gran envergadura, tenemos la solución perfecta para ti. Nuestros gazebos/carpas están disponibles en una variedad de tamaños para asegurar que haya suficiente espacio para tus invitados y para crear el ambiente adecuado.</p>

            <p>Además, ofrecemos opciones con iluminación incorporada, lo que permitirá que tu evento brille aún más durante la noche.</p>

            <p>Para garantizar la comodidad de sus invitados, también contamos con sillas y mesas. Asimismo, nuestros livings te permitirán crear áreas de descanso y relajación, donde tus invitados podrán disfrutar de momentos especiales y socializar cómodamente.</p>

            <p>Sabemos que la comodidad térmica es fundamental para que todos disfruten del evento sin importar la temporada. Por eso, ofrecemos sistemas de calefacción eficientes y seguros, para que tus invitados se sientan cálidos y acogedores durante toda la celebración.</p>

            <p>Nos comprometemos a brindarte un servicio excepcional y productos de alta calidad. Nuestro equipo estará encantado de ayudarte a seleccionar los elementos ideales para tu evento y de asesorarte en la planificación.</p>

            <p>No pierdas más tiempo y haz de tu evento un éxito inolvidable. ¡Contáctanos ahora mismo y permítenos hacer realidad tus sueños!</p>

            <ul>
                <li>6 x 3 metros cerrado con o sin luz</li>
                <li>6 x 9 metros cerrado con o sin luz</li>
                <li>6 x 12 metros cerrado con o sin luz</li>
                <li>9 x 12 metros cerrado con o sin luz</li>
                <li>Sillas</li>
                <li>Mesas</li>
                <li>Livings</li>
                <li>Manteles</li>
                <li>Caminos</li>
                <li>Hongos calefactores</li>
            </ul>
            DESC,
            'img_portada' => 'gazebos-vista.jpg',
            'img_vista' => 'gazebos-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 11: CO2 EFECTOS ESPECIALES

        ShowService::create([
            'title' => 'CO2 efectos especiales',
            'description' => <<<'DESC'
            <p>¡Prepárate para un espectáculo de impacto con nuestro JET lanzamiento CO2! Con un disparo de 30 segundos, 6 disparos de 5 segundos y 10 disparos de 3 segundos, este equipo te proporcionará emocionantes ráfagas de CO2. Crea efectos visuales impresionantes y dale un toque extra de energía a tu evento con nuestra potente tecnología de lanzamiento CO2.</p>

            <p>¡Sorprende a tus invitados y crea momentos memorables con nuestro JET lanzamiento CO2!</p>

            <p>El servicio puede variar:</p>

            <ul>
                <li>1 disparo de 30 seg</li>
                <li>6 disparos de 5 seg</li>
                <li>10 disparos de 3 seg</li>
            </ul>

            DESC,
            'img_portada' => 'co2-vista.png',
            'img_vista' => 'co2-vista.png',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 12: ESPEJO MAGICO SELFIE

        ShowService::create([
            'title' => 'Espejo Mágico Selfie',
            'description' => <<<'DESC'
            <p>¡Descubre la magia de nuestro Espejo Mágico Selfie! Con su pantalla totalmente táctil, te sumergirás en una experiencia interactiva única. Añade emojis, pelucas y más a tus fotos para hacerlas aún más divertidas. También podrás firmar tus fotos con un toque personal. Y lo mejor de todo, podrás disfrutar de fotos ilimitadas impresas al instante. Con 2 horas de servicio, tendrás tiempo más que suficiente para capturar recuerdos inolvidables.</p>

            <p>◾Interacción con el Espejo: Los invitados se acercan al espejo, donde verán su reflejo en la pantalla totalmente táctil</p>
            <p>◾Fotos: A través de la pantalla, los invitados pueden tomar tres fotos en intervalos de 1 minuto. ¡Sonríe y posa!</p>
            <p>◾Dedicatorias y Personalización: Los invitados pueden escribir dedicatorias en la pantalla y firmar las fotos.</p>
            <p>◾Diversión: Colocar a tus fotos emojis, pelucas, etc para hacerla más divertida</p>
            <p>◾Foto Impresa al Instante: Después de la sesión, recibirán una foto impresa de alta calidad al instante.</p>
            <p>◾Duración: 2 horas de servicio, con personal idóneo.</p>

            <p>¿Qué ofrece el servicio?</p>

            <p>https://youtu.be/19Cu5aVwhKQ</p>
            DESC,
            'img_portada' => 'espejo-vista.jpg',
            'img_vista' => 'espejo-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 13: FOTOGRAFIA Y FILMACION

        ShowService::create([
            'title' => 'Fotografía y Filmación',
            'description' => <<<'DESC'
            <p>Confía en nuestro servicio de fotografía y filmación para capturar cada momento de tu evento. Desde el video cronológico que abarca desde la actuación hasta el fin de fiesta, hasta los momentos espontáneos detrás de escena, nuestro equipo profesional se encargará de documentar cada detalle. Además, recibirás una invitación digital personalizada y una edición digital de alta calidad para revivir los recuerdos una y otra vez. Confía en nosotros para capturar y entregar los momentos más preciosos de tu evento de manera excepcional.</p>

            <p>El servicio incluye:</p>

            <ul>
                <li>Fotografía y Filmación</li>
                <li>Video cronológico, actuación, fin de fiesta</li>
                <li>Backstage</li>
                <li>Invitación digital</li>
                <li>Edición y entrega digital</li>
            </ul>

            DESC,
            'img_portada' => 'fotografia-vista.png',
            'img_vista' => 'fotografia-vista.png',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 14: FUEGOS ARTIFICIALES

        ShowService::create([
            'title' => 'Fuegos artificiales',
            'description' => <<<'DESC'
            <p>¡Prepárate para una experiencia celestial con nuestro increíble espectáculo de fuegos artificiales! Desde mini shows íntimos hasta grandes shows deslumbrantes, y hasta mega shows que te dejarán sin aliento, iluminaremos el cielo para brindarte un espectáculo visual único y emocionante. Disfruta de la magia y la belleza de nuestros fuegos artificiales, creando recuerdos que perdurarán para siempre.</p>

            <p>¡Déjate maravillar por nuestra increíble variedad de shows de fuegos artificiales y vive una experiencia inolvidable!</p>

            <p>El servicio puede ser:</p>

            <ul>
                <li>Mini shows</li>
                <li>Grandes shows</li>
                <li>Mega shows</li>
            </ul>

            DESC,
            'img_portada' => 'fuegos-vista.png',
            'img_vista' => 'fuegos-vista.png',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 15: HUMO BAJO

        ShowService::create([
            'title' => 'Humo Bajo',
            'description' => <<<'DESC'
            <p>¡Dale un toque mágico a tu fiesta con nuestro increíble servicio de Humo Bajo! También conocido como niebla, este efecto asombroso es perfecto para crear ambientes de ensueño en ingresos de cumpleañeras, bodas y cualquier momento que desees resaltar. Atrevete a brillar en tu vals o sorprende a tus invitados con uno de los mejores efectos del momento. ¡No esperes más para hacer de tu evento una experiencia inolvidable!</p>

            <p>https://youtu.be/Q82LE0Z17hA</p>
            DESC,
            'img_portada' => 'humo-portada.jpg',
            'img_vista' => 'humo-portada.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 16: HUMO VERTICAL

        ShowService::create([
            'title' => 'Humo Vertical',
            'description' => <<<'DESC'
            <p>¡Agrega emoción a tus eventos con nuestro servicio de humo vertical!</p>

            <p>Nuestro equipo experto está listo para crear un ambiente único y fascinante que cautivará a tus invitados. Añade adrenalina y emoción a tu ingreso, show, etc... con nuestras impresionantes columnas de humo.</p>

            <p>¡CONTACTA CON NOSOTROS Y ELEVA TU EVENTO A OTRO NIVEL CON NUESTRO SERVICIO DE HUMO VERTICAL!</p>

            <p>https://youtu.be/TivvAL4HSBs</p>
            DESC,
            'img_portada' => 'humovertical-portada.jpg',
            'img_vista' => 'humovertical-portada.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 17: ILUMINACION

        ShowService::create([
            'title' => 'Iluminación',
            'description' => <<<'DESC'
            <p>Transforma tu evento en una experiencia visual inolvidable con nuestro espectacular servicio de iluminación. Nuestros cabezales móviles se moverán en sincronía con la música, creando un ambiente dinámico y cautivador. Los láseres agregarán un toque de magia con sus fascinantes efectos de luz. Los flashes brillantes llenarán el espacio de energía y emoción en los momentos clave. Los tachos LED iluminarán el entorno con una amplia gama de colores vibrantes, creando una atmósfera cautivadora. Con nuestros efectos audiorítmicos, la iluminación se sincronizará con el ritmo de la música, resaltando cada momento. Además, la máquina de humo añadirá un toque misterioso y dramático al ambiente. Confía en nuestro equipo profesional para proporcionar una iluminación de primer nivel y crear una experiencia visual impactante que cautive a todos los asistentes de tu evento.</p>

            <p>Disponemos de:</p>
            <ul>
                <li>Cabezales moviles</li>
                <li>Laser</li>
                <li>Flash</li>
                <li>Tachos LED</li>
                <li>Efectos audioritmicos</li>
                <li>Maquina de humo</li>
                <li>Y muchos más…</li>
            </ul>
            DESC,
            'img_portada' => 'iluminacion-vista.png',
            'img_vista' => 'iluminacion-vista.png',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 18: INVITACION DIGITAL INTERACTIVA

        ShowService::create([
            'title' => 'Invitacion Digital Interactiva',
            'description' => <<<'DESC'
            <p>Invitaciones Digitales Interactivas: modernidad y comodidad para tus eventos. Impresiona desde el primer momento con nuestras invitaciones digitales interactivas. Personalizadas, eco-amigables y fáciles de gestionar, ofrecen una experiencia moderna y eficiente para tus invitados. Diferentes formas de invitación... elegí la que más te guste.</p>

            <p>¡Contacta con nosotros hoy y transforma la manera en que invitas!</p>
            DESC,
            'img_portada' => 'invitacion-vista.jpg',
            'img_vista' => 'invitacion-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 19: LANZAMIENTO DE PAPELES & PETALOS

        ShowService::create([
            'title' => 'Lanzamiento de Papeles & pétalos',
            'description' => <<<'DESC'
            <p>Agrega un toque mágico y festivo a cualquier momento de tu evento con nuestro increíble servicio de lanzamiento de papeles y pétalos. Nuestro equipo experto se encargará de crear un impactante efecto visual, llenando el aire de color y alegría. Contamos con personal dedicado que se encargará de coordinar y ejecutar cada disparo de forma precisa y segura. Además, disponemos del equipamiento necesario para garantizar un lanzamiento espectacular. Ya sea en una boda, una fiesta de cumpleaños o cualquier otra ocasión especial, nuestro servicio de lanzamiento de papeles y pétalos creará momentos inolvidables para ti y tus invitados.</p>

            <p>¡Añade un toque mágico a tu evento con nosotros!</p>

            <p>Para cualquier momento de tu evento:</p>
            <ul>
                <li>Disparo de papeles</li>
                <li>Disparo de pétalos</li>
                <li>Personal a cargo</li>
                <li>Equipamiento</li>
            </ul>

            <p>https://youtu.be/Lx6GPM0fzT4</p>
            DESC,
            'img_portada' => 'petalos-vista.jpeg',
            'img_vista' => 'petalos-vista.jpeg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 20: LETRAS Y NÚMEROS LED

        ShowService::create([
            'title' => 'Letras y números led',
            'description' => <<<'DESC'
            <p>Destaca tus mensajes de manera impactante con nuestras letras y números LED. Con un tamaño de 80x40cm, estas llamativas y elegantes piezas serán el centro de atención en tu evento. Gracias a la tecnología de luz fría LED, brindamos una iluminación brillante y de alta calidad que resalta tus mensajes de forma única. Ya sea para resaltar el nombre del festejado, una fecha especial o cualquier mensaje personalizado, nuestras letras y números LED crearán un ambiente especial y memorable.</p>

            <p>¡Deja que tus palabras brillen con estilo y reserva nuestras letras y números LED para tu próximo evento!</p>

            <ul>
                <li>Medida de 80x40cm</li>
                <li>Luz fría led</li>
                <li>Traslado</li>
            </ul>

            <p>Consultá por símbolos</p>
            DESC,
            'img_portada' => 'letras-vista.jpeg',
            'img_vista' => 'letras-vista.jpeg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 21: LIMOSINA / LIMUSINA

        ShowService::create([
            'title' => 'Limosina / Limusina',
            'description' => <<<'DESC'
            <p>¡Limusina de Eventos Exclusiva! Disfruta de 2 horas de lujo y estilo en nuestro servicio de limusina. Incluye un hermoso ramo de flores para agasajar a la persona especial. Además, encontrarás un frigobar con vino espumante, agua saborizada y refrescos. ¡Reserva ahora y hacé de tu evento una ocasión inolvidable!</p>

            <p>¡Cumplí tu sueño de llegar a tu evento en una limusina!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Duración 2 horas</li>
                <li>Frigobar con bebidas variadas</li>
                <li>Ramo de flores para agasajada/o</li>
            </ul>
            DESC,
            'img_portada' => 'limusina-vista.jpeg',
            'img_vista' => 'limusina-vista.jpeg',
        ]);

        #endregion
     
        #region SHOWS/SERVICIO 22: MAGIA

        ShowService::create([
            'title' => 'Magia',
            'description' => <<<'DESC'
            <p>¡Bienvenidos al show de magia más innovador que hayas presenciado! Nuestra actuación combina el arte de la magia con la última tecnología, creando una experiencia única y sorprendente. A través de trucos modernos y novedosos, te sumergirás en un mundo de ilusiones que desafiarán tus sentidos. Lo mejor de todo es que no serás un mero espectador, ¡sino que serás parte activa del espectáculo! Nuestro mago interactuará con todo el público, involucrándote en cada truco y dejándote boquiabierto. Prepárate para vivir una experiencia mágica inolvidable llena de sorpresas y asombro.</p>

            <p>¡No te pierdas la oportunidad de presenciar nuestro show de magia único en su clase!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Show innovador</li>
                <li>Combinación de magia con tecnología</li>
                <li>Participación de todo el público</li>
                <li>Trucos modernos y novedosos</li>
            </ul>

            <p>https://youtu.be/UKEPSKfg20o</p>
            DESC,
            'img_portada' => 'magia-portada.png',
            'img_vista' => 'magia-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 23: MAQUINA LANZA LLAMAS CON OPERADOR IDÓNEO

        ShowService::create([
            'title' => 'Maquina Lanza Llamas con operador idóneo',
            'description' => <<<'DESC'
            <p>Tira a más de 2.5m de altura. 300 W DMX Lanzallamas ideal: DJ, bandas, stage, machine show, party y fiestas. Esta máquina se puede controlar con una consola DMX 512 o simplemente con el interruptor de encendido; los efectos producidos por múltiples proyectores de llama son muy impresionantes. Es realmente imprescindible para el escenario, la fiesta u otros lugares de entretenimiento.</p>

            <p>El servicio incluye personal idóneo capacitado con todas las medidas de seguridad que requiere.</p>

            <p>#Lanzallamas #Lanzallama</p>
            DESC,
            'img_portada' => 'maquina-vista.jpg',
            'img_vista' => 'maquina-vista.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 24: MELODICO + FIESTA

        ShowService::create([
            'title' => 'Melódico + Fiesta',
            'description' => <<<'DESC'
            <p>¡Vive una experiencia musical interactiva como nunca antes! Nuestro espectáculo cuenta con un cantante y animador profesional que te hará vibrar al ritmo de la música. Acompañado de talentosos bailarines, crearán una atmósfera llena de energía y diversión. Nuestro escenario LED deslumbrante te sumergirá en un espectáculo visualmente impactante, mientras que las chispas frías añadirán un toque de magia al ambiente. Además, podrás capturar momentos inolvidables en nuestro cuadro LED para fotos y disfrutar de una explosión de papeles que llenará el espacio de alegría. Prepárate para participar activamente en esta experiencia musical única e inolvidable.</p>

            <p>¡No te pierdas la oportunidad de vivir una fiesta interactiva llena de música, baile y diversión!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Cantante y animador profesional</li>
                <li>Bailarines profesionales</li>
                <li>Escenario led</li>
                <li>Chispas frías</li>
                <li>Cuadro led para fotos</li>
                <li>Explosión de papeles</li>
            </ul>

            <p>https://youtu.be/zaRdrQGBzZE</p>
            DESC,
            'img_portada' => 'melodico-portada.png',
            'img_vista' => 'melodico-portada.png',
        ]);

        #endregion
   
        #region SHOWS/SERVICIO 25: PANTALLA PROYECTOR

        ShowService::create([
            'title' => 'Pantalla proyector',
            'description' => <<<'DESC'
            <p>Lleva tu evento al siguiente nivel con nuestra impresionante pantalla gigante y proyector de alta calidad. Disfruta de una experiencia visual extraordinaria con nuestra pantalla de 100/120 pulgadas, que te sumergirá en una imagen clara y detallada. Nuestro potente proyector de 3200 lúmenes garantiza una proyección brillante y vívida, incluso en ambientes más iluminados. Además, ofrecemos el soporte necesario para una instalación segura y estable. Nuestro equipo de personal capacitado se encargará de todo, desde la configuración hasta el desmontaje, asegurando un funcionamiento sin problemas. No importa dónde sea tu evento, nos encargamos del traslado para que disfrutes de la mejor experiencia audiovisual.</p>

            <p>¡Reserva ahora y sorprende a tus invitados con nuestra pantalla proyector gigante!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Pantalla de 100/120 pulgadas</li>
                <li>Proyector 3200 lúmenes</li>
                <li>Soporte</li>
                <li>Personal a cargo</li>
                <li>Traslado</li>
            </ul>

            DESC,
            'img_portada' => 'proyector-vista.png',
            'img_vista' => 'proyector-vista.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 26: PANTALLAS LED CON/SIN APERTURA

        ShowService::create([
            'title' => 'Pantallas Led con/sin apertura',
            'description' => <<<'DESC'
            <p>La solución perfecta para todo tipo de eventos. Impacta a tu audiencia con una experiencia visual sorprendente y versátil.</p>

            <p>¡Contáctanos hoy mismo!</p>

            <ul>
                <li>Pantallas P5</li>
                <li>Pantallas con Apertura para ingresos (15 años, Casamientos, Shows, etc)</li>
                <li>Gabinetes 50 x 50</li>
            </ul>

            <p>ARMA LA PANTALLA A TU MEDIDA</p>

            <p>https://youtu.be/Q2mUag2IY3w</p>
            DESC,
            'img_portada' => 'pantalla-portada.jpeg',
            'img_vista' => 'pantalla-portada.jpeg',
        ]);

        #endregion
 
        #region SHOWS/SERVICIO 27: PISO DAMERO

        ShowService::create([
            'title' => 'Piso Damero',
            'description' => <<<'DESC'
            <p>¡Disfruta de un toque clásico y elegante en tus eventos con nuestro piso damero!</p>

            <p>Nuestro piso damero es ideal para todo tipo de eventos, desde fiestas temáticas hasta bodas y eventos corporativos. Con su diseño icónico en blanco y negro, crea un ambiente sofisticado y atractivo que cautivará a tus invitados. Ya sea que desees organizar una fiesta de baile inolvidable o destacar una zona específica de tu evento, nuestro piso damero será el complemento perfecto para hacerlo destacar.</p>

            <p>Agrega estilo y distinción a tu evento con nuestro piso damero. ¡Contáctanos ahora y haz que tu celebración sea inolvidable!</p>

            <ul>
                <li>Medida Standard 6 x 4</li>
                <li>Arma la medida que quieras</li>
            </ul>

            DESC,
            'img_portada' => 'piso-vista.jpg',
            'img_vista' => 'piso-vista.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 28: PISTA LED PIXEL

        ShowService::create([
            'title' => 'Pista Led Pixel',
            'description' => <<<'DESC'
            <p>¡Descubrí las mejores pistas LED PIXEL en un espacio de 3.50 x 3.50! Con múltiples efectos para tus tandas de baile y más, estas pistas te brindarán una experiencia visual impresionante. Además, podrás mostrar palabras y oraciones al instante gracias a nuestro software en la notebook incluida. Nuestro personal estará a cargo de todo para que disfrutes al máximo.</p>

            <p>¡Reserva ahora y disfrutá una fiesta inolvidable!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Medidas 3.50 x 3.50</li>
                <li>Múltiples efectos para tandas de baile, etc</li>
                <li>Palabras, oraciones al instante</li>
                <li>Notebook con software</li>
                <li>Personal a cargo</li>
                <li>Traslado zona de cobertura</li>
            </ul>

            <p>https://youtu.be/hSMYzfe7jo4</p>
            DESC,
            'img_portada' => 'pista-portada.jpg',
            'img_vista' => 'pista-portada.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 29: PISTOLA

        ShowService::create([
            'title' => 'Pistola',
            'description' => <<<'DESC'
            <p>Cuenta con:</p>

            <ul>
                <li>Boton detonador</li>
                <li>Pila bateria 9v integrada</li>
                <li>Universal para cualquier tipo de chispa fria</li>
            </ul>

            <p>Probala!!!!</p>

            <p>https://youtu.be/amYYv6FJBKA</p>
            DESC,
            'img_portada' => 'pistola-portada.jpeg',
            'img_vista' => 'pistola-portada.jpeg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 30: PLATAFORMA BASE 360°

        ShowService::create([
            'title' => 'Plataforma base 360°',
            'description' => <<<'DESC'
            <p>¡Disfruta de la gran novedosa plataforma 360°, donde giran tus emociones!</p>

            <ul>
                <li>Personal a cargo</li>
                <li>Traslado a zona de cobertura</li>
                <li>Duración: 1hs o 2hs (usted elige)</li>
                <li>Iluminación led decorativa</li>
                <li>Videos ilimitados entregados por mail</li>
                <li>Cotillón para divertirse</li>
            </ul>

            <p>Adicionales:</p>
            <ul>
                <li>Pistola "lanza billetes"</li>
                <li>Pistola "lanza chispas frias"</li>
                <li>Lanzamiento papel blanco</li>
            </ul>

            <p>https://youtu.be/_thSoCvzyak</p>
            DESC,
            'img_portada' => 'plataforma-portada.jpg',
            'img_vista' => 'plataforma-portada.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 31: ROBOT LED MAX

        ShowService::create([
            'title' => 'Robot LED Max',
            'description' => <<<'DESC'
            <p>¡El Robot LED Fiesta Max es la vida de la fiesta! Este robot impresionante te brinda 40 minutos de pura diversión y entretenimiento. Con su capacidad de interactuar y bailar, garantiza una experiencia llena de energía para todos los asistentes. Además, cuenta con un cuadro de selfie LED disponible, que te permite capturar momentos especiales y crear recuerdos inolvidables. ¿Querés agregar un toque extra de diversión? El Robot LED Fiesta Max también viene con un palo de limbo LED, ¡perfecto para animar la fiesta y hacer que todos se unan a la diversión! Y lo mejor de todo, este robot se relaciona de forma interactiva con los agasajados y los invitados, creando una experiencia personalizada y memorable para todos.</p>

            <p>¡Prepárate para una fiesta épica con el Robot LED Fiesta Max!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Duración hasta 40 minutos a pura fiesta</li>
                <li>Interacción y baile</li>
                <li>Con zancos o Sin zancos</li>
                <li>Cuadro de selfie led</li>
                <li>Palo de limbo led</li>
                <li>Interacción con agasajada/o e invitados</li>
                <li>Traslado de zona de cobertura</li>
            </ul>

            <p>Adicionales (recomendados):</p>
            <ul>
                <li>Pistola de chispas frias</li>
                <li>Pistola CO2</li>
                <li>Chaleco led agasajada/o</li>
                <li>Animador</li>
            </ul>

            <p>https://youtu.be/PUVYEfgDanI</p>
            DESC,
            'img_portada' => 'max-portada.png',
            'img_vista' => 'max-portada.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 32: ROBOT TRANSFORMERS

        ShowService::create([
            'title' => 'Robot Transformers',
            'description' => <<<'DESC'
            <p>¡El Show Robot Transformer es una experiencia asombrosa! Con juego de iluminación, láseres, chispas frías y un cuadro selfie para fotos, este robot te brinda un espectáculo visual impresionante. ¡Reserva ahora y disfruta de un evento lleno de sorpresas y diversión con el Show Robot Transformer!</p>

            <p>¡Prepárate para una fiesta épica con el Robot Transformer!</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>Duración hasta 40 minutos a pura fiesta</li>
                <li>Interacción y baile</li>
                <li>Cuadro de selfie led</li>
                <li>Interacción con agasajada/o e invitados</li>
                <li>Traslado de zona de cobertura</li>
            </ul>

            <p>Adicionales (recomendados):</p>
            <ul>
                <li>Chispas Frias</li>
                <li>Animador</li>
                <li>Palo de limbo led</li>
            </ul>

            <p>https://youtu.be/NTZQ5Vc4jZg</p>
            DESC,
            'img_portada' => 'transformer-vista.jpeg',
            'img_vista' => 'transformer-vista.jpeg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 33: SERVICIO DE CHISPAS FRÍAS

        ShowService::create([
            'title' => 'Servicio de Chispas Frías',
            'description' => <<<'DESC'
            <p>¡Presentamos una experiencia de pirotecnia inigualable! Nuestro equipo cuenta con detonadores inalámbricos y alámbricos, garantizando un control preciso y seguro en cada espectáculo. Nuestro personal altamente capacitado se encargará de llevar a cabo cada detonación de forma segura.</p>

            <p>Las chispas de 1 mt, 2 mts, 3 mts o 5 mts añaden un elemento impresionante al espectáculo, creando efectos visuales impactantes tanto en interiores como en exteriores. Ya sea en un evento privado o en un gran escenario, nuestro equipo se asegurará de que cada chispa sea una experiencia inolvidable.</p>

            <p>Confía en nosotros para crear momentos mágicos con nuestra pirotecnia profesional. ¡Reserva ahora y déjate sorprender por un espectáculo pirotécnico excepcionalmente seguro y emocionante!</p>

            <ul>
                <li>Detonadores inalámbricos</li>
                <li>Detonadores alámbricos</li>
                <li>Personal idóneo</li>
                <li>Chispas de 1mt, 2mts, 3mts, 5mts</li>
                <li>Interior / exterior</li>
            </ul>

            <p>https://youtu.be/iCiCjEAcuBE</p>
            DESC,
            'img_portada' => 'chispas-vista.jpg',
            'img_vista' => 'chispas-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 34: SERVICIO DE DJ

        ShowService::create([
            'title' => 'Servicio de DJ',
            'description' => <<<'DESC'
            <p>¡Haz que tu fiesta cobre vida con nuestro servicio de DJ de primera clase! Nuestros talentosos DJ's están capacitados y tienen una amplia experiencia en la animación de todo tipo de eventos. Con su habilidad para leer y adaptarse al ambiente de la fiesta, te garantizamos una experiencia musical inigualable. Contamos con controladoras y una netbook de última generación, lo que nos permite ofrecerte una selección de música personalizada y de alta calidad. Desde los últimos éxitos hasta los clásicos atemporales, nuestros DJ's crearán la atmósfera perfecta para que todos bailen y se diviertan. Confía en nosotros para hacer de tu evento una experiencia inolvidable llena de ritmo y diversión.</p>

            <p>El servicio incluye:</p>
            <ul>
                <li>DJ</li>
                <li>Controladora</li>
                <li>Netbook</li>
                <li>Todos nuestros DJ's están capacitados y son profesionales con mucha experiencia en todo tipo de eventos</li>
            </ul>

            DESC,
            'img_portada' => 'dj-vista.jpg',
            'img_vista' => 'dj-vista.jpg',
        ]);

        #endregion
        
        #region SHOWS/SERVICIO 35: SHOW & RECEPCIÓN CIRCENSE

        ShowService::create([
            'title' => 'Show & Recepción Circense',
            'description' => <<<'DESC'
            <p>Esta propuesta la amoldamos al pedido del cliente. Todas las opciones se pueden organizar con uno o más artistas circenses que acompañen el evento.</p>

            <p>Modalidad de trabajo de artistas circenses en eventos:</p>
            <ul>
                <li>Recepción 1hs: dando la bienvenida a los invitados</li>
                <li>Show de fuego: 15-20 minutos de show de interacción y coreografía de fuego (desde 2 artistas)</li>
                <li>Itinerancia 1hs: interactuando entre las personas del evento</li>
                <li>Acompañamiento de Dj: malabarista/performer con elementos lumínicos y/o fuego acompañado al Dj</li>
            </ul>

            <p>Elementos LED:</p>
            <ul>
                <li>Hula hula</li>
                <li>Pixel LED</li>
                <li>Latigo</li>
                <li>Clavas</li>
                <li>POI</li>
            </ul>

            <p>Elementos FUEGO:</p>
            <ul>
                <li>Abanicos</li>
                <li>Manoplas</li>
                <li>Antorchas</li>
                <li>Pirofagia</li>
            </ul>

            <p>Otros elementos/disciplinas:</p>
            <ul>
                <li>Bola/esfera cristal</li>
                <li>Burbujas</li>
                <li>Magia</li>
                <li>Abanicos de colores</li>
                <li>Dragones</li>
                <li>Zanquistas</li>
                <li>Monociclistas</li>
            </ul>

            <p>img_portada:circense-vista.jpeg</p>
            <p>img_vista:circense-vista.jpeg</p>
            DESC,
            'img_portada' => 'circense-vista.jpeg',
            'img_vista' => 'circense-vista.jpeg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 36: SHOWS MUSICALES

        ShowService::create([
            'title' => 'Shows Musicales',
            'description' => <<<'DESC'
            <p>En este espacio, te recomendamos descubrir una amplia selección de estilos musicales que harán de tu fiesta una experiencia inolvidable. Desde el ritmo contagioso de la cumbia hasta los acordes vibrantes del rock, aquí encontrarás el show musical perfecto para tu evento.</p>

            <p>No importa el tipo de fiesta que estés organizando: bodas, cumpleaños, aniversarios o cualquier otra ocasión especial. Contamos con una variedad de opciones musicales que se adaptarán a tus necesidades y crearán la atmósfera perfecta para que tus invitados disfruten al máximo. No pierdas la oportunidad de hacer de tu fiesta un verdadero espectáculo musical.</p>

            <p>Explora nuestros diferentes estilos de música y encuentra el espectáculo perfecto para tu evento. <a href="https://www.youtube.com/@videosshowsparafiestas5041" target="_blank" rel="noopener noreferrer">CLICK AQUÍ</a></p>

            <p>Los estilos son:</p>
            <ul>
                <li>Rock Nacional</li>
                <li>Rock Internacional</li>
                <li>Disco</li>
                <li>Funk</li>
                <li>Urbano</li>
                <li>Cumbia</li>
                <li>Cumbia Pop</li>
                <li>Club del Clan (Retro)</li>
                <li>Piano - Saxo - Flauta - Violín</li>
                <li>Reggaeton</li>
                <li>y mucho más...</li>
            </ul>

            <p>https://youtu.be/yVIOmMWid48</p>
            DESC,
            'img_portada' => 'shows-portada.jpg',
            'img_vista' => 'shows-portada.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 37: SHOW PAYASO + ENANOS

        ShowService::create([
            'title' => 'Show Payaso + Enanos',
            'description' => <<<'DESC'
            <p>Somos un show diferente!</p>

            <p>¡Buscamos animar a todos los invitados, tomar las mejores fotos y vivir un momento único!</p>

            <p>ARMA TU SHOW SOÑADO</p>

            <p>Elegí artistas Talla Baja, bailarines/as, acróbatas o zanquistas.</p>

            <p>Listado de personajes:</p>
            <ul>
                <li>Juego el Calamar</li>
                <li>Payaso It</li>
                <li>Chucky</li>
                <li>San Patricio</li>
                <li>Cupido</li>
                <li>Juego del Miedo</li>
                <li>La Máscara</li>
                <li>La Monja</li>
                <li>El Padrino</li>
                <li>Jocker</li>
                <li>Messi</li>
                <li>Maradona</li>
                <li>La Purga</li>
                <li>Gatubela</li>
                <li>Mujer Policía</li>
                <li>La Casa de Papel</li>
                <li>El papa Francisco</li>
                <li>El diablo</li>
                <li>Perrito Malvado</li>
                <li>Payaso Cabezón</li>
                <li>Mono</li>
                <li>Marciano</li>
                <li>El pingüino</li>
                <li>El Guasón</li>
                <li>Rick</li>
                <li>Chucky Cabezón</li>
                <li>La exorcista</li>
                <li>Milei</li>
                <li>El Oso Ted</li>
                <li>Peppa Pig</li>
                <li>y muchos más…</li>
            </ul>

            <p>https://youtu.be/TOhurLhT2mg</p>
            DESC,
            'img_portada' => 'payasos-portada.jpeg',
            'img_vista' => 'payasos-portada.jpeg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 38: SILLÓN TRONO

        ShowService::create([
            'title' => 'Sillón Trono',
            'description' => <<<'DESC'
            <p>¡Destaca con nuestro sillón trono!</p>

            <p>Agrega elegancia y distinción a tu evento con nuestro exclusivo sillón trono.</p>

            <p>¡Reserva ahora y haz de tu ocasión algo inolvidable!</p>

            <p>Incluye opción con o sin traslado.</p>
            DESC,
            'img_portada' => 'trono-vista.jpg',
            'img_vista' => 'trono-vista.jpg',
        ]);

        #endregion

        #region SHOWS/SERVICIO 39: SONIDO

        ShowService::create([
            'title' => 'Sonido',
            'description' => <<<'DESC'
            <p>¡Eleva el nivel de sonido de tu evento con nuestra amplia gama de equipos profesionales! Disponemos de los renombrados bafles JBL, que garantizan una calidad de sonido excepcional. Además, contamos con potentes subwoofers de 18" para un impacto sonoro profundo y envolvente. Nuestro sistema de line array proporciona una dispersión uniforme del sonido, asegurando una cobertura óptima en todo el espacio. Con nuestras potencias APX y consolas de audio de última generación, tendrás un control preciso y una calidad de sonido impecable. Además, nuestros micrófonos profesionales aseguran una reproducción clara y cristalina de la voz. ¡Confía en nosotros para ofrecerte una experiencia sonora incomparable en tu evento!</p>

            <p>Disponemos de:</p>
            <ul>
                <li>Bafles JBL</li>
                <li>Subblow 18"</li>
                <li>Line array</li>
                <li>Potencias APX</li>
                <li>Consolas de audio</li>
                <li>Micrófonos</li>
                <li>Y mucho más…</li>
            </ul>

            DESC,
            'img_portada' => 'sonido-vista.png',
            'img_vista' => 'sonido-vista.png',
        ]);

        #endregion

        #region SHOWS/SERVICIO 40: VENTRILOQUÍA, MAGIA Y HUMOR

        ShowService::create([
            'title' => 'Ventriloquía, magia y humor',
            'description' => <<<'DESC'
            <p>Descubre la fascinante y divertida experiencia de la ventriloquia con nuestro reconocido experto en TV. Prepárate para ser cautivado por las mejores ilusiones ópticas y disfrutar de un show de humor que te hará reír a carcajadas. Nuestro ventrílocuo y sus increíbles habilidades te transportarán a un mundo de entretenimiento único.</p>

            <p>¡Déjate sorprender por la magia de la ventriloquia y reserva ahora para vivir una experiencia inolvidable llena de risas y asombro!</p>

            <ul>
                <li>Reconocido por su experiencia en la TV</li>
                <li>Las mejores ilusiones ópticas</li>
                <li>Show de humor</li>
            </ul>

            <p>https://youtu.be/UXkc8o0R3IM</p>
            DESC,
            'img_portada' => 'ventriloquia-portada.png',
            'img_vista' => 'ventriloquia-portada.png',
        ]);

        #endregion

    }
}










