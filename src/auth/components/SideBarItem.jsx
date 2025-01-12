/* eslint-disable react/prop-types */
import { TurnedInNot } from "@mui/icons-material";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

const SideBarItem = ({ id, title = '', body, date, imageUrls = [] }) => {

  const newTitle = useMemo (() => {
    if (title.length > 17 ) {
      return title.substring(0,17) + '...'
    }
    return title 
  }, [title])

  const dispatch = useDispatch();

  const onClickActiveNote = () => {
      dispatch( setActiveNote({ id, title, body, date, imageUrls  }) )
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Box>
          <ListItemText primary={newTitle}></ListItemText>
          <ListItemText secondary={body}></ListItemText>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
