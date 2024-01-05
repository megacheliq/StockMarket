<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use DateTime;
use Illuminate\Http\Request;
use App\Models\Stock;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class StockController extends Controller
{
    public function getStocksList(Request $request)
    {
        $stocks = Stock::where('asset_type', 'Stock')->get();

        $formattedStocks = $stocks->map(function ($stock) {
            return [
                'symbol' => $stock->symbol,
                'name' => $stock->name,
                'ipo_date' => $stock->ipo_date,
            ];
        });

        return response()->json($formattedStocks);
    }

    public function getStockFullInfo(Request $request)
    {
        $symbol = $request->symbol;
        $stock = Stock::where('symbol', $symbol)->first();
        return response()->json($stock);
    }

    public function getStockYesterdayDetail(Request $request)
    {
        $symbol = $request->symbol;
        $client = new Client();
        $yesterdayDate = (new DateTime())->modify('-1 day')->format('Y-m-d');
        $url = "https://api.polygon.io/v1/open-close/{$symbol}/{$yesterdayDate}?adjusted=true&apiKey=0VTf76NpgIWSjLdcXGWFQ9HHlhJfpbhw";

        try {
            $response = $client->get($url);
            $data = json_decode($response->getBody(), true);
            return response()->json($data);

        } catch (RequestException $e) {
            if ($e->getResponse() && $e->getResponse()->getStatusCode() == 404) {
                return response()->json(['error' => 'Not found'], 404);
            }

            if ($e->getResponse() && $e->getResponse()->getStatusCode() == 429) {
                return response()->json(['error' => 'Too many requests'], 429);
            }

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}