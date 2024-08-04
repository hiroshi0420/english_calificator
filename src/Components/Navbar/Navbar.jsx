import React, { useState } from 'react';
import ImgLogo from '../../../public/logo-Company.png';
import { Box, IconButton, MenuItem, Menu, Badge, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Custom Components
import { CustomToolbar, Search, SearchIconWrapper, StyledInputBase, ContainerNavbar, ImgCompany, ContainerImg } from './Style';
import { useNavigate } from 'react-router-dom';


function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      sx={{ color: '#ffffff'}}
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [value, setValue] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));


  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem('profile');
    localStorage.removeItem('test');
    localStorage.removeItem('token');
    // Lógica de cierre de sesión aquí
    navigate('/login');
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ top: '22px' }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: isLgDown ? '0.875rem' : '0.80rem' }}>Profile</MenuItem>
      <MenuItem onClick={handleLogout} sx={{ fontSize: isLgDown ? '0.875rem' : '0.80rem' }}>Logout</MenuItem>
    </Menu>
  );


  return (
    <ContainerNavbar>
        <CustomToolbar>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ color: '#fff' }}/>
            </IconButton>

            <ContainerImg>
              <ImgCompany src={ImgLogo} />
            </ContainerImg>
          </div>


          <Tabs
            sx={{ flexGrow: 1, marginLeft: '11rem', height: '100%' }}
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            role="navigation"
          >
            <LinkTab label="Home" href="/drafts" />
            <LinkTab label="My results" href="/trash" />
          </Tabs>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ color: '#fff' }}/>
            </IconButton>
          </Box>

        </CustomToolbar>
      {renderMenu}
    </ContainerNavbar>
  );
};

export default Navbar;
