import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { useHistory, useLocation } from "react-router-dom";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
});

const getListStyle = (isDraggingOver) => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

export default function Form11(props) {
  let history = useHistory();
  let location = useLocation();
  const [items, setitems] = useState(Object.values(location.state.list));
  const [captain, setCaptain] = useState(null);

  useEffect(()=>{
    if(location.state === undefined){
      history.replace('/home');
    }
  },[])

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const item = reorder(items, result.source.index, result.destination.index);

    setitems(item);
  }

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item md={8} xs={11}>
        <Paper
          style={{ textAlign: "center", paddingTop: "4%", paddingBottom: "4%" }}
        >
          <Typography variant="h5">Choose your 11</Typography>
        </Paper>
      </Grid>
      <Grid item md={8} xs={11}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List style={getListStyle(snapshot.isDraggingOver)}>
                  {items.map((item, index) => (
                    <Draggable
                      key={item.player}
                      draggableId={item.player}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ContainerComponent="li"
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItemText
                            classes={{
                              primary: "#8b07b6",
                              secondary: "#D11111",
                            }}
                            primary={item.player}
                            secondary={item.type}
                          />
                          <ListItemSecondaryAction>
                            {index < 11 ? (
                              <React.Fragment>
                                <Button
                                  onClick={() => {
                                    setCaptain(item.player);
                                  }}
                                >
                                  Set Cap
                                </Button>
                                {item.player === captain ? (
                                  <CopyrightIcon color="primary" />
                                ) : null}
                              </React.Fragment>
                            ) : null}
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
}
