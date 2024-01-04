<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    public function getStocksList(Request $request)
    {
        $stocks = Stock::all();

        $formattedStocks = $stocks->map(function ($stock) {
            return [
                'symbol' => $stock->symbol,
                'name' => $stock->name,
                'ipo_date' => $stock->ipo_date,
            ];
        });

        return response()->json($formattedStocks);
    }
}
