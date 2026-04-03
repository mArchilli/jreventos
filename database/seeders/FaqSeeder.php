<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['question' => '¿CON CUÁNTA ANTICIPACIÓN DEBO RESERVAR MI EVENTO?', 'answer' => '<p>Lo ideal es contactarnos con al menos <strong>3 a 6 meses de anticipación</strong>, especialmente en temporada alta (fin de año, San Valentín, etc.). Sin embargo, hacemos lo posible por adaptarnos a cualquier plazo.</p>', 'order' => 1],
            ['question' => '¿QUÉ TIPO DE EVENTOS ORGANIZAN?', 'answer' => '<p>Organizamos todo tipo de eventos:</p><ul><li>Cumpleaños</li><li>Casamientos</li><li>Fiestas de 15</li><li>Eventos corporativos</li><li>Bautismos</li><li>Baby showers</li><li>Aniversarios y más</li></ul><p>Cada evento lo personalizamos según tus necesidades.</p>', 'order' => 2],
            ['question' => '¿PUEDO PERSONALIZAR TODOS LOS DETALLES DE MI EVENTO?', 'answer' => '<p><strong>Por supuesto.</strong> Trabajamos 100% a medida. Desde la ambientación, la música, el catering y la decoración hasta los más mínimos detalles. Todo se adapta a tu visión y presupuesto.</p>', 'order' => 3],
            ['question' => '¿CÓMO ES EL PROCESO DE PAGO Y RESERVA?', 'answer' => '<p>Una vez que aprobás la propuesta, se abona una <strong>seña</strong> para confirmar la fecha. El resto se puede abonar en cuotas o según el plan que acordemos juntos antes del evento.</p>', 'order' => 4],
            ['question' => '¿OFRECEN SERVICIO DE COORDINACIÓN EL DÍA DEL EVENTO?', 'answer' => '<p><strong>Sí.</strong> Nuestro equipo puede estar presente el día del evento para coordinar cada detalle y asegurarnos de que todo salga perfecto, para que vos solo te dediques a disfrutar.</p>', 'order' => 5],
            ['question' => '¿TRABAJAN CON PROVEEDORES PROPIOS O PUEDO ELEGIR LOS MÍOS?', 'answer' => '<p>Contamos con una <strong>red de proveedores de confianza</strong>, pero también podemos trabajar con los que vos prefieras. Lo importante es que el resultado final sea exactamente lo que soñaste.</p>', 'order' => 6],
            ['question' => '¿QUÉ PASA SI NECESITO CAMBIAR LA FECHA DE MI EVENTO?', 'answer' => '<p>Entendemos que pueden surgir imprevistos. Nos comunicás con la <strong>mayor anticipación posible</strong> y buscamos juntos una nueva fecha disponible sin inconvenientes.</p>', 'order' => 7],
            ['question' => '¿TIENEN UN MONTO MÍNIMO PARA CONTRATAR SUS SERVICIOS?', 'answer' => '<p><strong>No hay un monto mínimo fijo.</strong> Trabajamos con distintos presupuestos y siempre buscamos la mejor propuesta dentro de tus posibilidades. Contanos tu idea y te armamos algo a medida.</p>', 'order' => 8],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
