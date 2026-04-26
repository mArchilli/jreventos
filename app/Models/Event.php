<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'timeline',
        'includes',
        'testimonials',
        'card_image_id',
        'hero_image_id',
    ];

    protected $casts = [
        'timeline'     => 'array',
        'includes'     => 'array',
        'testimonials' => 'array',
    ];

    public function images()
    {
        return $this->hasMany(EventImage::class);
    }

    public function cardImage()
    {
        return $this->belongsTo(EventImage::class, 'card_image_id');
    }

    public function heroImage()
    {
        return $this->belongsTo(EventImage::class, 'hero_image_id');
    }
}
