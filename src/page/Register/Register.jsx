import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Container, CssBaseline, FormControlLabel, TextField, Typography, Checkbox, Button, Grid, Snackbar} from '@material-ui/core';
import { Alert} from '@material-ui/lab';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import useStyles from "./style";
import axios from 'axios';

export default function Register(props) {

    const [isRegister, setIsRegister] = useState(false);
    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();


    const onSubmit = async (event) => {
      event.preventDefault();
      const body = {
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value
      }
      const {data} = await axios.post('https://traveladvisor-backend.herokuapp.com/users/register', body);
      if(data.status) {
        setOpen(true);
        setTimeout(()=> {return navigate("/login");},1300);
        
      } else {
        setOpenFail(true);
      }
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setOpenFail(false);
    };

    return (
    <div className={classes.bg}>
    <Container maxWidth="xs" component="main">
      <Snackbar open={open} autoHideDuration={1000}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert severity="success">
        Your register is success.
        </Alert>
      </Snackbar>
      <Snackbar open={openFail} autoHideDuration={3000}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert severity="error">
        User is exist!
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.paper2}>
          <Avatar className={classes.avatar}>
            <ContactsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Register
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              placeholder="Username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="E-mail"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" className={classes.link}>
                  Already have account? Sign In 
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Container>
  </div>
  )
}
