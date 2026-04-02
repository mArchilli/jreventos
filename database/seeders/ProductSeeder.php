<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        #region Producto 1: Base de fijación para chispa fria
        $product = Product::create([
            'title' => 'Base de fijación para chispa fria',
            'description' => '<p><strong>¡JR PRODUCTORA DE EVENTOS!</strong></p><p>CONSULTE PRECIO COMPRANDO POR MAYOR... || @Chisperio.argentina</p><p>BASE DE FIJACIÓN PARA FUENTE DE FUEGO FRIO.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p><em>El precio es por 1 unidad</em></p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'base-fijacion.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 2: Bengalas de Humo
        $product = Product::create([
            'title' => 'Bengalas de Humo',
            'description' => '<p><strong>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</strong></p><p>SOMOS MERCADO LIDER</p><p><strong>BENGALAS DE MANO "HUMO"</strong><br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...<br>Duración: Aprox 1 minuto<br>El precio es por 1 unidad</p><p>Elegí el color que quieras, selecciona la cantidad y listo! Si querés varias de distintos colores, simplemente debes ir añadiendo al carrito.</p><p>¿COMO SE ENCIENDE?<br>Simplemente trae una mecha que se enciende con fuego</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p><p>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</p><p>"PARA QUE SU COMPRA LLEGUE SIN SUFRIR DAÑOS Y SEGURO, NUESTROS EMBALAJES LLEVAN PAPEL BURBUJA DE POLIETILENO Y UTILIZAMOS BOLSAS E-COMMERCE".</p><p>CONTAMOS CON ATENCION PERSONALIZADA LAS 24HS</p><p>POR TODO ESTO, SOMOS LA EMPRESA LIDER DE ARGENTINA</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'bengalas-humo.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 3: Bengalita de Mano "STROBO"
        $product = Product::create([
            'title' => 'Bengalita de Mano "STROBO"',
            'description' => '<p><strong>Bengalita de mano "Strobo"</strong></p><p>Efecto: Flash intermitente<br>Duración: 35 segundos</p><p>Ideal para show, hinchadas, fiestas...</p><p>Precio: 0</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'bengalita.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 4: Chispa Fría 2 metros x 20 segundos + Base de fijación
        $product = Product::create([
            'title' => 'Chispa Fría 2 metros x 20 segundos + Base de fijación',
            'description' => '<p><strong>¡¡¡JR EVENTOS!!!</strong></p><p>...CONSULTE PRECIO COMPRANDO POR MAYOR - Marca - @Chisperio.argentina</p><p><strong>FUENTE DE FUEGO FRIO</strong> interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente fuego frío.</p><p><strong>DURACION:</strong> 20 segundos.<br><strong>ALTURA ALCANZADA:</strong> 2 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Necesitas empalmar el INICIADOR (que es el cable corto que viene conectado a la fuente de fuego frío) a un CABLE EXTRA (el de uso domiciliario de 1.5mm2 de sección) que llegue hasta el lugar deseado para realizar el encendido.</p><p>Además necesitas:<br>- En caso de encender 1 sola unidad, podes utilizar 1 pila de 9 VOLT.<br>- O en caso de encender 2 o más unidades a la vez, necesitas armar un ENCHUFE para conectarlo a una toma de 220 VOLT, de esta forma, se asegura el encendido de todas las chispas al mismo tiempo.</p><p><em>IMPORTANTE:</em> Para el armado, por seguridad, recomendamos que consulte con un profesional o una persona idónea para realizar la conexión.</p><p>ACLARACIÓN: Nosotros sólo vendemos el producto: chispas de fuego frío. Damos las recomendaciones del fabricante, pero no nos hacemos responsables si no se realiza el armado correcto.</p><p>CUALQUIER DUDA, CONTAMOS CON EL SERVICIO DE LANZAMIENTO CON PERSONAL IDONEO. (CONSULTAR)</p><p>¿COMO SE ENCIENDE?</p><p>Para encenderla manualmente, debes separar los dos extremos del INICIADOR (es el cable que está conectado con la fuente de fuego frío), empalmarlos con la EXTENSIÓN DE CABLE y luego con los 2 polos hacer contacto con:<br>- 1 pila de 9 VOLT si es solo 1 unidad.<br>- Si son 2 o más unidades a encender a la vez, armar un enchufe para conectarlo a una toma de 220 VOLT. Posterior al enchufado, DEBE DESENCHUFAR INMEDIATAMENTE, para evitar que el cable quede con corriente.<br>Una vez encendido, no debe mantenerlo enchufado, ya que solamente necesita la corriente para su encendido, no para su funcionamiento.</p><p>Observación: La base no incluye conexión para su detonación</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispa-fria-2mts.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 5: Chispa Fría 2 metros x 20 segundos
        $product = Product::create([
            'title' => 'Chispa Fría 2 metros x 20 segundos',
            'description' => '<p><strong>¡¡¡JR EVENTOS!!!</strong></p><p>...CONSULTE PRECIO COMPRANDO POR MAYOR - Marca - @Chisperio.argentina</p><p><strong>FUENTE DE FUEGO FRIO</strong> interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente fuego frío.</p><p><strong>DURACION:</strong> 20 segundos.<br><strong>ALTURA ALCANZADA:</strong> 2 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Necesitas empalmar el INICIADOR (que es el cable corto que viene conectado a la fuente de fuego frío) a un CABLE EXTRA (el de uso domiciliario de 1.5mm2 de sección) que llegue hasta el lugar deseado para realizar el encendido.</p><p>Además necesitas:<br>- En caso de encender 1 sola unidad, podes utilizar 1 pila de 9 VOLT.<br>- O en caso de encender 2 o más unidades a la vez, necesitas armar un ENCHUFE para conectarlo a una toma de 220 VOLT, de esta forma, se asegura el encendido de todas las chispas al mismo tiempo.</p><p><em>IMPORTANTE:</em> Para el armado, por seguridad, recomendamos que consulte con un profesional o una persona idónea para realizar la conexión.</p><p>ACLARACIÓN: Nosotros sólo vendemos el producto: chispas de fuego frío. Damos las recomendaciones del fabricante, pero no nos hacemos responsables si no se realiza el armado correcto.</p><p>CUALQUIER DUDA, CONTAMOS CON EL SERVICIO DE LANZAMIENTO CON PERSONAL IDONEO. (CONSULTAR)</p><p>¿COMO SE ENCIENDE?</p><p>Para encenderla manualmente, debes separar los dos extremos del INICIADOR (es el cable que está conectado con la fuente de fuego frío), empalmarlos con la EXTENSIÓN DE CABLE y luego con los 2 polos hacer contacto con:<br>- 1 pila de 9 VOLT si es solo 1 unidad.<br>- Si son 2 o más unidades a encender a la vez, armar un enchufe para conectarlo a una toma de 220 VOLT. Posterior al enchufado, DEBE DESENCHUFAR INMEDIATAMENTE, para evitar que el cable quede con corriente.<br>Una vez encendido, no debe mantenerlo enchufado, ya que solamente necesita la corriente para su encendido, no para su funcionamiento.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispas-2mts.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 6: Chispa Fria 2 metros x 8 segundos
        $product = Product::create([
            'title' => 'Chispa Fria 2 metros x 8 segundos',
            'description' => '<p><strong>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</strong></p><p><strong>FUENTE DE FUEGO FRIO</strong> interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente fuego frío.</p><p><strong>DURACION:</strong> 8 segundos.<br><strong>ALTURA ALCANZADA:</strong> 2 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Se enciende simplemente como una vela o cualquier fuego artificial. Se enciende la mecha y sale la chispa. Consultanos en las preguntas, tambien contamos con iniciadores eléctricos por si queres hacer la conexión.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p><p>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</p><p>"PARA QUE SU COMPRA LLEGUE SIN SUFRIR DAÑOS Y SEGURO, NUESTROS EMBALAJES LLEVAN PAPEL BURBUJA DE POLIETILENO Y UTILIZAMOS BOLSAS E-COMMERCE".</p><p>CONTAMOS CON ATENCION PERSONALIZADA LAS 24HS</p><p>POR TODO ESTO, SOMOS LA EMPRESA LIDER DE ARGENTINA</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispas-2mts-8seg.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 7: Chispa Fría 3 metros x 30 segundos
        $product = Product::create([
            'title' => 'Chispa Fría 3 metros x 30 segundos',
            'description' => '<p><strong>-- JR PRODUCTORA DE EVENTOS --</strong></p><p>- PRECIO COMPRANDO POR MAYOR!!!!!!! @Chisperio.argentina</p><p><strong>FUENTE DE FUEGO FRIO</strong> para interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente de fuego frío.</p><p><strong>DURACION:</strong> 30 segundos.<br><strong>ALTURA ALCANZADA:</strong> 2 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Necesitas empalmar el INICIADOR (que es el cable corto que viene conectado a la fuente de fuego frío) a un CABLE EXTRA (el de uso domiciliario de 1.5mm2 de sección) que llegue hasta el lugar deseado para realizar el encendido.</p><p>Además necesitas:<br>- En caso de encender 1 sola unidad, podes utilizar 1 pila de 9 VOLT.<br>- O en caso de encender 2 o más unidades a la vez, necesitas armar un ENCHUFE para conectarlo a una toma de 220 VOLT, de esta forma, se asegura el encendido de todas las chispas al mismo tiempo.</p><p><em>IMPORTANTE:</em> Para el armado, por seguridad, recomendamos que consulte con un profesional o una persona idónea para realizar la conexión.</p><p>ACLARACIÓN: Nosotros sólo vendemos el producto: chispas de fuego frío. Damos las recomendaciones del fabricante, pero no nos hacemos responsables si no se realiza el armado correcto.</p><p>CUALQUIER DUDA, CONTAMOS CON EL SERVICIO DE LANZAMIENTO CON PERSONAL IDONEO. (CONSULTAR)</p><p>¿COMO SE ENCIENDE?</p><p>Para encenderla manualmente, debes separar los dos extremos del INICIADOR (es el cable que está conectado con la fuente de fuego frío), empalmarlos con la EXTENSIÓN DE CABLE y luego con los 2 polos hacer contacto con:<br>- 1 pila de 9 VOLT si es solo 1 unidad.<br>- Si son 2 o más unidades a encender a la vez, armar un enchufe para conectarlo a una toma de 220 VOLT. Posterior al enchufado, DEBE DESENCHUFAR INMEDIATAMENTE, para evitar que el cable quede con corriente.<br>Una vez encendido, no debe mantenerlo enchufado, ya que solamente necesita la corriente para su encendido, no para su funcionamiento.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispa-fria-3mts-30seg.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 8: Chispa Fría 4 metros X 30 segundos
        $product = Product::create([
            'title' => 'Chispa Fría 4 metros X 30 segundos',
            'description' => '<p><strong>¡¡¡JR EVENTOS!!!</strong></p><p>...CONSULTE PRECIO COMPRANDO POR MAYOR - Marca - @Chisperio.argentina</p><p><strong>FUENTE DE FUEGO FRIO</strong> interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente fuego frío.</p><p><strong>DURACION:</strong> 30 segundos.<br><strong>ALTURA ALCANZADA:</strong> 4 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Necesitas empalmar el INICIADOR (que es el cable corto que viene conectado a la fuente de fuego frío) a un CABLE EXTRA (el de uso domiciliario de 1.5mm2 de sección) que llegue hasta el lugar deseado para realizar el encendido.</p><p>Además necesitas:<br>- En caso de encender 1 sola unidad, podes utilizar 1 pila de 9 VOLT.<br>- O en caso de encender 2 o más unidades a la vez, necesitas armar un ENCHUFE para conectarlo a una toma de 220 VOLT, de esta forma, se asegura el encendido de todas las chispas al mismo tiempo.</p><p><em>IMPORTANTE:</em> Para el armado, por seguridad, recomendamos que consulte con un profesional o una persona idónea para realizar la conexión.</p><p>ACLARACIÓN: Nosotros sólo vendemos el producto: chispas de fuego frío. Damos las recomendaciones del fabricante, pero no nos hacemos responsables si no se realiza el armado correcto.</p><p>CUALQUIER DUDA, CONTAMOS CON EL SERVICIO DE LANZAMIENTO CON PERSONAL IDONEO. (CONSULTAR)</p><p>¿COMO SE ENCIENDE?</p><p>Para encenderla manualmente, debes separar los dos extremos del INICIADOR (es el cable que está conectado con la fuente de fuego frío), empalmarlos con la EXTENSIÓN DE CABLE y luego con los 2 polos hacer contacto con:<br>- 1 pila de 9 VOLT si es solo 1 unidad.<br>- Si son 2 o más unidades a encender a la vez, armar un enchufe para conectarlo a una toma de 220 VOLT. Posterior al enchufado, DEBE DESENCHUFAR INMEDIATAMENTE, para evitar que el cable quede con corriente.<br>Una vez encendido, no debe mantenerlo enchufado, ya que solamente necesita la corriente para su encendido, no para su funcionamiento.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispas-4mts-30seg.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 9: Chispa Fría 5 metros x 1 segundo
        $product = Product::create([
            'title' => 'Chispa Fría 5 metros x 1 segundo',
            'description' => '<p><strong>¡¡¡JR PRODUCTORA DE EVENTOS!!!</strong></p><p>...CONSULTE PRECIO COMPRANDO POR MAYOR...|| @Chisperio.argentina</p><p><strong>FUENTE DE FUEGO FRIO</strong> interior y exterior.<br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p>El precio es por 1 unidad de fuente fuego frío.</p><p><strong>DURACION:</strong> 50 segundos.<br><strong>ALTURA ALCANZADA:</strong> 5 metros.</p><p>¿QUE NECESITO PARA ENCENDERLA?</p><p>Necesitas empalmar el INICIADOR (que es el cable corto que viene conectado a la fuente de fuego frío) a un CABLE EXTRA (el de uso domiciliario de 1.5mm2 de sección) que llegue hasta el lugar deseado para realizar el encendido.<br>Además necesitas:<br>- En caso de encender 1 sola unidad, podes utilizar 1 pila de 9 VOLT.<br>- O en caso de encender 2 o más unidades a la vez, necesitas armar un ENCHUFE para conectarlo a una toma de 220 VOLT, de esta forma, se asegura el encendido de todas las chispas al mismo tiempo.</p><p><em>IMPORTANTE:</em> Para el armado, por seguridad, recomendamos que consulte con un profesional o una persona idónea para realizar la conexión.</p><p>ACLARACIÓN: Nosotros sólo vendemos el producto: chispas de fuego frío. Damos las recomendaciones del fabricante, pero no nos hacemos responsables si no se realiza el armado correcto.</p><p>CUALQUIER DUDA, CONTAMOS CON EL SERVICIO DE LANZAMIENTO CON PERSONAL IDONEO. (CONSULTAR)</p><p>TODOS nuestros productos cuentan con stock, antes de realizar la compra haga todas las preguntas que considere necesarias.</p><p>GARANTIA: TODOS NUESTROS PRODUCTOS SE TESTEAN ANTES DE ENVIAR. OFRECEMOS GARANTIA, LA MISMA NO APLICA A USOS INDEBIDO DEL PRODUCTO.</p><p>¿COMO SE ENCIENDE?</p><p>Para encenderla manualmente, debes separar los dos extremos del INICIADOR (es el cable que está conectado con la fuente de fuego frío), empalmarlos con la EXTENSIÓN DE CABLE y luego con los 2 polos hacer contacto con:<br>- 1 pila de 9 VOLT si es solo 1 unidad.<br>- Si son 2 o más unidades a encender a la vez, armar un enchufe para conectarlo a una toma de 220 VOLT. Posterior al enchufado, DEBE DESENCHUFAR INMEDIATAMENTE, para evitar que el cable quede con corriente.<br>Una vez encendido, no debe mantenerlo enchufado, ya que solamente necesita la corriente para su encendido, no para su funcionamiento.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'chispas-5mts-1seg.webp',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 10: Detonadores Inalambricos
        $product = Product::create([
            'title' => 'Detonadores Inalambricos',
            'description' => '<p>Potencia tu espectáculo pirotécnico con nuestros detonadores inalámbricos líderes en el mercado! Sin fallas garantizadas, estos dispositivos versátiles son ideales tanto para chispas frias como para todo tipo de pirotecnia.</p><p>¡Lleva tus fuegos artificiales al siguiente nivel con nuestra tecnología de confianza!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'detonadores-inalambricos.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 11: Detonadores inalambricos Kit
        $product = Product::create([
            'title' => 'Detonadores inalambricos Kit',
            'description' => '<p>Kit detonacion inalambrica</p><p>Incluye:</p><ul><li>2 detonadores inalambricos a pila (llevan 4 pilas AA "no integradas")</li><li>2 chispas frias</li><li>2 bases de apoyo</li><li>Control inalambrico para la detonacion</li></ul><p>No te pierdas esta oferta!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'detonador-kit.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion
        
        #region Producto 11: Detonadores inalambricos Kit
        $product = Product::create([
            'title' => 'Detonadores inalambricos Kit',
            'description' => '<p>Kit detonacion inalambrica</p><p>Incluye:</p><ul><li>2 detonadores inalambricos a pila (llevan 4 pilas AA "no integradas")</li><li>2 chispas frias</li><li>2 bases de apoyo</li><li>Control inalambrico para la detonacion</li></ul><p>No te pierdas esta oferta!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'detonador-kit.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 12: Estrellitas Navidad
        $product = Product::create([
            'title' => 'Estrellitas Navidad',
            'description' => '<p>Sirve para interior y exterior. Para fiestas, casamientos, cumpleaños, shows y mucho mas...</p><p><strong>ESTRELLITAS - Paquete de 50 unidades.</strong></p><p>Contiene 10 sobres de 5 unidades cada sobre.</p><p>* Duración: 30 segundos aprox.<br>* Largo: 16cm.</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'estrellitas.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 13: Fuegos Artificiales - Torta "Happy" 16 Tiros
        $product = Product::create([
            'title' => 'Fuegos Artificiales - Torta "Happy" 16 Tiros',
            'description' => '<p>Fuegos Artificiales de distinta cantidad de bombas con/sin estruendo, de colores...</p><p>Consultar disponibilidad, precio y modelos.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'fuegos-artificiales-15tiros.png',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 14: Fuegos Artificiales - Torta "Sublime" 25 Tiros
        $product = Product::create([
            'title' => 'Fuegos Artificiales - Torta "Sublime" 25 Tiros',
            'description' => '<p>Fuegos Artificiales de distinta cantidad de bombas con/sin estruendo, de colores...</p><p>Consultar disponibilidad, precio y modelos.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'fuegos-artificiales-25tiros.png',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 15: Fuegos Artificiales - Torta "Trazo de Plata" 25 tiros (Pet friendly)
        $product = Product::create([
            'title' => 'Fuegos Artificiales - Torta "Trazo de Plata" 25 tiros (Pet friendly)',
            'description' => '<p>Torta trazo de plata...</p><p>25 tiros, divididos en 5 lanzamientos de 5 explosiones simultaneas.</p><p><strong>PET FRIENDLY</strong> - Apto animales.</p><p>LINK DEL VIDEO:</p><p><a href="https://youtube.com/shorts/6a3b-v6ej_M?si=CLBeL_uXCOvkxjWC">https://youtube.com/shorts/6a3b-v6ej_M?si=CLBeL_uXCOvkxjWC</a></p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'fuegos-artificiales-petfriendly.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 16: Kit Detonacion Duke
        $product = Product::create([
            'title' => 'Kit Detonacion Duke',
            'description' => '<p>EL KIT DE DETONACION DUKE INCLUYE :</p><ul><li>2 Bases porta chispa esteticos con borneras</li><li>3 metros de cable para conectar entre las chispas</li><li>5 metros de cable para su detonación</li><li>Detonador alámbrico pulsador con borneras</li></ul><p><em>NO INCLUYE PILA BATERIA 9V</em></p><p><em>NO INCLUYE CHISPAS</em></p><p>Celebra tu evento con un toque mágico y seguro. Con nuestra pirotecnia de fuego frío, llenarás el aire de brillo y emoción sin preocupaciones.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'detonador-duke.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 17: Kit Detonacion
        $product = Product::create([
            'title' => 'Kit Detonacion',
            'description' => '<p>EL KIT DE DETONACION INCLUYE :</p><ul><li>2 Bases porta chispa</li><li>3 metros de cable entre las chispas ya conectado</li><li>5 metros de cable para su detonación</li><li>Detonador alámbrico</li></ul><p><em>NO INCLUYE PILA BATERIA 9V</em></p><p><em>NO INCLUYE CHISPAS</em></p><p>Celebra tu evento con un toque mágico y seguro. Con nuestra pirotecnia de fuego frío, llenarás el aire de brillo y emoción sin preocupaciones.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'kit-detonacion.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 18: Kit Detonacion Listo
        $product = Product::create([
            'title' => 'Kit Detonacion Listo',
            'description' => '<p>EL KIT DE DETONACION LISTO INCLUYE :</p><ul><li>2 Bases porta chispa</li><li>2 Chispas de 2 metros x 30 segundos</li><li>3 metros de cable entre las chispas ya conectado</li><li>5 metros de cable para su detonación</li><li>Detonador alámbrico</li></ul><p><em>NO INCLUYE PILA BATERIA 9V</em></p><p>Celebra tu evento con un toque mágico y seguro. Con nuestra pirotecnia de fuego frío, llenarás el aire de brillo y emoción sin preocupaciones.</p><p><strong>DURACION:</strong> 30 segundos.<br><strong>ALTURA ALCANZADA:</strong> 2 metros.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'kit-detonacion-listo.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 19: Maquina Lanza llamas dmx fuego
        $product = Product::create([
            'title' => 'Maquina Lanza llamas dmx fuego',
            'description' => '<p>Tira a mas de 2.5m de altura.</p><p>300 W DMX Lanza Llamas ideal: DJ, bandas, stage, shows, parties y fiestas.</p><p>Esta maquina se puede controlar con una consola DMX512 o con el interruptor de encendido; los efectos producidos por múltiples proyectores de llama son muy impresionantes.</p><p><strong>Caracteristicas:</strong></p><ul><li>Fácil de controlar, compatible con DMX512.</li><li>2 m2 - Cobertura, área de iluminación grande.</li><li>Fuego real que emite color.</li><li>Forma de fuego de seta, crea un ambiente romántico.</li><li>Cobertura: 2 m2</li><li>Consumo: 200W</li><li>Peso: 4.64 kg</li><li>Tamaño: 61x28x25 cm</li><li>Combustible: líquido de llama de color especial / gas butano (no incluido)</li><li>Modos de control: DMX512, control por cable con pulsador</li><li>Altura: 1.5 a 2.5 metros</li></ul><p>#Lanzallamas #Lanzallama</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'lanzallamas.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 20: Pistola Black (chispas frias)
        $product = Product::create([
            'title' => 'Pistola Black (chispas frias)',
            'description' => '<p>Facil de utilizar - Video funcionando: <a href="https://www.youtube.com/watch?v=-lFsOYWU10U">https://www.youtube.com/watch?v=-lFsOYWU10U</a></p><p>Cuenta con:</p><ul><li>Boton detonador</li><li>Bornera</li><li>Tapa desmontable (pila bateria 9v) "no integrada"</li><li>Porta chispas a rosca</li></ul><p><strong>INSTRUCCIONES:</strong></p><p><em>Paso 1: Colocacion pila Bateria 9v</em></p><ul><li>Abre la tapa desmontable debajo del agarre.</li><li>Coloca una pila de 9V.</li><li>Cierra la tapa.</li></ul><p><em>Paso 2: Colocacion y detonacion Chispa fria</em></p><ul><li>Coloca una chispa dentro del silenciador (porta chispa).</li><li>Inserta los cables del iniciador a la bornera.</li><li>Presiona el gatillo una vez para generar chispas.</li></ul><p><strong>!!! ATENCION !!!</strong> No apuntar hacia objetos inflamables, personas, telas, etc.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'pistola-black.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 21: Pistola Dual (chispas frias)
        $product = Product::create([
            'title' => 'Pistola Dual (chispas frias)',
            'description' => '<p>Facil de utilizar - Video funcionando: <a href="https://www.youtube.com/watch?v=-lFsOYWU10U">https://www.youtube.com/watch?v=-lFsOYWU10U</a></p><p>Cuenta con:</p><ul><li>Boton detonador</li><li>Bornera</li><li>Tapa desmontable (pila bateria 9v) "no integrada"</li><li>Porta chispas a rosca</li></ul><p><strong>INSTRUCCIONES:</strong></p><p><em>Paso 1: Colocacion pila Bateria 9v</em></p><ul><li>Abre la tapa desmontable debajo del agarre.</li><li>Coloca una pila de 9V.</li><li>Cierra la tapa.</li></ul><p><em>Paso 2: Colocacion y detonacion Chispa fria</em></p><ul><li>Coloca una chispa dentro del silenciador (porta chispa).</li><li>Inserta los cables del iniciador a la bornera.</li><li>Presiona el gatillo una vez para generar chispas.</li></ul><p><strong>!!! ATENCION !!!</strong> No apuntar hacia objetos inflamables, personas, telas, etc.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'pistola-brown.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 22: Pistola Golden (chispas frias)
        $product = Product::create([
            'title' => 'Pistola Golden (chispas frias)',
            'description' => '<p>Facil de utilizar - Video funcionando: <a href="https://www.youtube.com/watch?v=-lFsOYWU10U">https://www.youtube.com/watch?v=-lFsOYWU10U</a></p><p>Cuenta con:</p><ul><li>Boton detonador</li><li>Bornera</li><li>Tapa desmontable (pila bateria 9v) "no integrada"</li><li>Porta chispas a rosca</li></ul><p><strong>INSTRUCCIONES:</strong></p><p><em>Paso 1: Colocacion pila Bateria 9v</em></p><ul><li>Abre la tapa desmontable debajo del agarre.</li><li>Coloca una pila de 9V.</li><li>Cierra la tapa.</li></ul><p><em>Paso 2: Colocacion y detonacion Chispa fria</em></p><ul><li>Coloca una chispa dentro del silenciador (porta chispa).</li><li>Inserta los cables del iniciador a la bornera.</li><li>Presiona el gatillo una vez para generar chispas.</li></ul><p><strong>!!! ATENCION !!!</strong> No apuntar hacia objetos inflamables, personas, telas, etc.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'pistola-golden.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 23: Pistola Robotica (chispas frias)
        $product = Product::create([
            'title' => 'Pistola Robotica (chispas frias)',
            'description' => '<p>Facil de utilizar - Video funcionando: <a href="https://www.youtube.com/watch?v=-lFsOYWU10U">https://www.youtube.com/watch?v=-lFsOYWU10U</a></p><p>Cuenta con:</p><ul><li>Boton detonador</li><li>Bornera</li><li>Funciona con una pila bateria 9v (no integrada).</li></ul><p><strong>INSTRUCCIONES:</strong></p><p><em>Paso 1: Colocacion pila Bateria 9v</em></p><ul><li>Abre la tapa debajo del agarre.</li><li>Coloca una pila de 9V.</li><li>Cierra la tapa.</li></ul><p><em>Paso 2: Colocacion y detonacion Chispa fria</em></p><ul><li>Coloca una chispa dentro del agujero.</li><li>Inserta los cables del iniciador a la bornera.</li><li>Presiona el gatillo una vez para generar chispas.</li></ul><p><strong>!!! ATENCION !!!</strong> No apuntar hacia objetos inflamables, personas, telas, etc.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'pistola-robotica.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 24: Potes de Humo - Todos los Colores
        $product = Product::create([
            'title' => 'Potes de Humo - Todos los Colores',
            'description' => '<p><strong>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</strong></p><p>SOMOS MERCADO LIDER</p><p><strong>POTE DE HUMO</strong><br>Para fiestas, casamientos, cumpleaños, shows y mucho mas...<br>Duracion : Aprox 1 minuto<br>El precio es por 1 unidad</p><p>Elegí el color que quieras, selecciona la cantidad y listo! Si querés varias de distintos colores, simplemente debes ir añadiendo al carrito.</p><p>*********************************************************************************************************</p><p><strong>¿COMO SE ENCIENDE?</strong></p><p>Simplemente trae una mecha que se enciende con fuego</p><p>ENVIOS A TODO EL PAIS!!!<br>EL MEJOR PRECIO DEL MERCADO!!!</p><p>SOMOS JREVENTOS &amp; CHISPERIO - VENTA MINORISTA/MAYORISTA</p><p>"PARA QUE SU COMPRA LLEGUE SIN SUFRIR DAÑOS Y SEGURO, NUESTROS EMBALAJES LLEVAN PAPEL BURBUJA DE POLIETILENO Y UTILIZAMOS BOLSAS E-COMMERCE".</p><p>CONTAMOS CON ATENCION PERSONALIZADA LAS 24HS</p><p>POR TODO ESTO, SOMOS LA EMPRESA LIDER DE ARGENTINA</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'potes-humo.jpg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        #region Producto 25: Robot Led (Somos Fabricantes)
        $product = Product::create([
            'title' => 'Robot Led (Somos Fabricantes)',
            'description' => '<p>Todos los trajes incluyen:</p><ul><li>Cargador</li><li>Batería</li><li>Control remoto (o conexión a celu por app)</li><li>Música para el show</li><li>Material audiovisual para venta del show a sus clientes</li><li>Garantía de 1 año</li></ul><p>El traje completo, incluye la primera pechera y el primer casco del estante superior (lado izquierdo), con piernas y brazos. Pecheras y cascos restantes tienen costo adicional. Las 5 pecheras superiores son simples, las 5 inferiores son pecheras enterizas mas grandes, con más del doble de leds, hombreras y espalda. También podemos coordinar una visita a nuestro showroom ubicado en Capital Federal, normalmente tenemos stock para entrega inmediata. Cualquier consulta estamos a su disposicion.</p>',
            'price' => 0,
        ]);

        $product->images()->create([
            'filename' => 'robot-led.jpeg',
            'is_main' => true,
            'order' => 0,
        ]);
        #endregion

        
    }
}



