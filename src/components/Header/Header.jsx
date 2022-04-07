import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box,  Menu, MenuItem} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Select from '@material-ui/core/Select';
import useStyles from './styles';
import axios from 'axios';
import localStorageService from '../../service/localStorageService';

export default function Header({ setCoordinates, username}) {
    const classes = useStyles();
    const navigate = useNavigate();

    const [autocomplete, setAutocomplete] = useState(null);
    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCoordinates({lat,lng})
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const Logout = async () => {
      const {data} = await axios.post("https://traveladvisor-backend.herokuapp.com/users/logout");
      localStorageService.removeToken();
      navigate("/login");

    }

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Travel Advisor
          </Typography>
          <Box display="flex">
            <Typography variant="h6" className={classes.title}>
              Explore new place
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
          <Typography
            variant="h5"
            className={classes.title}
            aria-controls="simple-menu"
            aria-haspopup="true"
            style={{cursor:"pointer"}}
            onClick={handleClick}
          >
            <AccountCircleOutlinedIcon /> {username}
          </Typography>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                marginTop:"34px",
              }
            }}
          >
            <MenuItem onClick={handleClose}><div onClick={Logout}>Logout</div></MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
}
