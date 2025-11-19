'use client'

import { useState } from 'react'

interface SymptomEntry {
  id: string
  text: string
  date: string
}

export default function SymptomsPage() {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry: SymptomEntry = {
      id: Date.now().toString(),
      text,
      date: new Date().toISOString().split('T')[0]
    }

    const existing = JSON.parse(localStorage.getItem('symptoms') || '[]')
    existing.push(entry)
    localStorage.setItem('symptoms', JSON.stringify(existing))

    // Reset form
    setText('')

    alert('Sintomas registrados!')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Registro de Sintomas</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Como você está se sentindo hoje?
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva seus sintomas, efeitos colaterais ou como está se sentindo..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar Sintomas
        </button>
      </form>
    </div>
  )
}