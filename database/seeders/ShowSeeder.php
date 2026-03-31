<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ShowService;

class ShowSeeder extends Seeder
{
    public function run(): void
    {
        #region SHOWS/SERVICIO ALFOMBRAS GLAMOUR + DECORACION
        ShowService::create([
            'title' => 'Alfombras Glamour + Decoración',
            'description' => <<<'DESC'
            <p>Servicio de Alfombras Glamour para Eventos. Transforma la entrada de tu evento con nuestro servicio de alfombras glamour. Ofrecemos una amplia selección de alfombras elegantes y sofisticadas que añaden un toque de lujo y estilo a cualquier ocasión, desde bodas y galas hasta eventos corporativos. Nuestras alfombras están disponibles en diversos colores y materiales de alta calidad para complementar la temática y la decoración de tu evento, asegurando una llegada memorable y elegante para tus invitados.</p>
            DESC,
            'img_portada' => 'alfombras-vista.jpg',
            'img_vista' => 'alfombras-vista.jpg',
        ]);
        #endregion

        #region SHOWS/SERVICIO ANIMACION & LOCUCION

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

        #region SHOWS/SERVICIO AMBIENTACION & DECORACION EN FLORES

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


    }
}
