'use client'

import { useState } from 'react'

interface FoodEntry {
  id: string
  name: string
  protein: number
  fiber: number
  carbs: number
  date: string
}

export default function FoodPage() {
  const [name, setName] = useState('')
  const [protein, setProtein] = useState('')
  const [fiber, setFiber] = useState('')
  const [carbs, setCarbs] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry: FoodEntry = {
      id: Date.now().toString(),
      name,
      protein: parseFloat(protein) || 0,
      fiber: parseFloat(fiber) || 0,
      carbs: parseFloat(carbs) || 0,
      date: new Date().toISOString().split('T')[0]
    }

    const existing = JSON.parse(localStorage.getItem('foods') || '[]')
    existing.push(entry)
    localStorage.setItem('foods', JSON.stringify(existing))

    // Reset form
    setName('')
    setProtein('')
    setFiber('')
    setCarbs('')

    alert('Refeição registrada!')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Registro Alimentar</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da refeição
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proteínas (g)
          </label>
          <input
            type="number"
            step="0.1"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fibras (g)
          </label>
          <input
            type="number"
            step="0.1"
            value={fiber}
            onChange={(e) => setFiber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carboidratos (g)
          </label>
          <input
            type="number"
            step="0.1"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar Refeição
        </button>
      </form>
    </div>
  )
}