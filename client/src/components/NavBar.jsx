// src/components/NavBar.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const NavLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  marginRight: theme.spacing(2),
}));

const NavBar = () => {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <NavLink to="/">Land Vista</NavLink>
          </Typography>
          <Box sx={{ display: { sm: "flex" } }}>
            <NavLink to="/">
              <Button color="inherit">Map View</Button>
            </NavLink>
            <NavLink to="/about">
              <Button color="inherit">About</Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
