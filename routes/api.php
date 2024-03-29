<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\StockController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class,'logout']);
});

Route::post('/signup', [AuthController::class,'signup']);
Route::post('/login', [AuthController::class,'login']);

Route::get('/getStocks', [StockController::class,'getStocksList']);
Route::get('/stockInfo/{symbol}', [StockController::class,'getStockFullInfo']);
Route::get('/previousClosure/{symbol}', [StockController::class,'getPreviousClosure']);
Route::get('/companyInfo/{symbol}', [StockController::class, 'getCompanyInfo']);
Route::get('/getPortfolio/{email}', [StockController::class, 'getPortfolio']);
Route::get('/getOperations/{email}', [StockController::class, 'getOperations']);

Route::post('/buyStock', [StockController::class, 'buyStock']);
Route::post('/sellStock', [StockController::class, 'sellStock']);