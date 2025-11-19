'use client'

import { useState, useEffect } from 'react'

interface FoodEntry {
  id: string
  name: string
  protein: number
  fiber: number
  carbs: number
  date: string
}

interface MedicationEntry {
  id: string
  medication: string
  date: string
  time: string
}

interface SymptomEntry {
  id: string
  text: string
  date: string
}

export default function Dashboard() {
  const [todayFoods, setTodayFoods] = useState<FoodEntry[]>([])
  const [lastMedication, setLastMedication] = useState<MedicationEntry | null>(null)
  const [lastSymptom, setLastSymptom] = useState<SymptomEntry | null>(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]

    // Load today's foods
    const foods = JSON.parse(localStorage.getItem('foods') || '[]') as FoodEntry[]
    const todaysFoods = foods.filter(food => food.date === today)
    setTodayFoods(todaysFoods)

    // Load last medication
    const medications = JSON.parse(localStorage.getItem('medications') || '[]') as MedicationEntry[]
    const sortedMeds = medications.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
    setLastMedication(sortedMeds[0] || null)

    // Load last symptom
    const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]') as SymptomEntry[]
    const sortedSymptoms = symptoms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setLastSymptom(sortedSymptoms[0] || null)
  }, [])

  const totalProtein = todayFoods.reduce((sum, food) => sum + food.protein, 0)
  const totalFiber = todayFoods.reduce((sum, food) => sum + food.fiber, 0)
  const totalCarbs = todayFoods.reduce((sum, food) => sum + food.carbs, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Macros */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Consumo Diário</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Proteínas:</span>
              <span className="font-medium">{totalProtein.toFixed(1)}g</span>
            </div>
            <div className="flex justify-between">
              <span>Fibras:</span>
              <span className="font-medium">{totalFiber.toFixed(1)}g</span>
            </div>
            <div className="flex justify-between">
              <span>Carboidratos:</span>
              <span className="font-medium">{totalCarbs.toFixed(1)}g</span>
            </div>
          </div>
        </div>

        {/* Last Medication */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Última Aplicação</h2>
          {lastMedication ? (
            <div>
              <p className="font-medium">{lastMedication.medication}</p>
              <p className="text-sm text-gray-600">
                {new Date(lastMedication.date).toLocaleDateString('pt-BR')} às {lastMedication.time}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma aplicação registrada</p>
          )}
        </div>

        {/* Last Symptom */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Últimos Sintomas</h2>
          {lastSymptom ? (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(lastSymptom.date).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-sm">{lastSymptom.text}</p>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum sintoma registrado</p>
          )}
        </div>
      </div>
    </div>
  )
}