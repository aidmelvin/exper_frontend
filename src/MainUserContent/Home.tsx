
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import { useNavigate } from "react-router-dom";

import {
    BASE_URL,
    FETCH_HOME_DATA
} from "../constants/URLs";

import { logout } from '../logic/auth';
import Explore from '../InnerComponents/Explore';
import Search from '../InnerComponents/Search';
import Messages from '../InnerComponents/Messages';
import People from '../InnerComponents/People';
import ManageAccount from '../InnerComponents/ManageAccount';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [innerComponentName, setInnerComponentName] = useState<string>("Explore");

  useEffect(() => {
    fetch(`${BASE_URL}${FETCH_HOME_DATA}`, {
      credentials: "include", // causes it to send cookies
      mode: "cors"
    })
    .then((res) => res.json())
    .then((data) => {
      setName(data['name']);
    });
  });

  useEffect(() => {
    const isOpen = localStorage.getItem("leftMenuExpand");
    if (isOpen != null) {
      if (isOpen === "true") {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } else {
      localStorage.setItem("leftMenuExpand", JSON.stringify(false));
    }
  }, []);
  
  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("leftMenuExpand", JSON.stringify(true));
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("leftMenuExpand", JSON.stringify(false));
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logUserOut = async () => {
    await logout();
    navigate('/login');
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderInnerComponent = (name: string) => {
    switch(name) {
      case "Explore": {
        return <Explore />
      }
      case "Search": {
        return <Search />
      }
      case "Messages": {
        return <Messages />
      }
      case "People": {
        return <People />
      }
      case "Account": {
        return <ManageAccount />
      }
    }
  }

  const setLeftMenuIcon = (index: number) => {
    switch (index) {
      case 0: {
        return <ExploreIcon />
      }
      case 1: {
        return <SearchIcon />
      }
      case 2: {
        return <ForumIcon />
      }
      case 3: {
        return <EmojiPeopleIcon />
      }
    }
  }

  // TODO: fix account circle button and make it go to the right
  // components used that I should look at: 
    // https://mui.com/material-ui/react-menu/ (for the left expanding/contracting menu)
    // https://mui.com/material-ui/react-app-bar/ (for the account icon itself)
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {name} - {innerComponentName}
          </Typography>

          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={async () => {
                  await setInnerComponentName("Account");
                  handleClose();
                }}>{name} (me)</MenuItem>
                <MenuItem onClick={async () => {
                  await setInnerComponentName("Account");
                  handleClose();
                }}>Manage Account</MenuItem>
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                <MenuItem onClick={async () => await logUserOut()}>Logout</MenuItem>
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Explore', 'Search', 'Messages', 'People'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setInnerComponentName(text)}>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  { setLeftMenuIcon(index) }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Account'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => setInnerComponentName(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AccountBoxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderInnerComponent(innerComponentName)}
      </Main>
    </Box>
  );
}