import React from 'react'

export default function KPICard({ title, value, unit, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-900 to-blue-800 border-blue-700',
    red: 'from-red-900 to-red-800 border-red-700',
    green: 'from-green-900 to-green-800 border-green-700',
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-industrial-300 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            {value} <span className="text-lg text-industrial-300">{unit}</span>
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
