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

// External variable to track how many times the component has been used
let usageCount = 0

const initialState = (startIndex: number) => ({
  displayText: "",
  currentMessageIndex: startIndex,
  isDeleting: false,
})

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return { ...state, displayText: action.payload }
    case "TOGGLE_DELETING":
      return { ...state, isDeleting: !state.isDeleting }
    case "NEXT_MESSAGE":
      return {
        displayText: "",
        currentMessageIndex: (state.currentMessageIndex + 1) % action.payload,
        isDeleting: false,
      }
    default:
      return state
  }
}

const MatrixMessage: React.FC<MatrixMessageProps> = ({ onComplete }) => {
  const messages = [
    "Follow the white rabbit...",
    "Start by hiring Dylan.",
    "Your next step.",
  ]
  const [state, dispatch] = useReducer(
    reducer,
    initialState(usageCount % messages.length)
  )

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentMessage = messages[state.currentMessageIndex]

    // console.log("Current Message Index:", state.currentMessageIndex);
    // console.log("Display Text:", state.displayText);
    // console.log("Is Deleting:", state.isDeleting);

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
      //   console.log("Message fully typed. Ready to delete after pause.");
      timeout = setTimeout(() => {
        dispatch({ type: "TOGGLE_DELETING" })
        // console.log("Switching to deleting mode");
      }, 300) // Change this to the desired pause duration
    } else if (state.isDeleting && state.displayText.length > 0) {
      timeout = setTimeout(() => {
        dispatch({
          type: "UPDATE_TEXT",
          payload: state.displayText.slice(0, -1),
        })
      }, 30)
    } else if (state.isDeleting && state.displayText.length === 0) {
      //   console.log("Message fully deleted");
      dispatch({ type: "NEXT_MESSAGE", payload: messages.length })
      //   console.log("Switching to next message");
    }

    return () => clearTimeout(timeout)
  }, [
    state.displayText,
    state.isDeleting,
    state.currentMessageIndex,
    messages,
    onComplete,
  ])

  // Increment the usage count each time the component is mounted
  useEffect(() => {
    usageCount++
  }, [])

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
