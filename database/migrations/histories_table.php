<?php
namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
  public function index()
  {
    return History::where('user_id', Auth::id())
      ->latest()
      ->take(30)
      ->get();
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'expression' => 'required|string',
      'result' => 'required|string',
    ]);

    return History::create([
      'user_id' => Auth::id(),
      'expression' => $validated['expression'],
      'result' => $validated['result'],
    ]);
  }
}
?>