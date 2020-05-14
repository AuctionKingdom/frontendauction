import React,{useState, useEffect} from 'react';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../socket-context.js';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

function HomePage(props) {

  let history = useHistory();
  const [roomsAvailable,setRooms] = useState([]);


  /**
      Creating room and on success you will be redirected to the corresponding room
  */
  function connectToRoom(){
    props.socket.emit("Create Room");

    props.socket.on(`success`,data=>{
        history.replace('/room/'+data);
    })
  }

  function JoinRoom(roomId){

    let formData = {"roomId":roomId};
    console.log(roomId);
    props.socket.emit("Join Room",formData);

    props.socket.on("success",data=>{
      history.replace('/room/'+data);
    })

  }

  useEffect(()=>{

      props.socket.on('room',data=>{
         setRooms(data);
      })

  })


  return (
    <div style={{marginTop:'5%'}}>

        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={5}
        >
          <Grid item md={4} xs={4}>
                <Button variant="contained" color="primary" type="submit">Play Online </Button>
          </Grid>

          <Grid item md={6} xs={10}>
                <Paper elevation={10} style={{padding:'5%'}}>
                    <Typography style={{textAlign:'center'}} variant="h6" component="h6"> Play with Friends</Typography>
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          spacing={6}
                          style={{paddingTop:'5%'}}
                    >
                      <Grid item md={12} xs={12} style={{borderBotton:'1px solid black'}}>
                        <Button variant="contained" color="secondary" type="submit">Create Room</Button>
                      </Grid>

                      <Grid item md={10} xs={10}>
                          <form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="RoomID"
                                label="RoomID"
                                type="text"
                                id="roomID"
                            />
                            <Button
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                            >
                                  Join Now
                            </Button>
                        </form>
                      </Grid>
                    </Grid>
                </Paper>
          </Grid>
        </Grid>
    </div>
  );
}

const Home = props => (
    <SocketContext.Consumer>
      {socket => <HomePage {...props} socket={socket} />}
    </SocketContext.Consumer>
)

export default Home;
