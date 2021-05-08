import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {
  TableContainer,
  Grid,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";
import { Collapse, IconButton } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteCateogry } from "../../store/action/categoryAction";
import { setNotificationDisplay } from "../../store/action/notificationAction";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CategoryDelete() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { category_list } = useSelector((state) => state.categoryStore);
  const notification = useSelector((state) => state.notificationStore);
  const [open, setOpen] = React.useState(false);
  const [currentCategory, setCurrntCategory] = useState("");

  const handleClickOpen = (category_id) => {
    setOpen(true);
    setCurrntCategory(category_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteCategory = () => {
    dispatch(deleteCateogry(currentCategory));
    setOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(setNotificationDisplay());
    };
  }, []);
  const setDisplay = () => {
    dispatch(setNotificationDisplay());
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={8}>
        <Collapse in={notification.display}>
          <Alert
            severity="error"
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
                <TableCell>Name</TableCell>

                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category_list.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleClickOpen(row._id)}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {" Delete Category"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete this Category?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Close
                        </Button>
                        <Button
                          onClick={deleteCategory}
                          color="secondary"
                          autoFocus
                        >
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
