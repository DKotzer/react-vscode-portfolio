import React from "react"
import { Box, Typography, Theme } from "@mui/material"
import { styled } from "@mui/material/styles"

const ShortcutContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  "position": "absolute",
  "bottom": "42px",
  "left": "-12px",
  "backgroundColor": theme.palette.mode === "light" ? "#f5f5f5" : "#2d2d2d",
  "padding": "12px",
  "borderRadius": "6px",
  "border": `1px solid ${
    theme.palette.mode === "light" ? "#e1e4e8" : "#424242"
  }`,
  "zIndex": 10,
  "display": "none",
  "minWidth": "220px",
  "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.15)",
  ".info-trigger:hover &": {
    display: "block",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: "-20px",
    left: 0,
    right: 0,
    height: "20px",
    background: "transparent",
  },
  "@media (max-width: 600px)": {
    left: "-8px",
    minWidth: "200px",
  },
}))

const ShortcutRow = styled(Box)({
  "display": "flex",
  "alignItems": "center",
  "gap": "12px",
  "marginBottom": "8px",
  "padding": "6px",
  "borderRadius": "4px",
  "transition": "all 0.2s ease",
  "cursor": "pointer",
  "&:last-child": {
    marginBottom: 0,
  },
  "&:hover": {
    backgroundColor: "rgba(46, 160, 67, 0.1)",
    transform: "translateX(2px)",
  },
})

const ShortcutKey = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#f6f8fa" : "#1e1e1e",
  padding: "4px 8px",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#424242"}`,
  fontSize: "12px",
  fontFamily: "Consolas, Monaco, monospace",
  minWidth: "100px",
  textAlign: "center",
  userSelect: "none",
}))

const Description = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.mode === "light" ? "#24292f" : "#d4d4d4",
  fontSize: "12px",
  userSelect: "none",
  whiteSpace: "nowrap",
  flex: 1,
}))

interface KeyboardShortcutsInfoProps {
  onClear: () => void
  onToggleTheme: () => void
  onMatrixEffect: () => void
  onFocusInput: () => void
}

const KeyboardShortcutsInfo: React.FC<KeyboardShortcutsInfoProps> = ({
  onClear,
  onToggleTheme,
  onMatrixEffect,
  onFocusInput,
}) => {
  return (
    <ShortcutContainer>
      <ShortcutRow onClick={onClear}>
        <ShortcutKey>Ctrl/⌘ + L</ShortcutKey>
        <Description>Clear chat</Description>
      </ShortcutRow>
      <ShortcutRow onClick={onFocusInput}>
        <ShortcutKey>Ctrl/⌘ + /</ShortcutKey>
        <Description>Focus input</Description>
      </ShortcutRow>
      {/* <ShortcutRow onClick={onToggleTheme}>
        <ShortcutKey>Ctrl/⌘ + B</ShortcutKey>
        <Description>Toggle theme</Description>
      </ShortcutRow> */}
      {/* <ShortcutRow onClick={onMatrixEffect}>
        <ShortcutKey>Ctrl/⌘ + M</ShortcutKey>
        <Description>Matrix effect</Description>
      </ShortcutRow> */}
      <ShortcutRow onClick={onMatrixEffect}>
        <ShortcutKey>Ctrl/⌘ + H</ShortcutKey>
        <Description>Hire Dylan!</Description>
      </ShortcutRow>
    </ShortcutContainer>
  )
}

export default KeyboardShortcutsInfo
