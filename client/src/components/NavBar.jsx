// src/components/NavBar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/system';

const NavLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  marginRight: theme.spacing(2),
}));

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Real Estate Map
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <NavLink to="/">
              <Button color="inherit">Home</Button>
            </NavLink>
            <NavLink to="/search">
              <Button color="inherit">Search</Button>
            </NavLink>
            <Button color="inherit">Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/search" onClick={handleDrawerToggle}>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button component={Link} to="/create" onClick={handleDrawerToggle}>
            <ListItemText primary="Create New" />
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
