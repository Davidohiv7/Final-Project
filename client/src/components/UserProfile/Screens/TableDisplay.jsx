//react imports
import React from "react";

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
    TextField,
    IconButton,
} from "@material-ui/core";
import useStyles from "./../styles";
import { Delete } from "@material-ui/icons";

export default function TableDisplay() {
    const classes = useStyles();

    //This is the data from the backend harcoded
    const userOrders = [
        {
            name: "order024",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            quantity: "20",
        },
        {
            name: "order025",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            quantity: "30",
        },
        {
            name: "order026",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            quantity: "30",
        },
    ];

    return (
    <TableContainer
        component={Paper}
        className={classes.tableContainer}
    >
        <Table aria-label="customized table">
            <TableHead className={classes.head}>
                <TableRow>
                    <TableCell className={classes.title}>Product</TableCell>
                    <TableCell align="center" className={classes.title}>
                        Quantity
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                        Unit price
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                        Total price
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                        Delete
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {userOrders &&
                    userOrders.map((order) => (
                        <TableRow key={order.name}>
                            <TableCell align="center">
                                <Box
                                    display="flex"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Avatar src={order.Images} />
                                    <Typography
                                        className={classes.productName}
                                        display="inline"
                                        variant="h6"
                                        color="initial"
                                    >
                                        {order.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    size="small"
                                    value={order.quantity}
                                    className={classes.quantityInput}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            max: 99,
                                            min: 1,
                                        },
                                    }}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="center">${order.price} EA</TableCell>
                            <TableCell align="center">
                                ${(order.price * order.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    aria-label="delete"
                                    onClick={(e) => console.log("hola")}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}