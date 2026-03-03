<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Artist extends Model
{
    protected $fillable = ['name', 'description'];

    public function images(): HasMany
    {
        return $this->hasMany(ArtistImage::class)->orderBy('order');
    }

    public function mainImage(): HasOne
    {
        return $this->hasOne(ArtistImage::class)->where('is_main', true);
    }
}
