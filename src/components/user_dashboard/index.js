import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {getUserList} from '../../store/action/userAction';
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

const UserDashboard = () => {
    const dispatch=useDispatch();
    const {userList}=useSelector((state)=>state.userStore)
    const classes = useStyles();
    useEffect(()=>{
        dispatch(getUserList());
    },[])
    

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>userId</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Role</TableCell>
  
            </TableRow>
            </TableHead>
            <TableBody>
            {userList.map((row) => (
                <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                        {row._id}
                    </TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">
                             {row.role}
                    </TableCell>
               
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
 
export default UserDashboard;
