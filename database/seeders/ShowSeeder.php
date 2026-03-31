<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ShowService;

class ShowSeeder extends Seeder
{
    public function run(): void
    {
        ShowService::create([
            'title' => 'Alfombras Glamour + Decoración',
            'description' => 'Servicio de Alfombras Glamour para Eventos\nTransforma la entrada de tu evento con nuestro servicio de alfombras glamour. Ofrecemos una amplia selección de alfombras elegantes y sofisticadas que añaden un toque de lujo y estilo a cualquier ocasión, desde bodas y galas hasta eventos corporativos. Nuestras alfombras están disponibles en diversos colores y materiales de alta calidad para complementar la temática y la decoración de tu evento, asegurando una llegada memorable y elegante para tus invitados.',
            'img_portada' => 'alfombras-vista.jpg',
            'img_vista' => 'alfombras-vista.jpg',
        ]);
    }
}
