import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import ImageGallery from "../../auth/components/ImageGallery";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice";

const NoteView = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.journal)

  const { body, title, date, onInputChange, formState } = useForm( note )

  const dateString = useMemo (() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [note.date])

  useEffect(()=>{
    dispatch(setActiveNote( formState ))
  }, [formState])

  const onSaveNote = () => {
    dispatch()
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
          <Button color="primary" sx={{ padding: 2 }}
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

      <ImageGallery/>
    </>
  );
};

export default NoteView;
