import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {TableContainer,Grid,DialogTitle, DialogContentText,DialogContent,DialogActions,Dialog} from '@material-ui/core';
import { Collapse,IconButton} from "@material-ui/core";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useSelector,useDispatch} from 'react-redux';
import {deleteProduct} from '../../store/action/productAction';
import {setNotificationDisplay} from '../../store/action/notificationAction'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductDelete() {
  const classes = useStyles();
  const dispatch=useDispatch();
  const {productList}=useSelector((state)=>state.productStore)
  const notification=useSelector((state)=>state.notificationStore)     
  const [open, setOpen] = React.useState(false);
  const [currentProduct,setCurrntProduct]=useState('')

  console.log(productList)
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

  return (
      <Grid container  direction="row" justify="center" alignItems="center">
          <Grid item xs={8}>
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell component="th" >Name</TableCell>
                    <TableCell component="th" >Price</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {productList.map((row) => (
                    <TableRow key={row._id}>
                    <TableCell  scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell scope="row">
                        {row.price}
                    </TableCell>
                    <TableCell>
                      
                            <Button  color="primary" onClick={()=>handleClickOpen(row._id)}>
                                Delete
                            </Button>
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
                  
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

          </Grid>

      </Grid>
    
  );
}
