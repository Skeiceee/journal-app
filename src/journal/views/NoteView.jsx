import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import ImageGallery from "../../auth/components/ImageGallery";

const NoteView = () => {
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
          <Typography> 13 de diciembre, 2024</Typography>
        </Grid>

        <Grid>
          <Button color="primary" sx={{ padding: 2 }}>
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
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          sx={{ mt: 2, width: "100%" }}
          minRows={5}
        />
      </Grid>

      <ImageGallery/>
    </>
  );
};

export default NoteView;
