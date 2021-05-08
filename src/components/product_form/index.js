import React,{useReducer,useEffect,useState} from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  Grid,
  makeStyles,
  Button,Collapse,IconButton,MenuItem,Select,InputLabel
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios  from 'axios';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {storeAllProduct} from '../../store/action/productAction'
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

const ProductForm = () => {
  const classes = useStyles();
  const dispatch=useDispatch()
  const [open, setOpen] =useState(false);
  const [msg, setMsg] =useState('');
  const [option,setOption]=useState([])
  const {category_list}=useSelector((state)=>state.categoryStore)
  const history=useHistory();

  useEffect(()=>{
    let data=category_list.map(obj => {
      return <MenuItem value={obj._id} key={obj._id}>{obj.name}</MenuItem>
    })
    setOption(data)
  },[])

     
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title:"",price:"",description:"",stock:"",category:"",image:""
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
    let user=JSON.parse(sessionStorage.getItem('jwtToken'));
    let token=user.token
    console.log(formInput)
    axios.post('http://127.0.0.1:8080/products',{
        title: formInput.title,
        price: parseFloat(formInput.price),
        description: formInput.description,
        image:formInput.image,
        stock: formInput.stock,
        category:{
            _id:formInput.category
        } 
    },{
        headers: {
          'authorization': `bearer ${token}` 
        }
      }).then((res)=>{
        setMsg('Added new product.');
        setOpen(true);
        dispatch(storeAllProduct())
    }).catch((e)=>{
      setMsg(e.response.data.error);
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
   
        <Typography component="h1" variant="h5">
          Add new product
        </Typography>
        <ValidatorForm  onSubmit={submitForm}>
          <Grid container spacing={2}>
              
             <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  value={formInput.title}
                  fullWidth
                  required
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
                  required
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
                  required
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
                  required
                  label="Product stock"
                  name="stock"
                  type="number"
                  onChange={handleInput}
                />
              </Grid>  
              <Grid item xs={12}>
              <InputLabel id="categorylabel">Category</InputLabel>
                <Select
                    labelId="categorylabel"
                    id="category"
                    name="category"
                    value={formInput.category}
                    fullWidth
                    onChange={handleInput}
                    >
                    {option}
                </Select>
                
              </Grid>
              <Grid item xs={12}>
              <input type="file" name="image" required  onChange={convertImage}/>
                
              </Grid>
          </Grid>
          <Button2
            type="submit"
            variant="dark"
            className={classes.submit}
          >
            Add Product
          </Button2>
        
        </ValidatorForm>
      </div>
      <Box mt={5}>

      </Box>
    </Container>
  );
};

export default ProductForm;
