
import JournalLayout from "../layout/JournalLayout"
import NothingSelectedView from "../views/NothingSelectedView"
import NoteView from "../views/NoteView"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { startNewNote } from "../../store/journal/thunks"
import { useDispatch, useSelector } from "react-redux"

const JournalPage = () => {

  const { isSaving, active } = useSelector((state) => state.journal)

  const dispatch = useDispatch();

  const onClickNewNote = () =>{
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout>

      {
        (active)
          ? <NoteView/>
          : <NothingSelectedView/>
      }

      <IconButton onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{ 
          color: 'white',
          backgroundColor: 'secondary.main',
          ':hover': { backgroundColor: 'secondary.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
         }}
      >
        <AddOutlined sx={{ fontSize: 30 }}></AddOutlined>
      </IconButton>
    </JournalLayout>
  )
}

export default JournalPage
