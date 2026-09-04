import { useState } from 'react'

import type { ChatMessage } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getChatResponse } from '@/services/aiService'

const MAX_RETRIES = 3
const BASE_DELAY = 5000

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

const cleanMarkdown = (text: string) => {
  return text
    .replace(/\*\*/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/---/g, '')
    .trim()
}

export const useChat = (simulationId: string) => {
  const { getFormData, updateSimulation } = useSimulationStorage()

  const simulation = getFormData(simulationId)

  const [messages, setMessages] = useState<ChatMessage[]>(
    simulation?.chat ?? [],
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (question: string) => {
    if (!question.trim() || isLoading) {
      return
    }

    const currentSimulation = getFormData(simulationId)

    if (!currentSimulation) {
      setError('Simulação não encontrada.')
      return
    }

    setIsLoading(true)
    setError(null)

    const userMessage: ChatMessage = {
      role: 'user',
      content: question.trim(),
    }

    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)

    try {
      const conversation = updatedMessages
        .map(
          (message) =>
            `${message.role === 'user' ? 'Usuário' : 'Educador Financeiro'}: ${message.content}`,
        )
        .join('\n')

      const prompt = `
Você é um educador financeiro pessoal.

Você está conversando com o usuário sobre uma simulação financeira que já foi analisada anteriormente.

Dados da simulação:
- Renda mensal: ${currentSimulation.income}
- Custos fixos: ${currentSimulation.expenses}
- Dívidas e parcelas: ${currentSimulation.debts}
- Meta: ${currentSimulation.goalName}
- Custo da meta: ${currentSimulation.goalAmount}
- Prazo: ${currentSimulation.goalDeadline} meses

Insight financeiro inicial:
${JSON.stringify(currentSimulation.insight)}

Histórico da conversa:
${conversation}

Responda à última pergunta do usuário.

Regras:
- Responda em português do Brasil.
- Seja claro, didático e objetivo.
- Fale diretamente com o usuário usando "você".
- Considere os dados da simulação e o insight financeiro apresentado.
- Leve em consideração o histórico da conversa para manter o contexto.
- Não invente informações sobre a situação financeira do usuário.
- Não use Markdown.
- Não use asteriscos (**), hashtags (#) ou outros marcadores de formatação.
- Não use JSON.
- Retorne apenas a resposta que será exibida diretamente ao usuário.
`

      let response = ''

      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          response = await getChatResponse(prompt)
          break
        } catch (requestError) {
          const errorMessage =
            requestError instanceof Error ? requestError.message : ''

          const isRetryable =
            errorMessage.includes('429') || errorMessage.includes('503')

          if (!isRetryable || attempt === MAX_RETRIES) {
            throw requestError
          }

          await wait(BASE_DELAY * 2 ** (attempt - 1))
        }
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: cleanMarkdown(response),
      }

      const finalMessages = [...updatedMessages, assistantMessage]

      setMessages(finalMessages)

      updateSimulation(simulationId, {
        ...currentSimulation,
        chat: finalMessages,
      })
    } catch {
      setMessages(messages)
      setError('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  }
}
