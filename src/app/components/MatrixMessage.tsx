import React, { useReducer, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { styled, keyframes } from "@mui/material/styles"

const matrixRain = keyframes`
  0% {
    text-shadow: 0 0 0 #0f0;
  }
  50% {
    text-shadow: 0 0 10px #0f0, 0 0 20px #0f0;
  }
  100% {
    text-shadow: 0 0 0 #0f0;
  }
`

const MatrixContainer = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
})

const MatrixText = styled(Typography)({
  fontFamily: "Consolas, monospace",
  color: "#0f0",
  animation: `${matrixRain} 2s infinite`,
  whiteSpace: "pre",
})

interface MatrixMessageProps {
  onComplete: () => void
}

let usageCount = 0 // Track how many times the component has been used

const initialState = (startIndex: number) => ({
  displayText: "",
  currentMessageIndex: startIndex,
  isDeleting: false,
  isRunning: false,
})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return { ...state, displayText: action.payload }
    case "TOGGLE_DELETING":
      return { ...state, isDeleting: !state.isDeleting }
    case "NEXT_MESSAGE":
      return {
        ...state,
        displayText: "",
        currentMessageIndex: (state.currentMessageIndex + 1) % action.payload,
        isDeleting: false,
        isRunning: false,
      }
    case "SET_RUNNING":
      return { ...state, isRunning: true }
    case "SET_COMPLETE":
      return { ...state, isRunning: false }
    default:
      return state
  }
}

const MatrixMessage: React.FC<MatrixMessageProps> = ({ onComplete }) => {
  const messages = [
    "DylanGPT has you...",
    "Follow the white rabbit...",
    "Start by hiring Dylan.",
    "Contact Dylan...",
    "What are you waiting for?",
  ]

  // Set the initial index using a function to avoid misuse of state
  const [state, dispatch] = useReducer(
    reducer,
    initialState(usageCount % messages.length)
  )

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentMessage = messages[state.currentMessageIndex]
    if(state.isRunning) return

    if (!state.isDeleting && state.displayText.length < currentMessage.length) {
      timeout = setTimeout(() => {
        dispatch({
          type: "UPDATE_TEXT",
          payload: currentMessage.slice(0, state.displayText.length + 1),
        })
      }, 50)
    } else if (
      !state.isDeleting &&
      state.displayText.length === currentMessage.length
    ) {
      timeout = setTimeout(() => {
        dispatch({ type: "TOGGLE_DELETING" })
      }, 200) // Pause duration
    } else if (state.isDeleting && state.displayText.length > 0) {
      timeout = setTimeout(() => {
        dispatch({
          type: "UPDATE_TEXT",
          payload: state.displayText.slice(0, -1),
        })
      }, 30)
    } else if (state.isDeleting && state.displayText.length === 0) {
      dispatch({ type: "SET_COMPLETE" })
      usageCount++
      //   dispatch({ type: "NEXT_MESSAGE", payload: messages.length })
    }

    return () => clearTimeout(timeout)
  }, [
    state.displayText,
    state.isDeleting,
    state.currentMessageIndex,
    messages,
    onComplete,
  ])

  return (
    <MatrixContainer>
      <MatrixText variant='h5'>
        {state.displayText}
        <span style={{ opacity: Math.random() > 0.5 ? 1 : 0 }}>_</span>
      </MatrixText>
    </MatrixContainer>
  )
}

export default MatrixMessage
