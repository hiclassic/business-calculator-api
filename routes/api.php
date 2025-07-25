<?php 
use App\Http\Controllers\HistoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/history', [HistoryController::class, 'index']);
  Route::post('/history', [HistoryController::class, 'store']);
});
?>
