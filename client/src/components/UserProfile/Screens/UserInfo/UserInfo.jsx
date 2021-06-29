import React, { useState, useEffect } from "react";
// Material UI imports
import { Typography, Box, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import useStyles from "./styles";
//Components
import UserAddresses from './UserAddresses/UserAddresses'
import AddAddress from './UserAddresses/AddAddress/AddAddress'
//axios
import axios from 'axios'

export default function UserInfo({ user }) {

    const classes = useStyles();

    const [userAddresses, setUserAddresses] = useState([]);
    const [addressModalState, setAddressModalState] = useState(false);

    useEffect(() => {
        const getUserAddresses = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.get("http://localhost:3001/shippingaddress/", { headers: { 'Authorization': jwt }} )
                const userAddresses = response.data.data.userAddresses
                return setUserAddresses(userAddresses)
            } catch (error) {
                console.log(error)
            }
        }
        getUserAddresses()
    }, [])

    function handleAddAddress(e) {
        setAddressModalState(true)
    }

    return (
        <Box p={{ xs: 0, sm: 2 }} boxShadow={4} display='flex' alignItems='center' justifyContent='center' flexDirection='column' className={classes.container}>
            <Box width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column' p={{ xs: 0, sm: 4 }}>
                <Typography className={classes.name} variant="h3">{`${user?.name} ${user?.lastName}`}</Typography>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' >
                    <Typography className={classes.title} variant="h6">email:</Typography>
                    <Typography className={classes.titleContent} variant="h6" color="initial">{`${user?.email}`}</Typography>
                </Box>
                <Typography className={classes.title} variant="h6">Saved addresses:</Typography>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                    {
                        userAddresses.length > 0 ?
                        <UserAddresses addresses={userAddresses} setUserAddresses={setUserAddresses}/>:
                        <Typography variant="body1" color="initial"> Click in the button to add default addresses to your account</Typography>
                    }
                </Box>
                <Button
                    className={classes.addAddresButton}
                    variant="contained"
                    color="primary"
                    onClick={e => handleAddAddress(e)}
                >
                    add address
                </Button>
            </Box>
            <Modal
                className={classes.modal}
                open={addressModalState}
                onClose={() => setAddressModalState(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addressModalState}>
                    <AddAddress setUserAddresses={setUserAddresses} setAddressModalState={setAddressModalState}/>
                </Fade>
            </Modal> 
        </Box>
    );
}