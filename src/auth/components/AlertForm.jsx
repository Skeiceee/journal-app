import { Alert, Grid2 as Grid } from "@mui/material"

const AlertForm = ({ error }) => {
  return (
    <Grid sx={{ width: '100%'
    }}>
        <Alert severity="error">
            {error}
        </Alert>
    </Grid>   
  )
}

export default AlertForm