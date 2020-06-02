import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  list: {
    boxShadow: "1px 5px 5px #888888",
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function renderPlayerList() {
    if (props.allPlayers && props.playerList) {
      return props.allPlayers.map((item) => {
        if (
          props.playerList[item.player] &&
          JSON.parse(props.playerList[item.player])["status"] === 1
        ) {
          return (
            <ListItem>
              <ListItemText
                primary={item.player}
                secondary={
                  <div
                    style={{
                      border: "3px solid green",
                      color: "green",
                      display: "inline",
                    }}
                  >
                    Sold
                  </div>
                }
              />
            </ListItem>
          );
        } else if (
          props.playerList[item.player] &&
          JSON.parse(props.playerList[item.player])["status"] === 0
        ) {
          return (
            <ListItem>
              <ListItemText
                primary={item.player}
                secondary={
                  <div
                    style={{
                      border: "3px solid red",
                      color: "red",
                      display: "inline",
                    }}
                  >
                    UnSold
                  </div>
                }
              />
            </ListItem>
          );
        } else {
          return (
            <ListItem>
              <ListItemText
                primary={item.player}
                secondary={
                  <div
                    style={{
                      border: "3px solid blue",
                      color: "blue",
                      display: "inline",
                    }}
                  >
                    In Queue
                  </div>
                }
              />
            </ListItem>
          );
        }
      });
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{textAlign:'center'}}>
        <Typography style={{backgroundColor:'red',color:"white", letterSpacing:'2px', fontSize:24}} variant="body1" component="p">
            ROOM ID:{props.roomId}
        </Typography>
      </div>
      <List>{renderPlayerList()}</List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon fontSize="large" style={{ color: "white" }} />
        </IconButton>
      </Toolbar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
