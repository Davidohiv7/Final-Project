//react imports
import React, { useState }from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Components
import OrderRow from './OrderRow/OrderRow'
// Material UI imports
import {Paper, Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell,
    TableBody, Button } from "@material-ui/core";
//Material UI icons
import { Home } from '@material-ui/icons/';
import useStyles from "./styles";


export default function UserOrders() {

    const { orders } = useSelector((state) => ({ ...state.authenticationReducer }))
    let history = useHistory();

    const [openOrder, setOpenOrder] = useState(false);

    const classes = useStyles();

    return (
        <Box className={classes.container} p={2} boxShadow={4}>
            <Box my={2}>
                <Typography variant="h3" color="initial">Orders history: </Typography>
            </Box>
            {   
                orders && orders.length > 0 ?
                <Box>
                    <TableContainer
                        component={Paper}
                        className={classes.tableContainer}
                    >
                        <Table>
                            <TableHead className={classes.head}>
                                <TableRow className={classes.headRow}>
                                    <TableCell />
                                    <TableCell align="center" className={classes.title}>
                                        Order number
                                    </TableCell>
                                    <TableCell align="center" className={classes.title}>
                                        Status
                                    </TableCell>
                                    <TableCell align="center" className={classes.title}>
                                        Last update
                                    </TableCell>
                                    <TableCell align="center" className={classes.title}>
                                        Order total
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders && orders.map(order => <OrderRow order={order} openOrder={openOrder} setOpenOrder={setOpenOrder}/>)
                                }   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                :
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Typography variant="h3" color="initial"> You don't have any order, check our catalogue and buy amazing products</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Home />}
                        className={classes.homeButton}
                        onClick={e => history.push("/")}
                    >
                        home
                    </Button>
                </Box>
            }
            
        </Box>
    );
}