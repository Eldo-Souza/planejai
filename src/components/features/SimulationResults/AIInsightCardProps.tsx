import 'react-loading-skeleton/dist/skeleton.css'

import { Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useChat } from '@/hooks/useChat'
import { useInsight } from '@/hooks/useInsight'
import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId)

  const {
    messages,
    isLoading: isChatLoading,
    error: chatError,
    sendMessage,
  } = useChat(simulationId)

  const [question, setQuestion] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isChatLoading])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!question.trim() || isChatLoading) {
      return
    }

    const currentQuestion = question
    setQuestion('')

    await sendMessage(currentQuestion)
  }

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}

      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}

      {!isLoading && insight && !error && (
        <>
          <Content insight={insight} />

          <div className="border-border mt-6 border-t pt-5">
            <div className="mb-3">
              <h3 className="text-foreground text-sm font-semibold">
                💬 Converse com o educador financeiro
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                Tire dúvidas sobre seu diagnóstico e sua meta.
              </p>
            </div>

            {messages.length > 0 && (
              <div className="mb-4 max-h-72 space-y-3 overflow-y-auto pr-2">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary-button text-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary-button text-muted-foreground rounded-2xl px-4 py-3 text-sm">
                      Educador financeiro está pensando...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {chatError && (
              <p className="mb-3 text-sm text-red-500">{chatError}</p>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Digite sua pergunta..."
                disabled={isChatLoading}
                className="bg-input text-foreground placeholder:text-muted-foreground min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                disabled={!question.trim() || isChatLoading}
                aria-label="Enviar pergunta"
                className="bg-primary text-primary-foreground flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
