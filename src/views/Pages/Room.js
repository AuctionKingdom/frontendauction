import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useLocation, useHistory } from "react-router-dom";
import SocketContext from "../../socket-context.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerDetails from "../../components/PlayerDetails";
import { Typography, Button, Grid, Paper } from "@material-ui/core";
import UserExpand from "../../components/UserExpand";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../../components/PdfGeneration";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ButtonAppBar from "../../components/nav.js";

toast.configure();

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: `Arial, Helvetica, sans-serif`,
    flexGrow: 1,
    overflow: "hidden",
    minHeight:window.innerHeight,
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

function RoomPage(props) {
  console.log(props);
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
      toast("Success");
    });

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
      toast(`${data.player} sold to ${JSON.parse(users[data.bidder])["name"]}`);

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
      toast("10s more ...Please Decide sooner");
    });

    return () => {
      props.socket.off("Begin timeout");
    };
  });

  return (
    <React.Fragment>
      <ResponsiveDrawer allPlayers={allPlayers} playerList={playerList} roomId={slug} />

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
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        history.replace("/home", { roomId: slug });
                      }}
                    >
                      Leave Page
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={6} md={3}>
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
                      color: "#4a4a4a",
                      backgroundColor: "#f2f2f2",
                      border: "1px solid #4a4a4a",
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
