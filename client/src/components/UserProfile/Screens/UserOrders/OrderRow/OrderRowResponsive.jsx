//react imports
import React, { useState, useEffect } from "react";
//Components 
import OrderDetails from './OrderDetails/OrderDetails'
// Material UI imports
import { Typography, Box, TableRow, TableCell, IconButton, Collapse } from "@material-ui/core";
import useStyles from "./styles";
//Custom functions
import { capitalize } from '../../../../../assets/utils/stringFunctions'
//axios
import axios from 'axios'

export default function OrderRowResponsive({ order, openOrder, setOpenOrder }) {

    const classes = useStyles();

    async function handleOrderClick(e) {
        console.log('lets put a modal here')
    }

    return (
        <React.Fragment>
            <TableRow key={order.name} hover onClick={e => handleOrderClick(e)} className={classes.row}>
                <TableCell align="center">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            className={classes.orderNumber}
                            display="inline"
                            color="initial"
                        >
                            {order.id}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <Typography>
                        {capitalize(order.status)}
                    </Typography>
                </TableCell>
                <TableCell align="center">${order.total}</TableCell>
            </TableRow>
        </React.Fragment>
    )
}