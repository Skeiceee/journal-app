import { CircularProgress, Grid2 as Grid } from "@mui/material"

const CheckingAuth = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems="center"
      >
        
        <CircularProgress color="warning"/>


      </Grid>
    </Grid>
  )
}

export default CheckingAuth
