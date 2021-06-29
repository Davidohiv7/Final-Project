//react imports
import React, { useState, useEffect } from "react";
//Components 
import OrderDetails from './OrderDetails/OrderDetails'
import ModalReviewResponsive from './ModalReviewResponsive/ModalReviewResponsive'
// Material UI imports
import { Typography, Box, TableRow, TableCell, IconButton, Collapse } from "@material-ui/core";
import useStyles from "./styles";
//Custom functions
import { capitalize } from '../../../../../assets/utils/stringFunctions'
//axios
import axios from 'axios'

export default function OrderRowResponsive({ order }) {
    const classes = useStyles();

    const [productsData, setProductsData] = useState([]);
    const [open, setOpen] = useState(false);

    async function handleOrderClick(e) {
        const jwt = localStorage.getItem('jwt');
        const response = await axios.post("http://localhost:3001/orders/products", { order }, { headers: { 'Authorization': jwt } })
        const orderDetailedData = response.data.data.orderData;
        orderDetailedData && setProductsData(orderDetailedData);
        //console.log(orderDetailedData)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

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
            <ModalReviewResponsive order={order} productsData={productsData} open={open} onClose={() => handleClose()} setProductsData={setProductsData}/>
        </React.Fragment>
    )
}