import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getAllorderinfo} from '../../store/action/orderAction';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const OrderDashboard = () => {
    const dispatch=useDispatch();
    const {orderList}=useSelector((state)=>state.orderStore)
    console.log(orderList)
    const classes = useStyles();
    useEffect(()=>{
        dispatch(getAllorderinfo());
    },[])
    

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>OrderId</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="left">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orderList.map((row) => (
                <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                        {row._id}
                    </TableCell>
                    <TableCell align="left">{row.userId.username}</TableCell>
                    <TableCell align="left">{row.userId.phone}</TableCell>
                    <TableCell align="left">
                        {row.products.map((row2) => (
                            <p style={{textAlign:"left"}}>{row2.productId.title}</p>
                        ))}
                    </TableCell>
                    <TableCell align="left">{row.status == 0 ? <p style={{color:"yellowgreen"}}>Pending</p>
                    :row.status == 1 ? <p style={{color:'Green'}}>Delivered</p>:<p style={{color:"red"}}>Canceled</p>}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
 
export default OrderDashboard;
