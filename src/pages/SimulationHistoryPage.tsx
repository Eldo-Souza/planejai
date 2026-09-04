import { Eye, Goal, PiggyBank, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { parseCurrency } from '@/utils/currency'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()

  const [simulations, setSimulations] = useState(getAllSimulations)

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations(getAllSimulations())
  }

  const formatDate = (date: string) => {
    if (!date) {
      return 'Data não disponível'
    }

    return new Date(date).toLocaleDateString('pt-BR')
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
        Histórico de simulações
      </h1>

      <p className="text-muted-foreground mb-8 text-sm">
        Acompanhe o histórico de seus planos financeiros.
      </p>

      <div className="flex flex-col gap-3">
        {simulations.map((simulation) => {
          const monthlySavings =
            parseCurrency(simulation.goalAmount) /
            Number(simulation.goalDeadline)

          return (
            <div
              key={simulation.id}
              className="bg-card flex flex-col gap-4 rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:gap-5 sm:px-5"
            >
              {/* Ícone + nome da meta */}
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  <Goal size={22} className="text-primary-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {simulation.goalName}
                  </p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    {formatDate(simulation.createdAt)}
                  </p>
                </div>
              </div>

              {/* Informações */}
              <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6">
                <div>
                  <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                    Custo da meta
                  </p>

                  <p className="text-foreground mt-1 text-xs font-semibold sm:text-sm">
                    R$ {simulation.goalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                    Prazo
                  </p>

                  <p className="text-foreground mt-1 text-xs font-semibold sm:text-sm">
                    {simulation.goalDeadline} meses
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                    Economia mensal
                  </p>

                  <p className="text-foreground mt-1 text-xs font-semibold sm:text-sm">
                    R${' '}
                    {monthlySavings.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-end gap-4 sm:ml-1">
                <button
                  type="button"
                  aria-label={`Excluir simulação ${simulation.goalName}`}
                  onClick={() => handleDelete(simulation.id)}
                  className="text-muted-foreground cursor-pointer transition-opacity hover:opacity-70"
                >
                  <Trash2 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/resultado/${simulation.id}`)}
                  className="bg-secondary-button text-foreground flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                >
                  <Eye size={14} />
                  Ver detalhes
                </button>
              </div>
            </div>
          )
        })}

        {simulations.length === 0 && (
          <div className="bg-card rounded-2xl p-8 text-center">
            <PiggyBank
              size={32}
              className="text-muted-foreground mx-auto mb-3"
            />

            <p className="text-muted-foreground text-sm">
              Nenhuma simulação encontrada.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
