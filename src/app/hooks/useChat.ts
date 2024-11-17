import { useState, useRef, useEffect } from "react"
import { Message } from "../types/chat"
import { generateResponse, generateStreamingResponse } from "../services/openai"

const INITIAL_MESSAGE: Message = {
  content:
    "Hi! I'm DylanGPT, an AI assistant that can tell you all about Dylan's experience, projects, and skills. What would you like to know?",
  $isuser: false,
}

interface ChatHookReturn {
  messages: Message[]
  input: string
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
  setInput: (input: string) => void
  handleSend: () => Promise<void>
  handleQuickAction: (action: string) => Promise<void>
  clearMessages: () => void
}

export const useChat = (): ChatHookReturn => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { content: userMessage, $isuser: true }])
    setInput("")
    setIsLoading(true)

    try {
      let streamingContent = ""
      setMessages((prev) => [...prev, { content: "", $isuser: false }])

      await generateStreamingResponse(userMessage, (chunk) => {
        streamingContent += chunk
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            content: streamingContent,
            $isuser: false,
          }
          return newMessages
        })
      })
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          content:
            "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later.",
          $isuser: false,
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action: string) => {
    if (isLoading) return

    setMessages((prev) => [...prev, { content: action, $isuser: true }])
    setIsLoading(true)

    try {
      let streamingContent = ""
      setMessages((prev) => [...prev, { content: "", $isuser: false }])

      await generateStreamingResponse(action, (chunk) => {
        streamingContent += chunk
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            content: streamingContent,
            $isuser: false,
          }
          return newMessages
        })
      })
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          content:
            "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later.",
          $isuser: false,
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([INITIAL_MESSAGE])
    setInput("")
  }

  return {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleQuickAction,
    clearMessages,
  }
}
