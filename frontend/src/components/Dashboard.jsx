import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function Dashboard({ data, loading, error }) {
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 text-red-100 max-w-md">
          <h3 className="font-bold text-lg mb-2">❌ Eroare</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-industrial-200 mb-2">
            Execută o simulare
          </h2>
          <p className="text-industrial-400">
            Ajustează parametrii din panoul lateral și apasă "Execută Simulare"
          </p>
        </div>
      </div>
    )
  }

  // Prepară datele pentru grafice
  const chartData = data.z_axis.map((z, index) => ({
    z: z.toFixed(2),
    temperatura: Math.round(data.temperature_profile[index] * 10) / 10,
    concentratie: Math.round(data.concentration_profile[index] * 100) / 100,
  }))

  return (
    <div className="flex-1 overflow-auto bg-industrial-900">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">⚙️</div>
            <p className="text-white">Se procesează simularea...</p>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Rezultate Simulare PFR
          </h1>
          <p className="text-industrial-400">
            Profil de temperatură și concentrație de-a lungul reactorului
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700 rounded-lg p-6 shadow-lg">
            <p className="text-industrial-300 text-sm mb-1">Conversia Finală</p>
            <p className="text-4xl font-bold text-blue-300">
              {data.final_conversion.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-900 to-red-800 border border-red-700 rounded-lg p-6 shadow-lg">
            <p className="text-industrial-300 text-sm mb-1">Temperatura Maximă</p>
            <p className="text-4xl font-bold text-red-300">
              {data.max_temperature.toFixed(1)} K
            </p>
            <p className="text-industrial-400 text-xs mt-1">
              ({(data.max_temperature - 273.15).toFixed(1)}°C)
            </p>
          </div>
        </div>

        {/* Grafice */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Grafic Temperatură */}
          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              🌡️ Profil Temperatură
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis
                  dataKey="z"
                  stroke="#9ca3af"
                  label={{ value: 'Poziție z [m]', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis
                  stroke="#9ca3af"
                  label={{ value: 'Temperatură [K]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperatura"
                  stroke="#ef4444"
                  dot={false}
                  strokeWidth={2}
                  name="Temperatură (K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Grafic Concentrație */}
          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">
              ⚗️ Profil Concentrație
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                <XAxis
                  dataKey="z"
                  stroke="#9ca3af"
                  label={{ value: 'Poziție z [m]', position: 'insideBottomRight', offset: -5 }}
                />
                <YAxis
                  stroke="#9ca3af"
                  label={{ value: 'Concentrație [mol/m³]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #4b5563',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="concentratie"
                  stroke="#3b82f6"
                  dot={false}
                  strokeWidth={2}
                  name="Concentrație (mol/m³)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Detaliat */}
        <div className="mt-8 bg-industrial-800 border border-industrial-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">📋 Date Numerice</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-industrial-400">Temperatura Intrare</p>
              <p className="text-white font-semibold">
                {data.temperature_profile[0].toFixed(1)} K
              </p>
            </div>
            <div>
              <p className="text-industrial-400">Temperatura Ieșire</p>
              <p className="text-white font-semibold">
                {data.temperature_profile[data.temperature_profile.length - 1].toFixed(1)} K
              </p>
            </div>
            <div>
              <p className="text-industrial-400">Concentrație Intrare</p>
              <p className="text-white font-semibold">
                {data.concentration_profile[0].toFixed(3)} mol/m³
              </p>
            </div>
            <div>
              <p className="text-industrial-400">Concentrație Ieșire</p>
              <p className="text-white font-semibold">
                {data.concentration_profile[data.concentration_profile.length - 1].toFixed(3)} mol/m³
              </p>
            </div>
            <div>
              <p className="text-industrial-400">Lungime Reactor</p>
              <p className="text-white font-semibold">5.00 m</p>
            </div>
            <div>
              <p className="text-industrial-400">Salturi de Calcul</p>
              <p className="text-white font-semibold">{data.z_axis.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
