import { styled, keyframes } from "@mui/material/styles"
import { Box, Paper, TextField } from "@mui/material"
import { MessageProps, MessageContentProps } from "../types/chat"

const flash = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`

// [Previous styled components remain the same, just adding the pulse keyframe above]
export const ChatContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#1e1e1e",
  color: theme.palette.mode === "light" ? "#24292f" : "#d4d4d4",
  padding: 0,
  height: "calc(100vh - 100px)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#323232"}`,
  position: "relative",
}))

export const MessageArea = styled(Box)(({ theme }) => ({
  "flexGrow": 1,
  "overflowY": "auto",
  "padding": "20px",
  "&::-webkit-scrollbar": {
    width: "14px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "light" ? "#ccc" : "#424242",
    border: `3px solid ${
      theme.palette.mode === "light" ? "#f5f5f5" : "#1e1e1e"
    }`,
    borderRadius: "7px",
  },
}))

export const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: theme.palette.mode === "light" ? "#e8eaed" : "#2d2d2d",
  padding: "16px",
  borderTop: `1px solid ${
    theme.palette.mode === "light" ? "#e1e4e8" : "#323232"
  }`,
}))

export const StatusBar = styled(Box)<{ istyping?: string }>(
  ({ theme, istyping }) => ({
    backgroundColor: "#2ea043",
    color: "white",
    padding: "4px 16px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderTop: `1px solid ${
      theme.palette.mode === "light" ? "#e1e4e8" : "#323232"
    }`,
    animation:
      istyping === "true" ? `${flash} 1.5s ease-in-out infinite` : "none",
  })
)

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: theme.palette.mode === "light" ? "#24292f" : "#d4d4d4",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#1e1e1e",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#e1e4e8" : "#424242",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.mode === "light" ? "#2ea043" : "#626262",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2ea043",
  },
}))

export const Message = styled(Box)<MessageProps>(({ theme, $isuser }) => ({
  "display": "flex",
  "flexDirection": "column",
  "alignItems": $isuser ? "flex-end" : "flex-start",
  "marginBottom": "28px",
  "gap": "12px",
  "maxWidth": "100%",
  "animation": `${fadeIn} 0.5s ease-out`,
  "@media (max-width: 600px)": {
    maxWidth: "100%",
  },
}))

export const MessageContent = styled(Paper)<MessageContentProps>(
  ({ theme, $isuser, error }) => ({
    "padding": "16px",
    "width": "100%",
    "maxWidth": "95%",
    "backgroundColor": error
      ? "#320000"
      : $isuser
      ? theme.palette.mode === "light"
        ? "#e8eaed"
        : "#2d2d2d"
      : theme.palette.mode === "light"
      ? "#ffffff"
      : "#1e1e1e",
    "border": `1px solid ${
      error ? "#ff0000" : theme.palette.mode === "light" ? "#e1e4e8" : "#323232"
    }`,
    "borderRadius": "6px",
    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "4px",
      marginTop: "12px",
      marginBottom: "12px",
    },
    "& a": {
      "color": "#2ea043",
      "textDecoration": "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    "& pre": {
      margin: "12px 0",
      padding: 0,
      backgroundColor: "transparent",
    },
    "& code": {
      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
      fontSize: "14px",
      backgroundColor: theme.palette.mode === "light" ? "#f6f8fa" : "#2d2d2d",
      padding: "2px 6px",
      borderRadius: "3px",
    },
    "@media (max-width: 600px)": {
      maxWidth: "95%",
    },
  })
)

export const Avatar = styled(Box)<{ istyping?: string }>(
  ({ theme, istyping }) => ({
    "width": "72px",
    "height": "72px",
    "marginBottom": "-4px",
    "borderRadius": "6px",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": theme.palette.mode === "light" ? "#e8eaed" : "#2d2d2d",
    "border": `1px solid ${
      theme.palette.mode === "light" ? "#e1e4e8" : "#424242"
    }`,
    "transition": "transform 0.2s ease, border-color 0.2s ease",
    "animation":
      istyping === "true" ? `${pulse} 2s ease-in-out infinite` : "none",
    "&:hover": {
      transform: "scale(1.05)",
      borderColor: "#2ea043",
    },
  })
)

export const QuickAction = styled(Box)(({ theme }) => ({
  "padding": "10px 16px",
  "backgroundColor": theme.palette.mode === "light" ? "#e8eaed" : "#2d2d2d",
  "border": `1px solid ${
    theme.palette.mode === "light" ? "#e1e4e8" : "#424242"
  }`,
  "borderRadius": "6px",
  "cursor": "pointer",
  "marginRight": "10px",
  "marginBottom": "10px",
  "display": "inline-block",
  "transition": "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#d0d7de" : "#3d3d3d",
    borderColor: "#2ea043",
    transform: "translateY(-2px)",
  },
}))

export const ShortcutKey = styled(Box)(({ theme }) => ({
  "backgroundColor": theme.palette.mode === "light" ? "#f6f8fa" : "#1e1e1e",
  "padding": "4px 8px",
  "borderRadius": "4px",
  "border": `1px solid ${
    theme.palette.mode === "light" ? "#e1e4e8" : "#424242"
  }`,
  "fontSize": "12px",
  "fontFamily": "Consolas, Monaco, monospace",
  "cursor": "pointer",
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#e1e4e8" : "#2d2d2d",
    borderColor: "#2ea043",
  },
}))
