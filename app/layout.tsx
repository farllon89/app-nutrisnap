import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NutriSnap',
  description: 'Acompanhamento nutricional para usuários de medicamentos emagrecedores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">NutriSnap</h1>
              </div>
              <div className="flex space-x-4">
                <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                <a href="/food" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Registro Alimentar</a>
                <a href="/medication" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Medicamento</a>
                <a href="/symptoms" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Sintomas</a>
                <a href="/history" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Histórico</a>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}