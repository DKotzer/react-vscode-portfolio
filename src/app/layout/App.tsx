import {
  Container,
  createTheme,
  CssBaseline,
  darkScrollbar,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import AppTree from "./AppTree"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import AppButtons from "./AppButtons"
import MDContainer from "../components/MDContainer"
import Home from "../pages/Home"
import { pages } from "../pages/pages"
import usePageTracking from "../hooks/usePageTracking"
import { isBrowser } from "react-device-detect"
import { BsFillChatDotsFill } from "react-icons/bs"
import About from "../components/About"
import Resume from "../components/Resume"
import Calendly from "../components/Calendly"
interface Page {
  index: number
  name: string
  route: string
  type: string
}

console.log(
  `%c
8888888b.           888                       888    d8P           888                              
888  "Y88b          888                       888   d8P            888                              
888    888          888                       888  d8P             888                              
888    888 888  888 888  8888b.  88888b.      888d88K      .d88b.  888888 88888888  .d88b.  888d888 
888    888 888  888 888     "88b 888 "88b     8888888b    d88""88b 888       d88P  d8P  Y8b 888P"   
888    888 888  888 888 .d888888 888  888     888  Y88b   888  888 888      d88P   88888888 888     
888  .d88P Y88b 888 888 888  888 888  888     888   Y88b  Y88..88P Y88b.   d88P    Y8b.     888     
8888888P"   "Y88888 888 "Y888888 888  888     888    Y88b  "Y88P"   "Y888 88888888  "Y8888  888     
                888                                                                                 
           Y8b d88P                                                                                 
            "Y88P"                                                                                  
`,
  "color:green"
)

function initVisiblePageIndexes(pages: Page[]) {
  const tabs = []
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    tabs.push(page.index)
  }
  return tabs
}

export default function App() {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(isBrowser)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [currentComponent, setCurrentComponent] = useState("")
  const [visiblePageIndexes, setVisiblePageIndexes] = useState(
    initVisiblePageIndexes(pages)
  )
  const [darkMode, setDarkMode] = useState(false)
  const [visiblePages, setVisiblePages] = useState(pages)
  const paletteType = darkMode ? "dark" : "light"
  usePageTracking()
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

  function handleThemeChange() {
    setDarkMode(!darkMode)
    localStorage.setItem("theme", darkMode ? "light" : "dark")
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
    if (!currentTheme) setDarkMode(true)
    else setDarkMode(currentTheme === "dark")
  }, [])

  const deletedIndex = visiblePages.find(
    (x) => !visiblePageIndexes.includes(x.index)
  )?.index

  useEffect(() => {
    const newPages = []

    for (const index of visiblePageIndexes) {
      const page = pages.find((x) => x.index === index)
      if (page) newPages.push(page)
    }
    setVisiblePages(newPages)

    if (visiblePageIndexes.length === 0) {
      setSelectedIndex(-1)
      navigate("/")
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex > Math.max(...visiblePageIndexes)
    ) {
      setSelectedIndex(Math.max(...visiblePageIndexes))
      const page = pages.find(
        (x) => x.index === Math.max(...visiblePageIndexes)
      )
      if (page) navigate(page.route)
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex < Math.max(...visiblePageIndexes)
    ) {
      setSelectedIndex(Math.min(...visiblePageIndexes))
      const page = pages.find(
        (x) => x.index === Math.min(...visiblePageIndexes)
      )
      if (page) navigate(page.route)
    } else {
    }
  }, [visiblePageIndexes, navigate, deletedIndex, selectedIndex])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container
        sx={{ m: 0, p: 0, overflowY: "hidden" }}
        maxWidth={false}
        disableGutters
      >
        <Grid container sx={{ overflow: "auto", overflowY: "hidden" }}>
          <Grid container sx={{ overflow: "auto" }}>
            <Grid item sx={{ width: 50 }}>
              <Sidebar
                setExpanded={setExpanded}
                expanded={expanded}
                darkMode={darkMode}
                handleThemeChange={handleThemeChange}
              />
            </Grid>
            {expanded && (
              <Grid
                item
                sx={{
                  backgroundColor: darkMode ? "#252527" : "#f3f3f3",
                  width: 220,
                }}
              >
                <Stack sx={{ mt: 1 }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ ml: 4 }}
                  >
                    EXPLORER
                  </Typography>
                  {/* TODO: Modify app tree to have an src/app folder and more pages*/}
                  <AppTree
                    pages={pages}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    currentComponent={currentComponent}
                    setCurrentComponent={setCurrentComponent}
                    visiblePageIndexes={visiblePageIndexes}
                    setVisiblePageIndexes={setVisiblePageIndexes}
                  ></AppTree>
                </Stack>
              </Grid>
            )}

            <Grid item xs zeroMinWidth>
              <Grid
                sx={{
                  height: "33px",
                }}
              >
                <AppButtons
                  // pages={pages}
                  pages={visiblePages}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  currentComponent={currentComponent}
                  setCurrentComponent={setCurrentComponent}
                  visiblePageIndexes={visiblePageIndexes}
                  setVisiblePageIndexes={setVisiblePageIndexes}
                />
              </Grid>

              <Grid
                sx={{
                  scrollBehavior: "smooth",
                  // overflow: 'scroll',
                  overflowY: "auto",
                  height: `calc(100vh - 20px - 33px)`,
                }}
              >
                <Routes>
                  <Route
                    path='/'
                    element={<Home setSelectedIndex={setSelectedIndex} />}
                  />
                  {pages.map(({ index, name, route, type }) => (
                    <Route
                      key={index}
                      path={route}
                      element={
                        type === "md" ? (
                          <MDContainer
                            path={`./pages/${name.substring(
                              0,
                              name.lastIndexOf(".")
                            )}.md`}
                          />
                        ) : type === "resume" ? (
                          <Resume />
                        ) : type === "calendly" ? (
                          <Calendly />
                        ) : null
                      }
                    />
                  ))}
              

                  {/* <Route
                    path='/'
                    element={<Home setSelectedIndex={setSelectedIndex} />}
                  /> */}
                  <Route path='*' element={<Navigate to='/' replace />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {/* <div style={{ position: "fixed", bottom: 20, right: 15 }}>
              <div
                className='chatButton'
                style={{
                  padding: "12px",
                  backgroundColor: "#3f51b5",
                  color: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                  marginRight: "30px",
                  marginBottom: "12px",
                }}
              >
                <a
                  href='https://gpt.dylankotzer.com'
                  target='_blank'
                  rel='noreferrer'
                  className='chatButton'
                >
                  <BsFillChatDotsFill size={25} />
                </a>
              </div>
              <div className='chatInfo'>Chat with Dylan GPT</div>
            </div> */}
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Footer />
          </Grid>

          {/* Add chatbot box here */}
        </Grid>
      </Container>
      {/* </Router> */}
    </ThemeProvider>
  )
}
