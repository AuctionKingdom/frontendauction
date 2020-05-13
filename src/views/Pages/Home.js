import React,{useState, useEffect} from 'react';
import Grid  from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import SocketContext from '../../socket-context.js';
import { makeStyles } from '@material-ui/core/styles';

function HomePage(props) {

  let history = useHistory();
  const [roomsAvailable,setRooms] = useState([]);


  const useStyles = makeStyles({
      root: {
            maxWidth: 345,
          },
      });

  function renderRooms(){
    if (roomsAvailable) {
        return Object.keys(roomsAvailable).map( (key) => {
            return (
                <Grid item xs={12}>
                    <Card className={useStyles.root}>
                        <CardActionArea key={key} onClick={()=>JoinRoom(key)}>
                            <CardContent>
                              <Typography gutterBottom variant="h" component="h2">
                                  Room Id:{key}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  Number of players:{roomsAvailable[key]}/3
                              </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        });
      } else {
          return <p>No Rooms Available</p>;
      }
  }


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
              direction="column"
              justify="center"
              alignItems="center"
              spacing={5}
        >
          <Grid item xs={2}>
                <Button variant="contained" color="primary" type="submit" onClick={connectToRoom}>Create Room </Button>
          </Grid>

          <Grid item>
              <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
              >
                {renderRooms()}
              </Grid>
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
