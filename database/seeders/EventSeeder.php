<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use App\Models\Event;
use App\Models\EventImage;

class EventSeeder extends Seeder
{
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Event::truncate();
        EventImage::truncate();
        Schema::enableForeignKeyConstraints();

        $events = [
            [
                'title'       => 'Casamientos',
                'description' => 'Te ayudamos a planificar tu fiesta con un servicio completo y ajustándonos a tu presupuesto para que vos solo tengas que ocuparte de disfrutarlo.',
                'card_image'  => 'images/casamientos-hub.png',
                'hero_image'  => 'images/hero-bodas.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Ceremonia',           'desc' => 'El momento del "sí" en un ambiente íntimo y emocionante.'],
                    ['step' => '02', 'title' => 'Sesión de fotos',     'desc' => 'Captura de los mejores momentos con luz y escenografía ideal.'],
                    ['step' => '03', 'title' => 'Cocktail',            'desc' => 'Bienvenida a los invitados con bebidas y aperitivos de autor.'],
                    ['step' => '04', 'title' => 'Cena de gala',        'desc' => 'Banquete completo con menú personalizado y servicio de primer nivel.'],
                    ['step' => '05', 'title' => 'Primer baile & show', 'desc' => 'El momento más romántico de la noche con música y efectos especiales.'],
                    ['step' => '06', 'title' => 'Celebración',         'desc' => 'Pista de baile, DJ y brindis hasta el final de la noche.'],
                ],
                'includes'    => ['Venue de primer nivel', 'Decoración floral', 'DJ y banda', 'Iluminación escénica', 'Catering premium', 'Wedding planner'],
                'testimonials' => [
                    ['name' => 'Lucía & Martín', 'text' => 'Fue exactamente como lo habíamos imaginado. El equipo estuvo presente en cada momento y resolvieron todo sin que nos diéramos cuenta.', 'detail' => 'Boda — 150 invitados'],
                    ['name' => 'Camila & Diego', 'text' => 'Nuestros invitados no paraban de hablar de lo bien organizado que estuvo todo. Cada detalle fue cuidado con un amor increíble.', 'detail' => 'Casamiento de temporada'],
                ],
            ],
            [
                'title'       => 'Cumpleaños',
                'description' => 'Los cumpleaños son una buena excusa perfecta para reunirnos con nuestros seres queridos y compartir en familia, no dejes de festejar, te ayudamos a hacer realidad ese encuentro.',
                'card_image'  => 'images/cumpleaños-hub.png',
                'hero_image'  => 'images/hero-cumpleaños.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Bienvenida',            'desc' => 'Llegada de los invitados con ambientación temática.'],
                    ['step' => '02', 'title' => 'Cóctel',                'desc' => 'Aperitivos y bebidas mientras todos se encuentran.'],
                    ['step' => '03', 'title' => 'Cena o merienda',       'desc' => 'Banquete pensado según el horario y el estilo del festejo.'],
                    ['step' => '04', 'title' => 'Momento del festejado', 'desc' => 'El soplo de las velitas, el brindis y los mejores deseos.'],
                    ['step' => '05', 'title' => 'Show y animación',      'desc' => 'Entretenimiento sorpresa para todos los invitados.'],
                    ['step' => '06', 'title' => 'Baile y cierre',        'desc' => 'La pista se abre y la fiesta continúa hasta el final.'],
                ],
                'includes'    => ['Decoración temática', 'DJ o música en vivo', 'Iluminación y ambientación', 'Catering o buffet', 'Torta personalizada', 'Coordinación del evento'],
                'testimonials' => [
                    ['name' => 'Romina P.',        'text' => 'Para mis 30 quería algo especial y diferente. JR Eventos convirtió mi idea en una noche absolutamente mágica que nadie va a olvidar.', 'detail' => 'Cumpleaños de 30 — 120 invitados'],
                    ['name' => 'Familia González', 'text' => 'El cumpleaños de los 50 de mi mamá quedó perfecto. El equipo cuidó cada detalle con una dedicación increíble.', 'detail' => 'Festejo familiar especial'],
                ],
            ],
            [
                'title'       => 'Eventos Deportivos',
                'description' => 'Contamos con miles de clubes que ya cuentan con nuestros servicios para sus fiestas... no te quedes afuera!',
                'card_image'  => 'images/deportivos-hub.png',
                'hero_image'  => 'images/hero-deportivos.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Apertura del evento', 'desc' => 'Ceremonia de apertura con presentación oficial y música.'],
                    ['step' => '02', 'title' => 'Competencia',         'desc' => 'Desarrollo del torneo con cobertura y transmisión en vivo.'],
                    ['step' => '03', 'title' => 'Intermedio',          'desc' => 'Shows, activaciones de marca y entretenimiento para el público.'],
                    ['step' => '04', 'title' => 'Final',               'desc' => 'El partido o prueba decisiva con producción escénica máxima.'],
                    ['step' => '05', 'title' => 'Premiación',          'desc' => 'Entrega de trofeos y medallas con ceremonia emotiva.'],
                    ['step' => '06', 'title' => 'Cierre',              'desc' => 'Festejo colectivo y cobertura final del evento.'],
                ],
                'includes'    => ['Escenografía deportiva', 'Sonido profesional outdoor', 'Pantallas LED', 'Iluminación nocturna', 'Cobertura fotográfica', 'Coordinación logística'],
                'testimonials' => [
                    ['name' => 'Club Atlético Rivadavia', 'text' => 'Transformaron nuestro torneo amateur en un espectáculo de primer nivel. Los jugadores y el público quedaron impresionados.', 'detail' => 'Torneo regional — 800 asistentes'],
                    ['name' => 'Org. Running MdP',        'text' => 'La producción fue impecable. Cada punto de la carrera estaba perfectamente equipado y el cierre fue increíble.', 'detail' => 'Carrera 10K Mar del Plata'],
                ],
            ],
            [
                'title'       => 'Eventos Empresariales',
                'description' => 'Que tu empresa se luzca es lo que te hace distinto. 12 años realizando lo mejor para tu empresa.',
                'card_image'  => 'images/empresariales-hub.png',
                'hero_image'  => 'images/hero-empresarial.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Acreditación',         'desc' => 'Check-in organizado y bienvenida institucional.'],
                    ['step' => '02', 'title' => 'Apertura oficial',     'desc' => 'Presentación de autoridades y apertura del programa.'],
                    ['step' => '03', 'title' => 'Programa central',     'desc' => 'Conferencias, paneles o lanzamiento de producto.'],
                    ['step' => '04', 'title' => 'Coffee & Networking',  'desc' => 'Espacio pensado para conectar y compartir.'],
                    ['step' => '05', 'title' => 'Gala o cena',          'desc' => 'Celebración formal con producción escénica premium.'],
                    ['step' => '06', 'title' => 'Cierre institucional', 'desc' => 'Palabras finales y entrega de reconocimientos.'],
                ],
                'includes'    => ['Escenario y producción técnica', 'Sonido e iluminación profesional', 'Pantallas y videowall', 'Catering corporativo', 'Registro y acreditación', 'Coordinación ejecutiva'],
                'testimonials' => [
                    ['name' => 'Grupo Empresarial Norte', 'text' => 'El lanzamiento superó todas las expectativas. La producción fue impecable y cada momento del programa fluyó perfectamente.', 'detail' => 'Lanzamiento de producto — 300 asistentes'],
                    ['name' => 'Cámara de Comercio MdP',  'text' => 'Profesionalismo de principio a fin. Nuestros socios quedaron muy bien impresionados con la organización del congreso.', 'detail' => 'Congreso anual — 500 participantes'],
                ],
            ],
            [
                'title'       => 'Fiestas de 15',
                'description' => 'Sabemos lo importante, único e irrepetible que es este evento, por eso atendemos hasta el último detalle.',
                'card_image'  => 'images/xv-hub.png',
                'hero_image'  => 'images/hero-xv.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Recepción',              'desc' => 'Bienvenida de los invitados con ambientación especial y música de fondo.'],
                    ['step' => '02', 'title' => 'Entrada de la festejada','desc' => 'El momento más esperado: tu entrada triunfal con efectos y música en vivo.'],
                    ['step' => '03', 'title' => 'Cena',                   'desc' => 'Menú cuidadosamente seleccionado con presentación de primer nivel.'],
                    ['step' => '04', 'title' => 'Show en vivo',           'desc' => 'Animación, coreografías y sorpresas que hacen el evento único.'],
                    ['step' => '05', 'title' => 'Baile y celebración',    'desc' => 'La pista se abre para festejar toda la noche con la mejor música.'],
                    ['step' => '06', 'title' => 'Cierre memorable',       'desc' => 'Despedida especial con detalles que los invitados llevan de recuerdo.'],
                ],
                'includes'    => ['Salón premium', 'Decoración temática', 'DJ profesional', 'Iluminación escénica', 'Catering completo', 'Coordinadora del evento'],
                'testimonials' => [
                    ['name' => 'Valentina M.', 'text' => 'Fue la noche más especial de mi vida. Cada detalle estaba perfecto, desde la decoración hasta la música. Mis amigas siguen hablando de mis XV.', 'detail' => 'XV años en Mar del Plata'],
                    ['name' => 'Sofía R.',     'text' => 'Nunca pensé que iba a llorar de emoción al hacer mi entrada. El equipo de JR Eventos superó todas mis expectativas.', 'detail' => 'Fiesta de XV — 200 invitados'],
                ],
            ],
            [
                'title'       => 'Fiestas de egresados - upd - etc',
                'description' => 'Tu fiesta merece los mejores servicios para que tu colegio se luzca, que mejor ser el mejor curso... tu fiesta con nosotros sera unica e inigualable.',
                'card_image'  => 'images/upd-hub.png',
                'hero_image'  => 'images/hero-egresados.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Llegada',               'desc' => 'Bienvenida al grupo con ambientación y música de entrada.'],
                    ['step' => '02', 'title' => 'Cena',                  'desc' => 'Mesa compartida para disfrutar juntos la última gran noche.'],
                    ['step' => '03', 'title' => 'Discurso y emotividad', 'desc' => 'Palabras de despedida, homenajes y momentos únicos.'],
                    ['step' => '04', 'title' => 'Show sorpresa',         'desc' => 'Una actuación especial que nadie esperaba.'],
                    ['step' => '05', 'title' => 'Baile',                 'desc' => 'La pista se llena con los temas que marcaron estos años.'],
                    ['step' => '06', 'title' => 'Cierre',                'desc' => 'El brindis final y los recuerdos que duran para siempre.'],
                ],
                'includes'    => ['Salón o locación especial', 'DJ y sonido profesional', 'Iluminación escénica', 'Cena o cóctel', 'Animación y shows', 'Fotografía del evento'],
                'testimonials' => [
                    ['name' => 'Promo 2024 — Colegio Nacional', 'text' => 'Fue la mejor noche de nuestras vidas. Todos quedamos impactados por la producción y lo bien que salió todo.', 'detail' => 'Fiesta de egresados — 180 alumnos'],
                    ['name' => 'Delegados 5°A',                 'text' => 'Desde la primera reunión hasta el final de la noche, el equipo nos acompañó en todo. Recomendamos 100%.', 'detail' => 'Egresados secundaria'],
                ],
            ],
            [
                'title'       => 'Fiestas Infantiles',
                'description' => 'Ofrecemos animaciones tradicionales y temáticas, entre otros servicios. Contamos con un equipo de animadores capacitados. Juegos Integradores.',
                'card_image'  => 'images/hub-infantiles.png',
                'hero_image'  => 'images/hero-infantiles.png',
                'timeline'    => [
                    ['step' => '01', 'title' => 'Llegada mágica',       'desc' => 'El festejado llega a un mundo transformado especialmente para él.'],
                    ['step' => '02', 'title' => 'Juegos y actividades',  'desc' => 'Animadores con dinámicas divertidas para todos los chicos.'],
                    ['step' => '03', 'title' => 'Merienda o almuerzo',  'desc' => 'El menú favorito del festejado servido con todo el amor.'],
                    ['step' => '04', 'title' => 'Torta y velitas',       'desc' => 'El momento más esperado con sorpresas y canciones.'],
                    ['step' => '05', 'title' => 'Show especial',         'desc' => 'Personajes, magia o acrobacias para dejar a todos con la boca abierta.'],
                    ['step' => '06', 'title' => 'Regalitos y despedida', 'desc' => 'Cierre con detalles para llevarse el recuerdo a casa.'],
                ],
                'includes'    => ['Decoración temática', 'Animadores profesionales', 'Mesa de dulces', 'Torta personalizada', 'Juegos y actividades', 'Regalitos para los invitados'],
                'testimonials' => [
                    ['name' => 'Papás de Juani', 'text' => 'El cumpleaños de Juani fue un sueño hecho realidad. Los nenes estuvieron entretenidos toda la tarde y nosotros pudimos disfrutarlo.', 'detail' => 'Cumpleaños de 5 años — temática dinosaurios'],
                    ['name' => 'Mamá de Cata',   'text' => 'Nunca vi a mi hija tan feliz. El equipo de JR Eventos creó un mundo de princesas absolutamente increíble.', 'detail' => 'Fiesta infantil — 60 invitados'],
                ],
            ],
        ];

        foreach ($events as $data) {
            $cardPath = $data['card_image'];
            $heroPath = $data['hero_image'];

            $event = Event::create([
                'title'        => $data['title'],
                'description'  => $data['description'],
                'timeline'     => $data['timeline'],
                'includes'     => $data['includes'],
                'testimonials' => $data['testimonials'],
            ]);

            // Crear imagen de card
            $cardImage = EventImage::create([
                'event_id'   => $event->id,
                'image_path' => $cardPath,
            ]);

            // Crear imagen de hero (si es diferente a card)
            if ($heroPath !== $cardPath) {
                $heroImage = EventImage::create([
                    'event_id'   => $event->id,
                    'image_path' => $heroPath,
                ]);
            } else {
                $heroImage = $cardImage;
            }

            $event->card_image_id = $cardImage->id;
            $event->hero_image_id = $heroImage->id;
            $event->save();
        }
    }
}
