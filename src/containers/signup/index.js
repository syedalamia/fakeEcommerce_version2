import React,{useReducer,useEffect,useState} from "react";
import {
  Avatar,
  CssBaseline,
  Typography,
  Container,
  Box,
  Grid,
  makeStyles,
  Button,Collapse,IconButton
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {Link as RouteLink} from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios  from 'axios';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history=useHistory();
  const [open, setOpen] =useState(false);
  const [msg, setMsg] =useState('');
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",user_name:"",email:"",password:"",city:"",street:"",number:"",zipcode:"",phone:"",lat:"",long:""
    }
  );

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      setFormInput({ lat:  position.coords.latitude });
      setFormInput({ long:  position.coords.longitude });
    });
  },[])
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
  const submitForm=(evt)=>{
    evt.preventDefault();

    axios.post('http://127.0.0.1:8080/signup',{
      email: formInput.email,
      username: formInput.user_name,
      password: formInput.password,
      firstname: formInput.firstName,
      lastname:formInput.lastName,
      address: {
        city: formInput.city,
        street: formInput.street,
        number: formInput.number,
        zipcode: formInput.zipcode,
        geolocation: {
          lat:  formInput.lat,
          long: formInput.long
        }
      },
      phone:formInput.phone
    }).then((res)=>{
        history.push('/login')
    }).catch((e)=>{

      setMsg(e.response.data);
      setOpen(true);
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Collapse in={open}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        
        <ValidatorForm  onSubmit={submitForm}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="user_name"
                label="User Name"
                name="user_name"
                autoComplete="user_name"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                value={formInput.email}
                fullWidth
                required
                id="email"
                label="Email Address"
                name="email"
                onChange={handleInput}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInput}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="city"
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                autoFocus
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                onChange={handleInput}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="number"
                name="number"
                variant="outlined"
                fullWidth
                type="number"
                id="number"
                label="Number"
                autoFocus
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                fullWidth
                id="zipcode"
                label="Zip Code"
                name="zipcode"
                type="number"
                autoComplete="zipcode"
                onChange={handleInput}
              />
            </Grid>

            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                type="number"
                autoComplete="Phone"
                onChange={handleInput}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouteLink to="/login" style={{color:"white"}}>
              Already have an account? Sign in
              </RouteLink>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
};

export default SignUp;
