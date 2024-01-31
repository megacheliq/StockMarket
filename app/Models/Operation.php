<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    use HasFactory;

    protected $table = 'operations';

    protected $fillable = [
        'user_id',
        'stock_id',
        'operation_type',
        'amount',
        'single_stock_price',
        'bought_at',
        'stock_from',
        'sell_at',
    ];

    public $timestamps = false;

}
