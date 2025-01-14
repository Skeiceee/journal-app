import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid2 as Grid, IconButton, TextField, Typography } from "@mui/material";
import ImageGallery from "../../auth/components/ImageGallery";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, stratUploadingFiles } from "../../store/journal/thunks";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

const NoteView = () => {

  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving} = useSelector((state) => state.journal)

  const { body, title, date, onInputChange, formState } = useForm( note )

  const dateString = useMemo (() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [note.date])

  useEffect(() =>{
    dispatch(setActiveNote( formState ))
  }, [formState])

  useEffect(() => {
    if( messageSaved.length > 0){
      Swal.fire("Nota Actualizada", messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch( startSaveNote() )
  }

  const fileInputRef = useRef()
  const onFileInputChange = ({target}) => {
    if(target.files === 0) return;
    dispatch( stratUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Grid>
          <Typography>{ dateString }</Typography>
        </Grid>
        

        <Grid>
          <Grid>
              <input 
                type="file" 
                multiple 
                onChange={onFileInputChange}
                name="file" id=""
                ref={fileInputRef}
                style={{ display:"none" }}
                />
          </Grid>

          <IconButton
            color="primary" 
            disabled={isSaving}
            onClick={ () => fileInputRef.current.click() }
            >
            <UploadOutlined/>
          </IconButton>

          <Button color="primary" sx={{ padding: 2 }}
            disabled={ isSaving }
            onClick={ onSaveNote }>
            <SaveOutlined sx={{ fontSize: 25, mr: 1 }}></SaveOutlined>
            Guardar
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          sx={{ mt: 2, width: "100%" }}
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid>
          <Button
            onClick={onDelete}
            sx={{ mt: 2 }}
            color="error"
          >
            <DeleteOutline/>
            Borrar
          </Button>
      </Grid>

      <ImageGallery images={ note.imageUrls }/>
    </>
  );
};

export default NoteView;
