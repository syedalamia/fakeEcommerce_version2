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
import {updateProduct} from '../../store/action/productAction'
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

const ProductUpdate = (props) => {

  const {productList}=useSelector((state)=>state.productStore)
  const notification=useSelector((state)=>state.notificationStore)

  const dispatch=useDispatch()
  const classes = useStyles();
  const [option,setOption]=useState([])
  const [product,setProduct]=useState()

  useEffect(()=>{
    let data=productList.find(obj => {
        return obj._id==props.prod_id
    })
  
    setFormInput({...data,product_id:data._id,category:data.category.name})
    // setOption(data)
  },[productList])
   
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title:"",price:"",description:"",stock:"",category:"",image:"",product_id:""
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

    console.log(formInput)
    dispatch(updateProduct(formInput))

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

        <ValidatorForm  onSubmit={submitForm}>
          <Grid container spacing={2}>
       
           
             <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.title}
                  fullWidth
                  
                  label="Product title"
                  name="title"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.price}
                  fullWidth
                  
                  label="Product price"
                  name="price"
                  type="number"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.description}
                  fullWidth
                  
                  label="Product description"
                  name="description"
                  onChange={handleInput}
                />
              </Grid>  
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.stock}
                  fullWidth
                  
                  label="Product stock"
                  name="stock"
                  type="number"
                  onChange={handleInput}
                />
              </Grid>  
              <Grid item xs={12}>
              <InputLabel id="categorylabel">Category</InputLabel>
                <TextValidator
                    labelId="categorylabel"
                    id="category"
                    name="category"
                    value={formInput.category}
                    fullWidth
                    onChange={handleInput}
                    >
                    {option}
                </TextValidator>
                
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
            Update Product
          </Button>
        
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
};

export default ProductUpdate;
