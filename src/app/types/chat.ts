export interface Message {
  content: string
  $isuser: boolean
  error?: boolean
}

export interface MessageProps {
  $isuser: boolean
}

export interface MessageContentProps {
  $isuser: boolean
  error?: boolean
}
