import React , {useState,useEffect} from 'react';
import {AppBar,Typography,Avatar,Toolbar,Button} from '@material-ui/core';
import {Link,useHistory,useLocation} from 'react-router-dom';
import useStyles from './styles';
import voyage from '../../images/memories.png';
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)
    const dispatch = useDispatch()
    const history=useHistory()
    const location=useLocation()
    const logout=()=>{
        dispatch({type:'LOGOUT'})
        history.push('/')
        setUser(null);
    }
    useEffect(()=>{
        const token = user?.token;
        if (token) {
        const decodedToken = decode(token);
        console.log(decodedToken)
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
  return (
       <AppBar className={classes.appBar} position="static" color="inherit">
       <div className={classes.brandContainer}>
       <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Voyage</Typography>
       <img className={classes.image} src={voyage} alt="icon" height="60" />
       </div>
       <Toolbar className={classes.toolBar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.given_name}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(        
            <div>
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            </div>
        )}
    </Toolbar>
    </AppBar>
  )
}

export default Navbar
