import React from "react"
import { Typography } from "@mui/material"
import ReactMarkdown from "react-markdown"
import { Message, MessageContent, Avatar } from "../styles/ChatStyles"
import { Message as MessageType } from "../types/chat"
import CodeBlock from "./CodeBlock"

interface ChatMessageProps {
  message: MessageType
  isTyping?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isTyping = false,
}) => {
  return (
    <Message $isuser={message.$isuser}>
      {!message.$isuser && (
        <Avatar istyping={isTyping ? "true" : undefined}>
          <img
            src='/favicon.png'
            alt='AI'
            style={{
              width: "56px",
              height: "56px",
              transition: "transform 0.2s ease",
            }}
          />
        </Avatar>
      )}
      <MessageContent $isuser={message.$isuser} error={message.error}>
        {message.$isuser ? (
          <Typography
            variant='body1'
            sx={{ fontSize: "14px", lineHeight: 1.6 }}
          >
            {message.content}
          </Typography>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <CodeBlock
                    language={match[1]}
                    value={String(children).replace(/\n$/, "")}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </MessageContent>
    </Message>
  )
}

export default ChatMessage
