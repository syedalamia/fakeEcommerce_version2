import React,{useReducer,useState,useEffect} from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  Grid,
  makeStyles,
  Button,Collapse,IconButton,MenuItem,InputLabel,Select
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {updateCategory} from '../../store/action/categoryAction'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {useSelector,useDispatch} from 'react-redux'
import {setNotificationDisplay} from '../../store/action/notificationAction'


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
  },
}));

const CategoryUpdateForm = () => {
  const {category_list}=useSelector((state)=>state.categoryStore)
  const notification=useSelector((state)=>state.notificationStore)

  const dispatch=useDispatch()
  const classes = useStyles();
  const [option,setOption]=useState([])

  useEffect(()=>{
    let data=category_list.map(obj => {
      return <MenuItem value={obj._id} key={obj._id}>{obj.name}</MenuItem>
    })
    setOption(data)
  },[category_list])
   
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name:"",description:"",image:"",category_id:""
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
    dispatch(updateCategory(formInput))

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
         Update Category
        </Typography>
        <ValidatorForm  onSubmit={submitForm}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="categorylabel">Category</InputLabel>
                <Select
                    labelId="categorylabel"
                    id="category"
                    name="category_id"
                    value={formInput.category_id}
                    fullWidth
                    onChange={handleInput}
                    >
                    {option}
                </Select>
                
              </Grid>
              
             <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.title}
                  fullWidth
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
                  label="Category description"
                  name="description"
                  onChange={handleInput}
                />
              </Grid>  
  
              <Grid item xs={12}>
              <input type="file" name="image"   onChange={convertImage}/>
                
              </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Category
          </Button>
        
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
};

export default CategoryUpdateForm;
