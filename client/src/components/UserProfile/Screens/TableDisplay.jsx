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
} from "@material-ui/core";
import useStyles from "./../styles";

export default function TableDisplay() {
    const classes = useStyles();

    //This is the data from the backend harcoded
    const userOrders = [
        {
            name: "order024",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            status: "On route",
            total: '320',
        },
        {
            name: "order025",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            status: "Delivered",
            total: '340',
        },
        {
            name: "order026",
            Images:
                "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
            status: "Delivered",
            total: '200',
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
                        Status
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                        Total spend
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
                                <Typography>
                                    {order.status}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">${order.total} EA</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}