import { Grid2 as Grid, Typography } from "@mui/material";

const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
      <Grid
        className="box-shadow animate__animated animate__fadeIn animate__faster"
        size={{ xs: 10, sm: 8, md: 6 }}
        sx={{ 
            width: { md: '450px' }, 
            backgroundColor: "white", 
            padding: 6, 
            borderRadius: 2 
        }}
      >

        <Typography variant="h5" sx={{ mb: 2 }}>
          { title }
        </Typography>
        { children }
      </Grid>
    </Grid>
  );
};

export default AuthLayout;