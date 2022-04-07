import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '90%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    bg:{
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      minHeight:"100vh"
    },
    link:{
      color:"#000",
      textDecoration:"none"
    },
    paper2: {
      marginTop:"80px",
      width: "500px",
      height:"450px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border:"1px solid #000",
      borderRadius:"5%",
      boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px;"
    }
  }));

  export default useStyles