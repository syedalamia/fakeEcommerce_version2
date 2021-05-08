import React,{useState,useEffect} from 'react';
import ProductForm from '../product_form';
import ProductDelete from '../product_delete';
import ProductUpdate from '../product_update'
import Button from '@material-ui/core/Button';
import { Table ,Modal,Button as Button2 } from 'react-bootstrap';
import { Collapse,IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import {TableContainer,Grid,DialogTitle, DialogContentText,DialogContent,DialogActions,Dialog} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory} from 'react-router-dom'
import {deleteProduct} from '../../store/action/productAction';
import {setNotificationDisplay} from '../../store/action/notificationAction'
import {useSelector,useDispatch} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const ProductDashboard = () => {
    const history=useHistory()
    const dispatch=useDispatch();
    const [currentForm,setForm]=useState('all_product')

    const [open, setOpen] = React.useState(false);
    const [currentProduct,setCurrntProduct]=useState('')
    const notification=useSelector((state)=>state.notificationStore)    
    const {productList}=useSelector((state)=>state.productStore)

    const handleClickOpen = (product_id) => {
        setOpen(true);
        setCurrntProduct(product_id)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const deleteSingleProduct=()=>{
    
        dispatch(deleteProduct(currentProduct))
        setOpen(false);
      }
    
      useEffect(()=>{
        return(()=>{
          dispatch(setNotificationDisplay())
        })
      },[])
      const setDisplay=()=>{
        dispatch(setNotificationDisplay())
      }
    
    return (<>
    <div style={{marginTop:'20px'}}>
        <Button2 variant="dark"  onClick={()=>setForm('all_product')} style={{marginLeft:'20px'}}>
            Product List
        </Button2>
        <Button2 variant="dark"  onClick={()=>setForm('add_product')} style={{marginLeft:'20px'}}>
            Add Product
        </Button2>
        
        
    </div>
       
    {currentForm ==="add_product" && <ProductForm />}
    {currentForm ==="all_product" && 
    <div>
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
    <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {productList.map((row) => (
                <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.title}</td>
                    <td>{row.price}</td>
                    <td>{row.stock}</td>
                    <td> <Button  onClick={()=>handleClickOpen(row._id)}><DeleteIcon /> </Button></td>
                </tr>
            ))}
        </tbody>
    </Table>

                             <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{" Delete Product"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                         Are you sure you want to delete this Product?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                                <Button onClick={deleteSingleProduct} color="secondary" autoFocus>
                                    Delete
                                </Button>
                                </DialogActions>
                            </Dialog>     
            </div>}     
    </>
    );
}
 
export default ProductDashboard;

