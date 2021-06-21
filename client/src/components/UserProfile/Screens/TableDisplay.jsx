//react imports
import React, { useEffect }from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Material UI imports
import {
    Paper,
    Typography,
    Avatar,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@material-ui/core";
//Material UI icons
import { Home } from '@material-ui/icons/';
import useStyles from "./../styles";

export default function TableDisplay() {

    const { orders } = useSelector((state) => ({ ...state.authenticationReducer }))
    let history = useHistory();

    const classes = useStyles();

    //This is the data from the backend harcoded
    // const userOrders = [
    //     {
    //         name: "order024",
    //         Images:
    //             "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
    //         status: "On route",
    //         total: '320',
    //     },
    //     {
    //         name: "order025",
    //         Images:
    //             "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
    //         status: "Delivered",
    //         total: '340',
    //     },
    //     {
    //         name: "order026",
    //         Images:
    //             "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
    //         status: "Delivered",
    //         total: '200',
    //     },
    // ];

    return (
        <Box>
            {
                orders && orders.length > 0 ?
                <TableContainer
                    component={Paper}
                    className={classes.tableContainer}
                >
                    <Table aria-label="customized table">
                        <TableHead className={classes.head}>
                            <TableRow>
                                <TableCell className={classes.title}>Product</TableCell>
                                <TableCell align="center" className={classes.title}>
                                    Status
                                </TableCell>
                                <TableCell align="center" className={classes.title}>
                                    Total spend
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                orders &&
                                orders.map((order) => (
                                    <TableRow key={order.name}>
                                        <TableCell align="center">
                                            <Box
                                                display="flex"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                            >
                                                <Avatar/>
                                                <Typography
                                                    className={classes.productName}
                                                    display="inline"
                                                    variant="h6"
                                                    color="initial"
                                                >
                                                    {`Order #${order.id}`}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography>
                                                {order.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">${order.total} EA</TableCell>
                                    </TableRow>
                                ))
                            }
                                
                        </TableBody>
                    </Table>
                </TableContainer>
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