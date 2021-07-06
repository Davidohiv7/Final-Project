import React from "react";
// Material UI imports
import { Box, TableContainer, Table, TableHead, TableBody, TableCell, Paper, TableRow, IconButton } from "@material-ui/core";
//
import { Delete } from '@material-ui/icons';
//Styles
import useStyles from "./styles";
//axios
import axios from 'axios'

export default function UserAddresses( { addresses, setUserAddresses } ) {

    const apiURL = process.env.REACT_APP_API_URL

    const classes = useStyles();

    async function handleDelete(address) {
        const jwt = localStorage.getItem('jwt')
        try {
            const response = await axios.put(apiURL + "/shippingaddress/delete", { address }, { headers: { 'Authorization': jwt }} )
            const userAddresses = response.data.data.userAddresses
            return setUserAddresses(userAddresses)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column' p={1}>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table size="small">
                    <TableHead className={classes.addressTableHead}>
                        <TableCell align="center" className={classes.title} width="35%">
                            Address
                        </TableCell>
                        <TableCell align="center" className={classes.title} width="20%">
                            Neighborhood
                        </TableCell>
                        <TableCell align="center" className={classes.title} width="20%">
                            City
                        </TableCell>
                        <TableCell align="center" className={classes.title} width="15%">
                            Postal Code
                        </TableCell>
                        <TableCell width="10%"/>
                    </TableHead>
                    <TableBody>
                        {
                            addresses.map( address => {
                                return (
                                <TableRow key={address.zip} className={classes.row}>
                                    
                                    <TableCell align="center">
                                        {address.street}
                                    </TableCell>
                                    <TableCell align="center">
                                        {address.neighborhood}
                                    </TableCell>
                                    <TableCell align="center">
                                        {address.city}
                                    </TableCell>
                                    <TableCell align="center">
                                        {address.zip}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small" color='primary' onClick={() => handleDelete(address)}>
                                            <Delete /> 
                                        </IconButton>
                                    </TableCell>
                                </TableRow> 
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            {/*This displays only in mobile*/}
            <TableContainer className={classes.tableContainerResponsive} component={Paper}>
                <Table size="small">
                    <TableHead className={classes.addressTableHead}>
                        <TableCell align="center" className={classes.title} width="35%">
                            Address
                        </TableCell>
                        <TableCell align="center" className={classes.title} width="20%">
                            City
                        </TableCell>
                        <TableCell width="10%" />
                    </TableHead>
                    <TableBody>
                        {
                            addresses.map(address => {
                                return (
                                    <TableRow key={address.zip} className={classes.row}>

                                        <TableCell align="center">
                                            {address.street}
                                        </TableCell>
                                        <TableCell align="center">
                                            {address.city}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton size="small" color='primary' onClick={() => handleDelete(address)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {/*This displays only in mobile*/}
        </Box>
    );
}