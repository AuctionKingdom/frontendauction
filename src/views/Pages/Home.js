import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import SocketContext from "../../socket-context.js";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { jwtauth } from "../../Auth/userauth";
import ButtonAppBar from "../../components/nav.js";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import { toast } from "react-toastify";
import {Instructions} from './Instructions'


function HomePage(props) {
  let jwtToken = localStorage.getItem("jwt");
  let location = useLocation();
  let history = useHistory();
  const [roomId, setRoomId] = useState("");
  const [roomsize, setRoomSize] = useState(4);
  const Background =
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=867&q=80"
  /**
      Creating room and on success you will be redirected to the corresponding room
  */

  useEffect(() => {
    if (location.state === undefined && jwtToken !== null) {
      jwtauth(jwtToken).then((data) => {
        if (data && data.error) {
          alert(data.error);
          localStorage.removeItem("jwt");
          setTimeout(() => {
            console.log(location.pathname);
            history.push("/", { previousLocation: location.pathname });
          }, 1500);
        } else if (data) {
          location.state = {};
          location.state.Auth = true;
        }
      });
    } else if (location.state === undefined) {
      alert("Please Login");

      setTimeout(() => {
        console.log(location.pathname);
        history.push("/", { previousLocation: location.pathname });
      }, 1500);
    } else if (location.state.Auth === false) {
      alert("Not Authenticated");

      setTimeout(() => {
        history.push("/", { previousLocation: location.pathname });
      }, 1500);
    }

    if (location.state) {
      if (location.state.roomId) {
        props.socket.emit("leave", { roomId: location.state.roomId });
      }
    }
  }, [jwtToken, location.state, location.pathname, history, props.socket]);

  useEffect(() => {
    props.socket.on("success", (data) => {
      history.push("/room/" + data, { token: jwtToken });
    });

    props.socket.on("failure", (data) => {
      alert(data);
    });
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
    Emitting playonline and waiting for a success to redirect to the required room
    Failure maybe due to server inavailability
  */
  // function playOnline() {
  //   props.socket.emit("PlayOnline", { token: jwtToken });
  // }

  /**
    Emitting createRoom which is similar to playonline --> Online click and wait for redirect
    Failure maybe due to repetation of the roomID which wont be the case if we set roomId to be 8 digits
  */

  function createRoom() {
    if(roomsize >=4 && roomsize <=10){
      props.socket.emit("Create Room", { token: jwtToken, roomSize: roomsize });
    }else{
      toast.error('RoomSize should be >=4',{
        autoClose:2000
      })
    }
  }

  /**
    JoinRoom is different as it gets the form input for the roomId to join
    And behaves like createRoom on success and failure might be due to overcrowding
    of the room
  */

  function JoinRoom() {
    props.socket.emit("Join Room", { roomId: roomId, token: jwtToken });
  }

  return (
    <div
      style={{
        height: "95vh",
        overflowX: "hidden",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
      }}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >

        <Grid item md={6} xs={10}>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 2000, exit: 1000 }}
          >
            <Paper
              elevation={15}
              style={{paddingTop:'20px', marginTop: "10%", paddingBottom: "40px" }}
            >
              <Typography
                style={{ textAlign: "center" }}
                variant="h6"
                component="h6"
              >
                Play with Friends
                <Switch onChange={props.otd}  />
              </Typography>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={6}
                style={{ paddingTop: "5%" }}
              >
                <Grid item md={10} xs={10}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="RoomSize"
                    label="RoomSize"
                    type="number"
                    id="roomsize"
                    pattern="\d*"
                    value={roomsize}
                    onChange={(e) => {
                      if(e.target.value >=4 && e.target.value <=10)
                          setRoomSize(e.target.value);
                      else if(e.target.value >= 0 && e.target.value <=10)
                          setRoomSize(e.target.value);
                      else if(e.target.value > 10)
                          setRoomSize(10);
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="submit"
                    onClick={() => {
                      createRoom();
                    }}
                  >
                    Create Room
                  </Button>
                </Grid>

                <Grid item md={10} xs={10}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="RoomID"
                    label="RoomID"
                    type="text"
                    id="roomID"
                    onChange={(e) => {
                      setRoomId(e.target.value);
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      JoinRoom();
                    }}
                  >
                    Join Room
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Slide>
        </Grid>

        <Instructions/>

      </Grid>
    </div>
  );
}

const Home = (props) => (
  <SocketContext.Consumer>
    {(socket) => (
      <React.Fragment>
        <ButtonAppBar {...props} />
        <HomePage {...props} socket={socket} />
      </React.Fragment>
    )}
  </SocketContext.Consumer>
);

export default Home;
