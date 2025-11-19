'use client'

import { useState, useEffect } from 'react'

interface MedicationEntry {
  id: string
  medication: string
  date: string
  time: string
}

export default function HistoryPage() {
  const [medications, setMedications] = useState<MedicationEntry[]>([])

  useEffect(() => {
    const meds = JSON.parse(localStorage.getItem('medications') || '[]') as MedicationEntry[]
    setMedications(meds.sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime()))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Histórico de Medicamentos</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horário
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medications.map((med) => (
              <tr key={med.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {med.medication}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(med.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {med.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {medications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum medicamento registrado ainda.
          </div>
        )}
      </div>
    </div>
  )
}