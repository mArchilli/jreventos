<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowService extends Model
{
    protected $table = 'shows_services';

    protected $fillable = [
        'title',
        'description',
        'img_portada',
        'img_vista',
    ];
}
