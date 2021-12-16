import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Iservi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [nombre,setNombre]= useState('')
  const [apellidos,setApellidos]= useState('')
  const [correo,setCorreo]= useState('')
  const [constrasena,setConstrasena]= useState('')
  const [telefono,setTelefono]= useState('')

  const registrarUsuario = async(e)=>{
    e.preventDefault();
    const registrarUsuario={nombre,apellidos,correo,constrasena,telefono}
    const respuesta = await Axios.post('/user/crear',registrarUsuario);
    console.log(respuesta);
    const mensaje= respuesta.data.mensaje;

    if(nombre==''){
      Swal.fire({
          icon:'error',
          title:'debe escribir un nombre',
          showConfirmButton:false,
          timer: 1500
      })
    }
    if(apellidos===''){
      Swal.fire({
          icon:'error',
          title:'debe escribir los apellidos',
          showConfirmButton:false,
          timer: 1500
      })
    }
    if(correo===''){
      Swal.fire({
          icon:'error',
          title:'debe escribir un correo',
          showConfirmButton:false,
          timer: 1500
      })
    }
    if(constrasena===''){
      Swal.fire({
          icon:'error',
          title:'debe escribir una contraseña',
          showConfirmButton:false,
          timer: 1500
      })
    }
    if(telefono===''){
      Swal.fire({
          icon:'error',
          title:'debe escribir un telefono',
          showConfirmButton:false,
          timer: 1500
      })
    }
    else{
        
        Swal.fire({
          icon:'success',
          title:mensaje,
          showConfirmButton:false,
          timer: 1500
      })
      e.target.reset();
      setNombre("");
      setApellidos("");
      setCorreo("");
      setConstrasena("");
      setTelefono("");
      window.location.href='/Login'
    }
}
////////////////////////////////////


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Box component="form" noValidate onSubmit={registrarUsuario} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombres"
                  autoFocus
                  onChange={(e)=>setNombre(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setApellidos(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setCorreo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setConstrasena(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Telefono"
                  label="Telefono"
                  name="Telefono"
                  autoComplete="Telefono"
                  onChange={(e)=>setTelefono(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Acepto Terminos y Condiciones."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                Tiene una cuenta? Loguearse
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
