import { createTheme, darkScrollbar, ThemeProvider } from "@mui/material"

interface ResumeProps {
  darkMode?: boolean
  handleThemeChange?: () => void
}
    
const Resume: React.FC<ResumeProps> = ({
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
  return (
        <object
          data='/dylan_kotzer.pdf'
          type='application/pdf'
          width='100%'
          height='100%'
          aria-labelledby='PDF document'
          title='Embedded PDF Viewer'
        >
          <p>
            Your browser does not support PDFs.
            <a href='/dylan_kotzer.pdf'>Download the PDF</a>
          </p>
        </object>
  )
}

export default Resume
