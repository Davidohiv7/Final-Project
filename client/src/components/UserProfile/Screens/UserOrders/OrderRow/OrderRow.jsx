//react imports
import React, { useState, useEffect }from "react";
//Components 
import OrderDetails from './OrderDetails/OrderDetails'
// Material UI imports
import {Typography, Box, TableRow, TableCell, IconButton, Collapse } from "@material-ui/core";
//Material UI icons
import { KeyboardArrowUp, KeyboardArrowDown} from '@material-ui/icons';
import useStyles from "./styles";
//Custom functions
import { capitalize } from '../../../../../assets/utils/stringFunctions'
//axios
import axios from 'axios'

export default function OrderRow( { order, openOrder, setOpenOrder }) {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);

    async function handleOrderClick(e) {
        if(!open) {
            const jwt = localStorage.getItem('jwt')
            const response = await axios.post("http://localhost:3001/orders/products", { order }, { headers: { 'Authorization': jwt }} )
            const orderDetailedData = response.data.data.orderData
            setOpenOrder(order.id)
            orderDetailedData && setProductsData(orderDetailedData)
        }
        setOpen(!open)
    }
    /* eslint-disable */
    useEffect(() => {
        if(openOrder !== order.id) {
            setOpen(false)
        }
      }, [openOrder])
    /* eslint-enable */
    return (

        <React.Fragment>
            <TableRow key={order.name} hover onClick={e => handleOrderClick(e)} className={classes.row}>
                <TableCell className={classes.keyIconCell}>
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
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
                            {`Order #${order.id}`}
                        </Typography>
                    </Box>
                </TableCell>
                <TableCell align="center">
                    <Typography>
                        {capitalize(order.status)}
                    </Typography>
                </TableCell>
                <TableCell align="center">{order.updatedAt.split('T')[0]}</TableCell>
                <TableCell align="center">${order.total} EA</TableCell>
            </TableRow>

            <TableRow>
                <TableCell className={classes.collapseTableCell} colSpan={6}>
                    <Collapse in={open && (openOrder === order.id)} timeout="auto" unmountOnExit>
                        <OrderDetails order={order} productsData={productsData} setProductsData={setProductsData}/>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>  
    )
}