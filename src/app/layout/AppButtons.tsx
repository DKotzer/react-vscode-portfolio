import { Button, Box, Paper } from "@mui/material";
import React from "react";
import { VscMarkdown, VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";

interface Props {
  pages: {
    index: number;
    name: string;
    route: string;
  }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: string;
  setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
  visiblePageIndexs: number[];
  setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function AppButtons({
  pages,
  selectedIndex,
  setSelectedIndex,
  currentComponent,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  function renderButtonBgColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#1e1e1e" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#ffffff" : "#ececec";
    }
  }

  function renderButtonColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "white" : "#817d7a";
    } else {
      return selectedIndex === index ? "#524a5f" : "#716f74";
    }
  }

  function renderCloseButtonBgColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#1e1e1e" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#ffffff" : "#ececec";
    }
  }

  function renderCloseButtonColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#white" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#72736d" : "#ececec";
    }
  }

  function renderCloseButtonHoverBgColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#333c43" : "#333c43";
    } else {
      return selectedIndex === index ? "#e6e4e5" : "#dadada";
    }
  }

  function renderCloseButtonHoverColor(index: number) {
    if (theme.palette.mode === "dark") {
      return selectedIndex !== index ? "#817d7a" : "#white";
    } else {
      return selectedIndex === index ? "#44434b" : "#92938e";
    }
  }

  function renderPageButton(index: number, name: string, route: string) {
    return (
      <Box
        key={index}
        sx={{
          display: "inline-block",
          borderRight: 1,
          borderColor: theme.palette.mode === "dark" ? "#252525" : "#f3f3f3",
        }}
      >
        <Button
          key={index}
          disableRipple
          disableElevation
          disableFocusRipple
          onClick={() => {
            setSelectedIndex(index);
            setCurrentComponent("button");
            navigate(route);
          }}
          sx={{
            "borderRadius": 0,
            "px": 2,
            "textTransform": "none",
            "backgroundColor": renderButtonBgColor(index),
            "color": renderButtonColor(index),
            "&.MuiButtonBase-root:hover": {
              bgcolor: renderButtonBgColor(index),
            },
            "transition": "none",
            "pb": 0.2,
          }}
        >
          <Box
            sx={{ color: "#6997d5", width: 20, height: 20, mr: 0.4, ml: -1 }}
          >
            <VscMarkdown />
          </Box>
          {name}
          <Box
            component={Paper}
            sx={{
              "ml": 1,
              "mr": -1,
              "backgroundColor": renderCloseButtonBgColor(index),
              "color": renderCloseButtonColor(index),
              "&.MuiPaper-root:hover": {
                bgcolor: renderCloseButtonHoverBgColor(index),
                color: renderCloseButtonHoverColor(index),
              },
              "width": 20,
              "height": 20,
              "transition": "none",
            }}
            elevation={0}
            onClick={(e: any) => {
              e.stopPropagation();
              setVisiblePageIndexs(
                visiblePageIndexs.filter((x) => x !== index)
              );
            }}
          >
            <VscChromeClose />
          </Box>
        </Button>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        "display": "inline-block",
        "overflowX": "auto",
        "overflowY": "hidden",
        "whiteSpace": "nowrap",
        "backgroundColor":
          theme.palette.mode === "dark" ? "#252527" : "#f3f3f3",
        "&::-webkit-scrollbar": {
          height: "3px",
          // backgroundColor: 'red',
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#535353" : "#8c8c8c",
        },
        "&::-webkit-darkScrollbar-thumb": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#ffffff" : "#8c8c8c",
        },
        // '&::-webkit-scrollbar:hover, & *::-webkit-scrollbar:hover': {
        //   backgroundColor: '#ffffff',
        // },
        // '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
        //   {
        //     backgroundColor:
        //       theme.palette.mode === 'dark' ? '#ffffff' : '#8c8c8c',
        //   },
      }}
    >
      {pages.map(({ index, name, route }) =>
        renderPageButton(index, name, route)
      )}
      {/* <a href='/Dylan_Kotzer.pdf' target='_new'>
        <button
          className='MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-disableElevation MuiButtonBase-root  css-15cd31s-MuiButtonBase-root-MuiButton-root'
          type='button'
        >
          <div className='MuiBox-root css-1w6x020'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M6.345 5h2.1v6.533H6.993l.055-5.31-1.774 5.31H4.072l-1.805-5.31c.04.644.06 5.31.06 5.31H1V5h2.156s1.528 4.493 1.577 4.807L6.345 5zm6.71 3.617v-3.5H11.11v3.5H9.166l2.917 2.916L15 8.617h-1.945z'></path>
            </svg>
          </div>
          Resume.pdf
          <div className='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiBox-root css-j73nn2-MuiPaper-root'>
            <svg
              stroke='currentColor'
              fill='currentColor'
              stroke-width='0'
              viewBox='0 0 16 16'
              height='1em'
              width='1em'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z'
              ></path>
            </svg>
          </div>
        </button>
      </a> */}

      {/* <span>
        <a href='/Dylan_Kotzer.pdf' target='_new' className='resumeButton'>
          <li
            className='MuiTreeItem-root css-s74p80-MuiTreeItem-root'
            role='treeitem'
          >
            <div className='css-1rwxlx2-MuiTreeItem-content MuiTreeItem-content'>
              <div className='MuiTreeItem-iconContainer'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
                  viewBox='0 0 16 16'
                  color='#6997d5'
                  // style={`color: rgb(105, 151, 213)`};
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M6.345 5h2.1v6.533H6.993l.055-5.31-1.774 5.31H4.072l-1.805-5.31c.04.644.06 5.31.06 5.31H1V5h2.156s1.528 4.493 1.577 4.807L6.345 5zm6.71 3.617v-3.5H11.11v3.5H9.166l2.917 2.916L15 8.617h-1.945z'></path>
                </svg>
              </div>
              <div className='MuiTreeItem-label removeUnderline'>
                resume.pdf
              </div>
            </div>
          </li>
        </a>
      </span> */}
    </Container>
  );
}
