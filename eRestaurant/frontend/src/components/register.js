import React from 'react';
import NavBar from './NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Background from './images/defaultBackground.jpg';
import {Link } from "react-router-dom";

import {axios_config} from '../config.js';



  var backgroundImg = {
    width: "100%",
    height: "900px",
    backgroundImage: `url(${Background})`
  };
  
  const PaperForm = withStyles((theme) => ({
    root: {
        background: '#FFFFFF',
    },

  }))(Paper);

  

const post_user = (Email, Password) => {
  const user_exist = check_user(Email);
  const password_valid = check_password(Password);
  
  if(!user_exist && password_valid) {
    axios.post(`${axios_config["baseURL"]}/auth/users/`,
    {
      email: Email,
      username: Email,
      password: Password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  } else if (user_exist){
    console.log('User exists!');
  } else if (!password_valid) {
    console.log("Password not strong enough!")
  }

}

const check_user = (email) => {
  return false;
}

const check_password = (password) => {
  return true;
}


axios.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});

//rigth way of exporting 
export default class Register extends React.Component { 
  
  constructor(props){
    super();

    this.state = {
      username:'',
      password:'',
      repeat_password:'',
      firstname:'',
      lastname:'',
      alertPass:false,
      alertEmail:false,
      alertMatch:false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setUsername.bind(this);
    this.setRepeatPassword = this.setRepeatPassword.bind(this);
    this.setAlertPass= this.setAlertPass.bind(this);
    this.closeAlertPass = this.closeAlertPass.bind(this);
    this.setAlertEmail= this.setAlertEmail.bind(this);
    this.closeAlertEmail = this.closeAlertEmail.bind(this);
    this.setAlertMatch= this.setAlertMatch.bind(this);
    this.closeAlertMatch = this.closeAlertMatch.bind(this);
    
  }

  

  setUsername(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  setPassword(evt){
    this.setState({
      password: evt.target.value
    })
  }

  setRepeatPassword(evt){
    this.setState({
      repeat_password: evt.target.value
    })
  }

  setFirstName(evt){
    this.setState({
      firstname: evt.target.value
    })
  }
  
  setLastName(evt){
    this.setState({
      lastname: evt.target.value
    })
  }

  setAlertPass(boolean){
    this.setState({
      alertPass: boolean
    })
  }
  setAlertEmail(boolean){
    this.setState({
      alertEmail: boolean
    })
  }
  setAlertMatch(boolean){
    this.setState({
      alertMatch: boolean
    })
  }

  postUser(){
    axios.post(`${axios_config["baseURL"]}auth/users/`,
    {
      email: this.state.username,
      username: this.state.username,
      password: this.state.password
    },
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  checkLength(str){
    if(str.length >= 8){
      return true;
    }
  }

  checkCapital(str){
    for(let i = 0; i < str.lenght; i++){
      if(str[i] !== str[i].toLowerCase()){
        return true;
      }
    }
  }

  checkNumber(str){
    for(let i = 0; i < str.lenght; i++){
      if(Number(str[i]) !== NaN){
        return true;
      }
    } 
  }

  checkEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email); 
  }

  checkPassword(password){
    var passFormat = new RegExp("^((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.{8,}))");
    return passFormat.test(password);
  }

   handleClick (evt) {
    var isValidPass = this.checkPassword(this.state.password);
    var isValidEmail = this.checkEmail(this.state.username);
    var isSamePass = this.state.repeat_password === this.state.password;

    if(isValidEmail && isValidPass && isSamePass){
      this.postUser();
    }else if(!isValidEmail){
      this.setAlertEmail(true);
    }else if(!isValidPass){
      this.setAlertPass(true);
    }else if(!isSamePass){
      this.setAlertMatch(true);
    }
  }

  closeAlertPass(evt){
    this.setState({
      alertPass: false
    })
  }
  closeAlertEmail(evt){
    this.setState({
      alertEmail: false
    })
  }
  closeAlertMatch(evt){
    this.setState({
      alertMatch: false
    })
  }


  render(){
    return (
      <div style={ this.backgroundImg }>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{height:80}}>
                  <b><p style={{textAlign: 'center', height: 5, fontSize:'24px'}}>Le Bistrod d'Andre</p></b>
                  <b><p  style={{textAlign: 'center'}}>Register</p></b>
                </Grid>
                <Grid item xs={12} sm={6} style={{paddingLeft: '24px'}}>
                    <TextField 
                    id="Firstname" 
                    label="Firstname" 
                    variant="outlined" 
                    style = {{width: 252}}
                    onChange = {e => this.setFirstName(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="Lastname" 
                    label="Lastname" 
                    variant="outlined" 
                    style = {{width: 252}}
                    onChange = {e => this.setLastName(e)}/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                    id="username"
                    label="Email Adress"
                    placeholder="Calvin@gmail.com"
                    onChange = {e => this.setUsername(e)}
                    fullWidth
                    variant="outlined"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="password" 
                label="Password" 
                variant="outlined"
                onChange = {e => this.setPassword(e)} 
                type="password"
                fullWidth 
                helperText="Do Not Share Your Password With Anyone"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password Repeat" 
                variant="outlined" 
                type="password"
                onChange = {e => this.setRepeatPassword(e)}fullWidth/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" username={this.state.username} password={this.state.password} onClick={this.handleClick} fullWidth>Register</Button>
                <p>Already have an account? <Link to="/login">Sign-In Here</Link></p>
                <Snackbar open={this.state.alertPass} autoHideDuration={3000} onClose={this.closeAlertPass}>
                  <Alert severity="error" onClose={this.closeAlertPass}> 
                  Invalid Password. Please make sure your password contains 
                  <ul>
                    <li>1 upper case letter</li>
                    <li>1 lower case letter</li>
                    <li>1 number</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                  </Alert>
                </Snackbar>
                <Snackbar open={this.state.alertEmail} autoHideDuration={3000} onClose={this.closeAlertEmail}>
                  <Alert severity="error" onClose={this.closeAlertEmail}> 
                    Invalid Email address. Please try again.
                  </Alert>
                </Snackbar>
                <Snackbar open={this.state.alertMatch} autoHideDuration={3000} onClose={this.closeAlertMatch}>
                  <Alert severity="error" onClose={this.closeAlertMatch}> 
                    Passwords dont match, please try again!
                  </Alert>
                </Snackbar>
                </Grid>
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )
  }
}
/*
const Register = () => {
    const classes = useStyles();
    return(
        <div className={classes.root} style={ backgroundImg }>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons: 1. You might have mismatching versions of R
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Register
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Firstname" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
  
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" />
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                    id="email"
                    label="Email Adress"
                    placeholder="Calvin@gmail.com"
                    fullWidth
                    variant="outlined"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                fullWidth 
                helperText="Do Not Share Your Password With Anyone"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField id="outlined-basic" label="Password Repeat" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" fullWidth>Register</Button>
                <p>Already have an account? <Link to="/login">Sign-In Here</Link></p>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )

}
export default Register;
*/



