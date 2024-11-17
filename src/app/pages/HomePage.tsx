import React, {
  KeyboardEvent,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from "react"
import { Container, IconButton, LinearProgress, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CodeIcon from "@mui/icons-material/Code"
import KeyboardIcon from "@mui/icons-material/Keyboard"
import {
  ChatContainer,
  MessageArea,
  InputContainer,
  StatusBar,
  StyledTextField,
} from "../styles/ChatStyles"
import ChatMessage from "../components/ChatMessage"
import QuickActions from "../components/QuickActions"
import KeyboardShortcutsInfo from "../components/KeyboardShortcutsInfo"
import MatrixMessage from "../components/MatrixMessage"
import { useChat } from "../hooks/useChat"
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"

const quickActions = [
  "Tell me about your AI experience",
  "Can I hire you?",
  "Tell me more about your recent projects.",
  "What's your favorite tech stack?",
  "Lets see your resume.",
  "Can I contact Dylan directly?",
  
  
]

interface HomePageProps {
  darkMode?: boolean
  handleThemeChange?: () => void
}

const HomePage: React.FC<HomePageProps> = ({ darkMode, handleThemeChange }) => {
  const [showMatrix, setShowMatrix] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleQuickAction,
    clearMessages,
  } = useChat()

  const toggleMatrix = () => {
    setShowMatrix(true)
    setTimeout(() => setShowMatrix(false), 3000)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  useKeyboardShortcuts({
    handleSend,
    isLoading,
    clearMessages,
    toggleTheme: handleThemeChange || (() => {}),
    toggleMatrix,
    focusInput,
  })

  useEffect(() => {
    const handleWindowKeyDown = (event: WindowEventMap["keydown"]) => {
      if (
        (event.ctrlKey || event.metaKey || event.shiftKey) &&
        event.key.toLowerCase() === "p"
      ) {
        event.preventDefault()
        toggleMatrix()
        // Your custom logic here, if needed
      }
    }

    window.addEventListener("keydown", handleWindowKeyDown)

    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown)
    }
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <ChatContainer>
        {showMatrix && (
          <MatrixMessage onComplete={() => setShowMatrix(false)} />
        )}
        {isLoading && (
          <LinearProgress
            sx={{
              "position": "absolute",
              "top": 0,
              "left": 0,
              "right": 0,
              "height": "2px",
              "backgroundColor": "transparent",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2ea043",
              },
            }}
          />
        )}
        <MessageArea>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isTyping={
                isLoading && index === messages.length - 1 && !message.$isuser
              }
            />
          ))}

          {messages.length === 1 && (
              <QuickActions
                actions={quickActions}
                onActionClick={handleQuickAction}
              />
          )}
          <div ref={messagesEndRef} />
        </MessageArea>
        <InputContainer>
          <Box
            className='info-trigger'
            sx={{
              "display": "flex",
              "alignItems": "center",
              "position": "relative",
              "ml": -1,
              "mr": 0.5,
              "height": "100%",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "-12px",
                left: 0,
                right: 0,
                height: "12px",
                background: "transparent",
              },
            }}
          >
            <IconButton
              sx={{
                "padding": "6px",
                "color": (theme) =>
                  theme.palette.mode === "light" ? "#626262" : "#848484",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: (theme) =>
                    theme.palette.mode === "light" ? "#2ea043" : "#d4d4d4",
                },
              }}
            >
              <KeyboardIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
            <KeyboardShortcutsInfo
              onClear={clearMessages}
              onToggleTheme={handleThemeChange || (() => {})}
              onMatrixEffect={toggleMatrix}
              onFocusInput={focusInput}
            />
          </Box>
          <StyledTextField
            fullWidth
            variant='outlined'
            placeholder="Ask me anything about Dylan's experience and skills..."
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
              e.key === "Enter" && !e.shiftKey && handleSend()
            }
            size='small'
            disabled={isLoading}
            multiline
            maxRows={4}
            inputRef={inputRef}
          />
          <IconButton
            onClick={handleSend}
            disabled={isLoading}
            sx={{
              "color": "#2ea043",
              "padding": "6px",
              "ml": 0.5,
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&.Mui-disabled": {
                color: "#424242",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </InputContainer>
        <StatusBar istyping={isLoading ? "true" : "false"}>
          <CodeIcon sx={{ width: 16, height: 16 }} />
          {isLoading ? "DylanGPT is typing..." : "DylanGPT Ready"}
        </StatusBar>
      </ChatContainer>
    </Container>
  )
}

export default HomePage
