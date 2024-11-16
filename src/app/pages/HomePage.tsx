import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react"
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Container,
  Divider,
  LinearProgress,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import CodeIcon from "@mui/icons-material/Code"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { styled } from "@mui/material/styles"
import { generateResponse } from "../services/openai"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"



const ChatContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1e1e1e",
  color: "#d4d4d4",
  padding: 0,
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "4px",
  border: "1px solid #323232",
  position: "relative",
}))

const MessageArea = styled(Box)({
  "flexGrow": 1,
  "overflowY": "auto",
  "padding": "16px",
  "&::-webkit-scrollbar": {
    width: "14px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#424242",
    border: "3px solid #1e1e1e",
    borderRadius: "7px",
  },
})

const InputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#2d2d2d",
  padding: "12px 16px",
  borderTop: "1px solid #323232",
})

const StatusBar = styled(Box)({
  backgroundColor: "#007acc",
  color: "white",
  padding: "4px 16px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderTop: "1px solid #323232",
})

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "#d4d4d4",
    backgroundColor: "#1e1e1e",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#424242",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#626262",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#007acc",
  },
})

interface MessageProps {
  isUser: boolean
}

const Message = styled(Box)<MessageProps>(({ isUser }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "24px",
  flexDirection: isUser ? "row-reverse" : "row",
  gap: "12px",
}))

interface MessageContentProps {
  isUser: boolean
  error?: boolean
}

const MessageContent = styled(Paper)<MessageContentProps>(
  ({ isUser, error }) => ({
    "padding": "12px 16px",
    "maxWidth": "85%",
    "backgroundColor": error ? "#320000" : isUser ? "#2d2d2d" : "#1e1e1e",
    "border": `1px solid ${error ? "#ff0000" : "#323232"}`,
    "borderRadius": "4px",
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "4px",
      marginTop: "8px",
      marginBottom: "8px",
    },
    "& a": {
      "color": "#007acc",
      "textDecoration": "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& pre": {
      margin: "8px 0",
      padding: 0,
      backgroundColor: "transparent",
    },
    "& code": {
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      fontSize: "14px",
    },
  })
)

const Avatar = styled(Box)({
  width: "32px",
  height: "32px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#2d2d2d",
  border: "1px solid #424242",
})

const QuickAction = styled(Box)({
  "padding": "8px 12px",
  "backgroundColor": "#2d2d2d",
  "border": "1px solid #424242",
  "borderRadius": "4px",
  "cursor": "pointer",
  "marginRight": "8px",
  "marginBottom": "8px",
  "display": "inline-block",
  "transition": "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#3d3d3d",
    borderColor: "#007acc",
    transform: "translateY(-1px)",
  },
})

const TypingIndicator = styled(Box)({
  "display": "flex",
  "gap": "4px",
  "padding": "4px 8px",
  "& > span": {
    "width": "4px",
    "height": "4px",
    "backgroundColor": "#007acc",
    "borderRadius": "50%",
    "animation": "typing 1s infinite ease-in-out",
    "&:nth-of-type(1)": {
      animationDelay: "0s",
    },
    "&:nth-of-type(2)": {
      animationDelay: "0.2s",
    },
    "&:nth-of-type(3)": {
      animationDelay: "0.4s",
    },
  },
  "@keyframes typing": {
    "0%, 100%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(-4px)",
    },
  },
})

const quickActions = [
  "Tell me about your AI experience",
  "What are your key projects?",
  "What's your tech stack?",
  "Show me your experience",
]

interface ChatMessage {
  content: string
  isUser: boolean
  error?: boolean
}

const HomePage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content:
        "Hi! I'm DylanGPT, an AI assistant that can tell you all about Dylan's experience, projects, and skills. What would you like to know?",
      isUser: false,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { content: userMessage, isUser: true }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateResponse(userMessage)
      setMessages((prev) => [...prev, { content: response, isUser: false }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          content:
            "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later.",
          isUser: false,
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = async (action: string) => {
    if (isLoading) return

    setMessages((prev) => [...prev, { content: action, isUser: true }])
    setIsLoading(true)

    try {
      const response = await generateResponse(action)
      setMessages((prev) => [...prev, { content: response, isUser: false }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          content:
            "I apologize, but I'm having trouble connecting to my AI services right now. Please try again later.",
          isUser: false,
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <ChatContainer>
        {isLoading && (
          <LinearProgress
            sx={{
              "position": "absolute",
              "top": 0,
              "left": 0,
              "right": 0,
              "height": "2px",
              "backgroundColor": "#1e1e1e",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#007acc",
              },
            }}
          />
        )}
        <MessageArea>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              <Avatar>
                {msg.isUser ? (
                  <AccountCircleIcon
                    sx={{ color: "#007acc", width: 24, height: 24 }}
                  />
                ) : (
                  <img
                    src='/favicon.png'
                    alt='AI'
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
              </Avatar>
              <MessageContent isUser={msg.isUser} error={msg.error}>
                {msg.isUser ? (
                  <Typography
                    variant='body1'
                    sx={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {msg.content}
                  </Typography>
                ) : (
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus as any}
                            language={match[1]}
                            PreTag='div'
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                          ></SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
              </MessageContent>
            </Message>
          ))}
          {isLoading && (
            <Message isUser={false}>
              <Avatar>
                <img
                  src='/favicon.png'
                  alt='AI'
                  style={{ width: "20px", height: "20px" }}
                />
              </Avatar>
              <MessageContent isUser={false}>
                <TypingIndicator>
                  <span />
                  <span />
                  <span />
                </TypingIndicator>
              </MessageContent>
            </Message>
          )}
          {messages.length === 1 && (
            <Box sx={{ mt: 2 }}>
              {quickActions.map((action, index) => (
                <QuickAction
                  key={index}
                  onClick={() => handleQuickAction(action)}
                >
                  <Typography variant='body2' sx={{ fontSize: "13px" }}>
                    {action}
                  </Typography>
                </QuickAction>
              ))}
            </Box>
          )}
          <div ref={messagesEndRef} />
        </MessageArea>
        <InputContainer>
          <StyledTextField
            fullWidth
            variant='outlined'
            placeholder="Ask me anything about Dylan's experience and skills..."
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(e.target.value)
            }
            onKeyPress={(e: KeyboardEvent<HTMLDivElement>) =>
              e.key === "Enter" && handleSend()
            }
            size='small'
            disabled={isLoading}
          />
          <IconButton
            onClick={handleSend}
            disabled={isLoading}
            sx={{
              "color": "#007acc",
              "&:hover": {
                backgroundColor: "#1e1e1e",
              },
              "&.Mui-disabled": {
                color: "#424242",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </InputContainer>
        <StatusBar>
          <CodeIcon sx={{ width: 16, height: 16 }} />
          DylanGPT Ready
        </StatusBar>
      </ChatContainer>
    </Container>
  )
}

export default HomePage
