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
                "symbol" => $stock->symbol,
                "name" => $stock->name,
                "ipo_date" => $stock->ipo_date,
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

    public function getPreviousClosure(Request $request)
    {
        $symbol = $request->symbol;
        $client = new Client();
        $date = ((new DateTime())->modify('-1 day'));
        while ($this->todayIsWeekend($date->getTimestamp())) {
            $this->dayBefore($date);
        }
        $previousClosureDate = $date->format('Y-m-d');

        $url = "https://api.polygon.io/v1/open-close/{$symbol}/{$previousClosureDate}?adjusted=true&apiKey=0VTf76NpgIWSjLdcXGWFQ9HHlhJfpbhw";

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

    public function getCompanyInfo(Request $request) {
        $symbol = $request->symbol;
        $client = new Client();
    
        $url = "https://financialmodelingprep.com/api/v3/profile/{$symbol}?apikey=MrrYYu8BTYKri7R8QIcPY40FtGnIDEFG";
    
        try {
            $response = $client->get($url);
            $data = json_decode($response->getBody());
    
            if (empty($data)) {
                return response()->json(['error' => 'Company data not found'], 404);
            }
    
            $formattedData = [
                'symbol' => $data[0]->{"symbol"},
                'description' => $data[0]->{"description"},
                'ceo' => $data[0]->{"ceo"},
                'city' => $data[0]->{"city"},
                'address' => $data[0]->{"address"}
            ];
    
            return response()->json($formattedData);
        } catch (RequestException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function todayIsWeekend($date) {
        $day = date("D", $date);
        if($day == 'Sat' || $day == 'Sun'){
            return true;
        }
        return false;
    }

    private function dayBefore ($date) {
        $date = $date
        ->modify('-1 day');
        return $date;
    }
}