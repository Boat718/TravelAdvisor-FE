import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Container, CssBaseline, FormControlLabel, TextField, Typography, Checkbox, Button, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import useStyles from "./style";
import localStorageService from '../../service/localStorageService';


export default function Login(props) {

    const navigate = useNavigate();
    const classes = useStyles();
    
    const onSubmit = async (event) => {
      event.preventDefault();
      const body = {
        username:event.target.username.value,
        password:event.target.password.value,
      }
      const {data} = await axios.post('https://traveladvisor-backend.herokuapp.com/users/login', body);
      console.log(data)
      localStorageService.setToken(data.token);
      props.setRole("user")
      navigate("/main");
    }
    return (
      <div className={classes.bg}>
        <Container maxWidth="xs" component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <div className={classes.paper2}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign In to Travel Advisor.
              </Typography>
              <form className={classes.form} onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  placeholder="username"
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="#" className={classes.link}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/register" className={classes.link}>
                      Don't have an account? Sign Up"
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
}
