import {
  Box,
  Button,
  Grid2 as Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import AlertForm from "../components/AlertForm";

const formData = {
  name: '',
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras' ],
  name: [ (value) => value.length >= 1, 'El nombre es obligatorio' ],
}

const RegisterPage = () => {

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    formState, name, email, password, onInputChange, 
    isFormValid, emailValid, passwordValid, nameValid 
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if(!isFormValid){
      return;
    }

    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title="Registro">
      {/* <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}
      <form onSubmit={ onSubmit }>
        <Grid container spacing={2}>
          <TextField
            fullWidth
            id="name"
            label="Nombre completo"
            placeholder="Jonh doe"
            type="text"
            variant="outlined"
            autoComplete="off"
            name="name"
            value={name}
            onChange={onInputChange}
            error={ (nameValid  && formSubmitted) ? true : false }
            helperText={ (nameValid  && formSubmitted) ? nameValid : null }
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            placeholder="correo@google.com"
            type="email"
            variant="outlined"
            autoComplete="off"
            name="email"
            value={email}
            onChange={onInputChange}
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
            value={password}
            onChange={onInputChange}
            error={ (passwordValid && formSubmitted) ? true : false }
            helperText={ (passwordValid && formSubmitted) ? passwordValid : null }
          />
        </Grid>

        {
          errorMessage ? <Box sx={{ mt: 2 }}><AlertForm error={ errorMessage }/></Box>: null
        }

        <Grid container size={12} spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" type="submit" disabled={isCheckingAuthentication}>
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end" size={12} sx={{ mt:2 }}>
          <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            Ingresar
          </Link>
        </Grid>
      
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
