<?php

namespace Database\Seeders;

use App\Models\Artist;
use Illuminate\Database\Seeder;

class ArtistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        #region Artista 1: Leandro Paredes
        $artist = Artist::updateOrCreate(
            ['name' => 'Leandro Paredes'],
            [
                'description' => <<<'HTML'
                <p><strong>Leandro Paredes</strong>, futbolista argentino y campeon del mundo, llega con una propuesta ideal para eventos corporativos, charlas y presentaciones especiales.</p>
                <p>Una participacion con liderazgo, disciplina y experiencia de alto rendimiento para inspirar a equipos, marcas y audiencias.</p>
                HTML,
            ]
        );

        $artist->images()->updateOrCreate(
            ['filename' => 'paredes.jpg'],
            [
                'is_main' => true,
                'order' => 0,
            ]
        );

        $artist->images()
            ->where('filename', '!=', 'paredes.jpg')
            ->update(['is_main' => false]);
        #endregion

        #region Artista 2: Valentino Merlo
        $artist = Artist::updateOrCreate(
            ['name' => 'Valentino Merlo'],
            [
                'description' => <<<'HTML'
                <p><strong>Valentino Merlo</strong> suma energia, frescura y una presencia artistica perfecta para festivales, eventos privados y celebraciones masivas.</p>
                <p>Su show combina cercania con el publico y una puesta dinamica para transformar cada fecha en una experiencia memorable.</p>
                HTML,
            ]
        );

        $artist->images()->updateOrCreate(
            ['filename' => 'valentino-merlo.jpg'],
            [
                'is_main' => true,
                'order' => 0,
            ]
        );

        $artist->images()
            ->where('filename', '!=', 'valentino-merlo.jpg')
            ->update(['is_main' => false]);
        #endregion

        #region Artista 3: Salastkbron
        $artist = Artist::updateOrCreate(
            ['name' => 'Salastkbron'],
            [
                'description' => <<<'HTML'
                <p><strong>Salastkbron</strong> aporta un show urbano de alto impacto, ideal para fiestas, festivales y eventos jovenes con identidad propia.</p>
                <p>Una propuesta potente, con presencia escenica y conexion directa con el publico para encender cada presentacion.</p>
                HTML,
            ]
        );

        $artist->images()->updateOrCreate(
            ['filename' => 'salastkbron.jpg'],
            [
                'is_main' => true,
                'order' => 0,
            ]
        );

        $artist->images()
            ->where('filename', '!=', 'salastkbron.jpg')
            ->update(['is_main' => false]);
        #endregion

        #region Artista 4: La Banda del Lechuga
        $artist = Artist::updateOrCreate(
            ['name' => 'La Banda del Lechuga'],
            [
                'description' => <<<'HTML'
                <p><strong>La Banda del Lechuga</strong> ofrece un show festivo y participativo, ideal para eventos sociales, empresariales y celebraciones de gran convocatoria.</p>
                <p>Un repertorio dinamico y una energia contagiosa que convierten cada presentacion en una verdadera fiesta.</p>
                HTML,
            ]
        );

        $artist->images()->updateOrCreate(
            ['filename' => 'banda-del-lechuga.jpg'],
            [
                'is_main' => true,
                'order' => 0,
            ]
        );

        $artist->images()
            ->where('filename', '!=', 'banda-del-lechuga.jpg')
            ->update(['is_main' => false]);
        #endregion
      
    }
}
