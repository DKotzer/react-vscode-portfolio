import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";

interface Props {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Home({ setSelectedIndex }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedIndex(-1);
  }, [setSelectedIndex]);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME!;
  }, [pathname]);

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      sx={{ minHeight: `calc(100vh - 20px - 33px)` }}
    >
      <About />
    </Grid>
  );
}
