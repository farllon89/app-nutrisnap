'use client'

import { useState } from 'react'

interface MedicationEntry {
  id: string
  medication: string
  date: string
  time: string
}

export default function MedicationPage() {
  const [medication, setMedication] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry: MedicationEntry = {
      id: Date.now().toString(),
      medication,
      date,
      time
    }

    const existing = JSON.parse(localStorage.getItem('medications') || '[]')
    existing.push(entry)
    localStorage.setItem('medications', JSON.stringify(existing))

    // Reset form
    setMedication('')
    setDate(new Date().toISOString().split('T')[0])
    setTime(new Date().toTimeString().slice(0, 5))

    alert('Aplicação registrada!')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Registro de Medicamento</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicamento
          </label>
          <select
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione...</option>
            <option value="Ozempic">Ozempic</option>
            <option value="Mounjaro">Mounjaro</option>
            <option value="Wegovy">Wegovy</option>
            <option value="Saxenda">Saxenda</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data da aplicação
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Horário da aplicação
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar Aplicação
        </button>
      </form>
    </div>
  )
}