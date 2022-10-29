import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import Logo from '../../../src/images/logo192.png';
import { Fragment } from 'react';


/*
      Our main navigation bar, strongly inspired by MUI documentation
*/
const NavBar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <Box sx={{ flexGrow: 1,
            zIndex: '1' }} height="10vh">
            <AppBar position="static" sx={{
                  backgroundColor: "#FFF",
                  color: "#FF66C4",
                  justifyContent: 'center',
                  height: '100%'
            }}>
                  <Toolbar height="100%" sx={{position: 'relative', overflow: 'hidden', justifyContent: 'center'}}>
                        <Fragment>
                              <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    sx={{ mr: 2, position: 'absolute', left: '30px' }}
                                    onClick={handleMenu}
                              >
                                    <MenuIcon sx={{fontSize: '1.4em'}} />
                              </IconButton>
                              <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                          vertical: 'top',
                                          horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                          vertical: 'top',
                                          horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                              >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                              </Menu>
                        </Fragment>
                        <IconButton sx={{
                              justifyContent:'center'
                        }}>
                              <Avatar alt="logo" src={Logo} />
                        </IconButton>
                  </Toolbar>
            </AppBar>
      </Box>
  );
}

export default NavBar;