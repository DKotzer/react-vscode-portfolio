import {
  createTheme,
  darkScrollbar,
  ThemeProvider,
} from "@mui/material"
import React, { useEffect } from "react"

interface CalendlyProps {
  url?: string
  darkMode?: boolean
  handleThemeChange?: () => void
}

const Calendly: React.FC<CalendlyProps> = ({
  url = "https://calendly.com/dylankotzer/30min",
  darkMode,
  handleThemeChange,
}) => {
    const paletteType = darkMode ? "dark" : "light"
  const theme = createTheme({
    
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#FFFFFF" : "#1e1e1e",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: paletteType === "dark" ? darkScrollbar() : null,
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
        },
      },
    },
  })
  useEffect(() => {
    const head = document.querySelector("head")
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    head?.appendChild(script)

    return () => {
      head?.removeChild(script)
    }
  }, [])
         
 const  backgroundColor =  darkMode ? "#252527" : "#ffffff" 
 return (
    <ThemeProvider theme={theme}>
      <div
        style={{ minWidth: "320px", height: "100%", backgroundColor: backgroundColor }}
      >
        <div className='calendly-inline-widget' style={{ backgroundColor: backgroundColor, height: "100%" }} data-url={url} />
      </div>
    </ThemeProvider>
  )
}

export default Calendly