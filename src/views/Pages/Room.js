import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useParams, useLocation, useHistory } from "react-router-dom";
import SocketContext from "../../socket-context.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerDetails from "../../components/PlayerDetails";
import { Typography, Button, Grid, Paper, Modal } from "@material-ui/core";
import UserExpand from "../../components/UserExpand";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../../components/PdfGeneration";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ButtonAppBar from "../../components/nav.js";

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: `Arial, Helvetica, sans-serif`,
    flexGrow: 1,
    overflow: "hidden",
    minHeight: window.innerHeight,
  },
  modal: {
    position: "absolute",
    top: "20vh",
    left: "15vw",
    width: 200,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    padding: theme.spacing(2, 4, 3),
  },
  player: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundImage: `url('https://image.shutterstock.com/image-photo/stadium-lights-flashes-3d-260nw-600464927.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  image: {
    display: "inline-block",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

function RoomPage(props) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let { slug } = useParams();
  const [currentPlayer, changePlayer] = useState({});
  const [yourBid, changeBid] = useState(0);
  const [users, setUsers] = useState(null);
  const [disable, setDisable] = useState(false);
  const [playerList, setPlayerList] = useState({});
  const [allPlayers, setPlayers] = useState([]);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  /**
   *
   * @param {*} obj
   * @param {*} filter
   * @param {*} filterValue
   */
  const filterPlayers = (obj, filter, filterValue) =>
    Object.keys(obj).reduce(
      (acc, val) =>
        JSON.parse(obj[val])[filter] === filterValue
          ? {
              ...acc,
              [val]: JSON.parse(obj[val]),
            }
          : acc,
      {}
    );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handle Close Button
   */

  const closeRoom = (
    <div className={classes.modal}>
      <h2 id="simple-modal-title">Do you want to leave?</h2>
      <p id="simple-modal-description">
        Please make sure you have 11 players :/!
      </p>
      <Button
        onClick={() => {
          let list = filterPlayers(playerList, "highestBidder", email);
          if (Object.keys(list).length >= 11) {
            history.replace("/team", {
              roomId: slug,
              list: list,
            });
          } else {
            history.replace("/home");
          }
          props.socket.emit("leave", { roomId: slug });
        }}
      >
        Ok
      </Button>
      <Button onClick={handleClose}>Close</Button>
    </div>
  );

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (location.state === undefined) {
      history.push("/", { previousLocation: location.pathname });
    } else if (location.state.previousLocation === "/") {
      console.log(location.state.previousLocation);
      props.socket.emit("Link Join", { roomId: slug, token: token });
    }

    props.socket.on("failure", (data) => {
      alert(data);
      history.replace("/");
    });

    props.socket.on("success", (data) => {
      toast.success("Success");
    });

    setEmail(JSON.parse(token).user.email);

    return () => {
      props.socket.off("failure");
      props.socket.off("success");
    };
  }, [history, location, props.socket, slug]);

  /**
       newPlayer: Current Player in the bidding process

       new Bid: Change in bid is reflected as soon as possible

    */

  useEffect(() => {
    props.socket.emit("send", slug);
  }, [props.socket, slug]);

  useEffect(() => {
    props.socket.on("newPlayer", (data) => {
      changePlayer(data);
      changeBid((yourBid) => 0);
      setDisable(false);
    });

    props.socket.on("newBid", (data) => {
      changePlayer(data);
    });

    props.socket.on("sold", (data) => {
      toast.success(
        `${data.player} sold to ${JSON.parse(users[data.bidder])["name"]}`,
        {
          autoClose: 2000,
        }
      );

      let userData = { ...users };
      userData[data.bidder] = JSON.stringify({
        name: JSON.parse(users[data.bidder])["name"],
        wallet: JSON.parse(users[data.bidder])["wallet"] - data.bid,
      });
      setUsers(userData);
    });

    return () => {
      props.socket.off("newPlayer");
      props.socket.off("newBid");
      props.socket.off("sold");
    };
  }, [currentPlayer, yourBid, props.socket, users, disable]);

  /**
        Code submits the bid once you have improved your offer
    */

  useEffect(() => {
    if (yourBid !== 0 && yourBid) {
      let jwtToken = JSON.parse(localStorage.getItem("jwt"));
      props.socket.emit("Bid", {
        roomId: slug,
        bid: yourBid,
        email: jwtToken.user.email,
      });
    }
  }, [yourBid, props.socket, slug]);

  function makeBid() {
    if (currentPlayer.currentBid === 0) {
      changeBid((yourBid) => currentPlayer.base);
    } else {
      changeBid((yourBid) => currentPlayer.currentBid + 50);
    }
  }

  /**
        Waits for the server to emit the people
    */

  useEffect(() => {
    props.socket.on("people", (data) => {
      let users = data;
      setUsers(users);
    });

    props.socket.on("playerList", (data) => {
      setPlayerList(data);
      setShow(true);
    });

    props.socket.on("availablePlayers", (data) => {
      setPlayers(data);
    });

    return () => {
      props.socket.off("data");
      props.socket.off("playerList");
      props.socket.off("availablePlayers");
    };
  });

  /**
        Begin seconds
    */

  useEffect(() => {
    props.socket.on("Begin timeout", (data) => {
      toast.warn("10s more ...Please Decide sooner", {
        autoClose: 9000,
      });
    });

    return () => {
      props.socket.off("Begin timeout");
    };
  });

  return (
    <React.Fragment>
      <ResponsiveDrawer
        allPlayers={allPlayers}
        playerList={playerList}
        roomId={slug}
      />

      <Paper elevation={2}>
        <div className={classes.root}>
          <Grid container spacing={1} style={{ padding: "1em" }}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={12} md={6}>
                  <Paper className={classes.player}>
                    <img
                      src={currentPlayer.imgsrc}
                      alt="PlayerImage"
                      className={classes.image}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={6} md={3}>
                  <div className={classes.paper}>
                    <Typography variant="body1" component="p">
                      <b>{currentPlayer.player}</b>
                    </Typography>
                    <PlayerDetails player={currentPlayer} users={users} />
                    <HtmlTooltip
                      disableFocusListener
                      interactive
                      title={
                        <React.Fragment>
                          <Typography color="inherit">
                            Leave the room
                          </Typography>
                          <em>{"Please"}</em> <b>{"Download"}</b>{" "}
                          <u>{"the PDF"}</u>.{" "}
                          {"It is a way to keep track of the match"}
                        </React.Fragment>
                      }
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleOpen}
                      >
                        Leave Room
                      </Button>
                    </HtmlTooltip>
                  </div>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography>
                    Dark Mode:
                    <Switch onChange={props.otd} />
                  </Typography>
                  <div className={classes.paper} style={{ marginTop: "3em" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={disable}
                      endIcon={<TrendingUpIcon />}
                      onClick={() => {
                        makeBid();
                      }}
                    >
                      Bid
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      endIcon={<TrendingDownIcon />}
                      style={{ margin: 10 }}
                      onClick={() => {
                        setDisable(true);
                      }}
                    >
                      Pass
                    </Button>
                    <UserExpand users={users} playerList={playerList} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container justify="center">
                {show && (
                  <PDFDownloadLink
                    document={
                      <PdfDocument users={users} playerList={playerList} />
                    }
                    fileName="game.pdf"
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "white",
                      backgroundColor: "#D11111",
                      borderRadius: 5,
                    }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Download Pdf"
                    }
                  </PDFDownloadLink>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {closeRoom}
      </Modal>
    </React.Fragment>
  );
}

const Room = (props) => (
  <SocketContext.Consumer>
    {(socket) => (
      <React.Fragment>
        <ButtonAppBar {...props} />
        <RoomPage {...props} socket={socket} />
      </React.Fragment>
    )}
  </SocketContext.Consumer>
);

export default Room;
