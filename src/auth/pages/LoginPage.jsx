import { Google } from "@mui/icons-material";
import {
  Button,
  Grid2 as Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router";

import AuthLayout from "../layout/AuthLayout";

import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo, useState } from "react";
import AlertForm from "../components/AlertForm";


const formData = {
    email: '',
    password: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras' ],
}

const LoginPage = () => {

  const { status, errorMessage } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const { 
    formState, email, password, onInputChange, 
    isFormValid, emailValid, passwordValid 
  } = useForm(formData, formValidations)

  const isAuthenticating = useMemo( () => status === 'checking', [status] );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    
    setFormSubmitted(true);
    if(!isFormValid){
      return;
    }
    
    dispatch( startLoginWithEmailPassword(formState) )
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          
          <TextField
            fullWidth
            id="email"
            label="Email"
            placeholder="correo@google.com"
            type="email"
            variant="outlined"
            autoComplete="off"
            name="email"
            value={ email }
            onChange={ onInputChange }
            error={ (emailValid  && formSubmitted) ? true : false }
            helperText={ (emailValid  && formSubmitted) ? emailValid : null}
          />

          <TextField
            fullWidth
            id="password"
            label="Password"
            placeholder="password"
            type="password"
            variant="outlined"
            autoComplete="off"
            name="password"
            value={ password }
            onChange={ onInputChange }
            error={ (passwordValid && formSubmitted) ? true : false }
            helperText={ (passwordValid && formSubmitted) ? passwordValid : null }
          />

          {
            errorMessage ? <AlertForm error={ errorMessage }/> : null
          }

          <Grid container size={12} spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Button 
                disabled={ isAuthenticating }
                fullWidth variant="contained" type="submit">
                Login
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Button 
                disabled={ isAuthenticating }
                fullWidth variant="contained" onClick={ onGoogleSignIn }>
                <Google />
                <Typography marginLeft={1}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end" size={12}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
