<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtistImage extends Model
{
    protected $fillable = ['artist_id', 'filename', 'is_main', 'order'];

    protected $casts = [
        'is_main' => 'boolean',
    ];

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }
}
