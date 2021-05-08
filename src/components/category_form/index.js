import React,{useReducer,useEffect} from "react";
import { CssBaseline,Typography, Container, Box,Grid,makeStyles, Button,Collapse,IconButton} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {useDispatch,useSelector} from 'react-redux'
import {addNewCateogry} from '../../store/action/categoryAction'
import {setNotificationDisplay} from '../../store/action/notificationAction'
import { Table ,Button as Button2 } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(3),
  },
  submit: { 
    margin: theme.spacing(3, 0, 2),
    width:"100%"
  },
}));

const CategoryForm = () => {
  const dispatch=useDispatch();
  const classes = useStyles();
  const notification=useSelector((state)=>state.notificationStore)     
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name:"",description:"",image:""
    }
  );
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const convertImage=e=>{
    const name = e.target.name;
    getBase64(e.target.files[0]).then(result => {
        setFormInput({ [name]: result });
    })
  }
  const getBase64 = file => {
    return new Promise(resolve => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);
       reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
    };

  const submitForm=(evt)=>{
    evt.preventDefault();
    dispatch(addNewCateogry(formInput))
  }
  const setDisplay=()=>{
    dispatch(setNotificationDisplay())
  }
  useEffect(()=>{
    return(()=>{
      dispatch(setNotificationDisplay())
    })
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Collapse in={notification.display}>
        <Alert severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setDisplay();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {notification.message}
        </Alert>
      </Collapse>
      <div className={classes.paper}>
   
        <Typography component="h1" variant="h5">
          Add new Category
        </Typography>
        <ValidatorForm  onSubmit={submitForm}>
          <Grid container spacing={2}>
              
             <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.title}
                  fullWidth
                  required
                  label="Category title"
                  name="name"
                  onChange={handleInput}
                />
              </Grid>
       
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.description}
                  fullWidth
                  required
                  label="Category description"
                  name="description"
                  onChange={handleInput}
                />
              </Grid>  
  
              <Grid item xs={12}>
              <input type="file" name="image"   onChange={convertImage}/>
                
              </Grid>
          </Grid>
          <Button2
            type="submit"
         
            variant="dark"
        
            className={classes.submit}
          >
            Add Category
          </Button2>
        
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
};

export default CategoryForm;
