import React from 'react'

export default function Sidebar({ params, onParamChange, onSimulate, loading }) {
  return (
    <div className="w-80 bg-industrial-800 border-r border-industrial-700 p-6 overflow-y-auto shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          🔬 Simulator PFR
        </h1>
        <p className="text-industrial-300 text-sm">
          Reactor Chimic Tubular cu Manta de Răcire
        </p>
      </div>

      {/* Separator */}
      <div className="h-px bg-industrial-700 mb-6"></div>

      {/* Parametrii de Simulare */}
      <div className="space-y-6">
        {/* T_in - Temperatura de Intrare */}
        <div className="bg-industrial-700 rounded-lg p-4">
          <label className="block text-industrial-200 text-sm font-semibold mb-3">
            Temperatura de Intrare
          </label>
          <div className="flex items-center justify-between mb-2">
            <input
              type="range"
              min="273"
              max="350"
              step="1"
              value={params.T_in}
              onChange={(e) => onParamChange('T_in', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-industrial-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-industrial-300 text-xs">273 K</span>
            <span className="text-white font-bold text-lg">{params.T_in.toFixed(1)} K</span>
            <span className="text-industrial-300 text-xs">350 K</span>
          </div>
          <p className="text-industrial-400 text-xs mt-2">
            (0°C - 77°C)
          </p>
        </div>

        {/* Flow_Velocity - Viteza Fluidului */}
        <div className="bg-industrial-700 rounded-lg p-4">
          <label className="block text-industrial-200 text-sm font-semibold mb-3">
            Viteza Fluidului
          </label>
          <div className="flex items-center justify-between mb-2">
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={params.Flow_Velocity}
              onChange={(e) => onParamChange('Flow_Velocity', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-industrial-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-industrial-300 text-xs">0.5 m/s</span>
            <span className="text-white font-bold text-lg">{params.Flow_Velocity.toFixed(2)} m/s</span>
            <span className="text-industrial-300 text-xs">5.0 m/s</span>
          </div>
          <p className="text-industrial-400 text-xs mt-2">
            Timp de rezidenţă: {(5.0 / params.Flow_Velocity).toFixed(1)} s
          </p>
        </div>

        {/* T_jacket - Temperatura Manta Răcire */}
        <div className="bg-industrial-700 rounded-lg p-4">
          <label className="block text-industrial-200 text-sm font-semibold mb-3">
            Temperatura Manta Răcire
          </label>
          <div className="flex items-center justify-between mb-2">
            <input
              type="range"
              min="250"
              max="300"
              step="1"
              value={params.T_jacket}
              onChange={(e) => onParamChange('T_jacket', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-industrial-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-industrial-300 text-xs">250 K</span>
            <span className="text-white font-bold text-lg">{params.T_jacket.toFixed(1)} K</span>
            <span className="text-industrial-300 text-xs">300 K</span>
          </div>
          <p className="text-industrial-400 text-xs mt-2">
            (-23°C - 27°C)
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-industrial-700 my-6"></div>

      {/* Buton Simulare */}
      <button
        onClick={onSimulate}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition duration-300 ${
          loading
            ? 'bg-industrial-600 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <span className="inline-block animate-spin mr-2">⚙️</span>
            Se execută...
          </span>
        ) : (
          <span>▶ Execută Simulare</span>
        )}
      </button>

      {/* Info Parametrii */}
      <div className="mt-8 bg-industrial-700 rounded-lg p-4 text-xs text-industrial-300 space-y-2">
        <p className="font-semibold text-industrial-100">Parametrii Reactorului:</p>
        <p>• Lungime: 5.0 m</p>
        <p>• Diametru: 0.05 m</p>
        <p>• Reacție: A → B (exotermă)</p>
      </div>
    </div>
  )
}
