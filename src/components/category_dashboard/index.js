import React,{useState,useEffect} from 'react';
import CategoryForm from '../category_form';
import Button from '@material-ui/core/Button';
import { Table ,Button as Button2 } from 'react-bootstrap';
import { Collapse,IconButton} from "@material-ui/core";
import {DialogTitle, DialogContentText,DialogContent,DialogActions,Dialog} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory} from 'react-router-dom'
import {setNotificationDisplay} from '../../store/action/notificationAction'
import {useSelector,useDispatch} from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {deleteCateogry} from '../../store/action/categoryAction';


const CategoryDashboard = () => {
    const [currentForm,setForm]=useState('category_list')

    const history=useHistory()
    const dispatch=useDispatch();
    const notification=useSelector((state)=>state.notificationStore) 
    const {category_list}=useSelector((state)=>state.categoryStore)

    const [open, setOpen] = React.useState(false);
    const [currentCategory,setCurrntCategory]=useState('')

    const handleClickOpen = (category_id) => {
        setOpen(true);
        setCurrntCategory(category_id)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const deleteCategory=()=>{
    
        dispatch(deleteCateogry(currentCategory))
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
        <Button2 variant="dark"  onClick={()=>setForm('category_list')}>
             Category List
        </Button2>
        <Button2 variant="dark"  onClick={()=>setForm('category')} style={{marginLeft:'20px'}}>
            Add Category
        </Button2>
 
        
    </div>
    
    {currentForm ==="category" && <CategoryForm />}
    {currentForm ==="category_list" && <div>

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
                <th>Desc</th>
  
                <th></th>
            </tr>
        </thead>
        <tbody>
            {category_list.map((row) => (
                <tr key={row._id}>
                    <td>{row._id}</td>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
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
                                <Button onClick={deleteCategory} color="secondary" autoFocus>
                                    Delete
                                </Button>
                                </DialogActions>
                            </Dialog>    
                            </div>}
    </>
    );
}
 
export default CategoryDashboard;

