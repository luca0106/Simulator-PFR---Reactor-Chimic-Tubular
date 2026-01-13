import React, { useState, useCallback } from 'react'
import axios from 'axios'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [simulationParams, setSimulationParams] = useState({
    T_in: 300,        // K
    Flow_Velocity: 2.0, // m/s
    T_jacket: 280      // K
  })

  const [simulationData, setSimulationData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const runSimulation = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('http://localhost:8000/simulate', simulationParams)
      setSimulationData(response.data)
    } catch (err) {
      setError(`Eroare la simulare: ${err.message}`)
      console.error('Simulation error:', err)
    } finally {
      setLoading(false)
    }
  }, [simulationParams])

  const handleParamChange = (param, value) => {
    setSimulationParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  return (
    <div className="flex h-screen bg-industrial-900">
      <Sidebar 
        params={simulationParams}
        onParamChange={handleParamChange}
        onSimulate={runSimulation}
        loading={loading}
      />
      <Dashboard 
        data={simulationData}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App
