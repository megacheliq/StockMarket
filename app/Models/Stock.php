<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    protected $table = 'stocks';

    protected $fillable = [
        'symbol',
        'name',
        'exchange',
        'asset_type',
        'ipo_date',
        'delisting_date',
        'status',
    ];
}
