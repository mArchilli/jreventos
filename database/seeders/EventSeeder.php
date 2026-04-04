<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run()
    {
        Event::truncate();

        Event::create([
            'title' => 'Casamientos',
            'description' => 'Te ayudamos a planificar tu fiesta con un servicio completo y ajustándonos a tu presupuesto para que vos solo tengas que ocuparte de disfrutarlo.'
        ]);
        Event::create([
            'title' => 'Cumpleaños',
            'description' => 'Los cumpleaños son una buena excusa perfecta para reunirnos con nuestros seres queridos y compartir en familia, no dejes de festejar, te ayudamos a hacer realidad ese encuentro.'
        ]);
        Event::create([
            'title' => 'Eventos Deportivos',
            'description' => 'Contamos con miles de clubes que ya cuentan con nuestros servicios para sus fiestas... no te quedes afuera!'
        ]);
        Event::create([
            'title' => 'Eventos Empresariales',
            'description' => "Que tu empresa se luzca es lo que te hace distinto. 12 años realizando lo mejor para tu empresa. - EMPRESAS QUE CONFIAN EN NOSOTROS - *MC Donald's *Ford *Ocn *Chevrolet *Casino flotante puerto madero *Y muchos mas..."
        ]);
        Event::create([
            'title' => 'Fiestas de 15',
            'description' => 'Sabemos lo importante, único e irrepetible que es este evento, por eso atendemos hasta el último detalle.'
        ]);
        Event::create([
            'title' => 'Fiestas de egresados - upd - etc',
            'description' => 'Tu fiesta merece los mejores servicios para que tu colegio se luzca, que mejor ser el mejor curso... tu fiesta con nosotros sera unica e inigualable.'
        ]);
        Event::create([
            'title' => 'Fiestas Infantiles',
            'description' => 'Ofrecemos animaciones tradicionales y temáticas, entre otros servicios. Contamos con un equipo de animadores capacitados. Juegos Integradores.'
        ]);
    }
}
