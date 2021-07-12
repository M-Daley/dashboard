import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Link,
  Drawer,
  Divider,
  List,
  Grid,
  Container,
  Paper,
  Box,
  MenuItem,
  Menu
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';
import { mainListItems, secondaryListItems, generateNotificationMessages } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright ©
    {' '}
    <Link color="inherit" href="https://mdaley.dev/">
      Your Website
    </Link>{' '}
    { new Date().getFullYear() }
    .
  </Typography>
);

// Notification Popup Modal
const itemHeight = 48;

function App() {
  const classes = useStyles();
  const [open, setOpen]         = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotification        = Boolean(anchorEl);
  const [messages, setMessages] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    async function fetchData() {
      let messages = await generateNotificationMessages(5);
      setMessages(messages);
    }
    fetchData()
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton 
            color="inherit"
            onClick={handleClick}  
          >
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={openNotification}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: itemHeight * 4.5,
                width: '50ch',
              },
            }}
          >
            {messages && messages.map((option, idx) => (
              <MenuItem key={idx} onClick={handleClose}>
                { option }
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
          {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>

          {/* Desposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
          </Grid>
            
          {/* Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}

export default App;