import React, { useState, useEffect } from "react";
// Material UI imports
import { Typography, Box, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import useStyles from "./styles";
//Components
import UserAddresses from './UserAddresses/UserAddresses'
import AddAddress from './UserAddresses/AddAddress/AddAddress'
import ChangePassword from './UserAddresses/ChangePassword/ChangePassword'
//axios
import axios from 'axios'

export default function UserInfo({ user }) {

    const classes = useStyles();

    const [modalState, setModalState] = useState(false);
    const [modalType, setModalType] = useState('');
    const [userAddresses, setUserAddresses] = useState([]);
    

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

    

    function handleOpenModal(type) {
        setModalType(type)
        setModalState(true)
    }

    function handleCloseModal() {
        setModalState(false)
        setModalType('')
    }

    function setModalComponent() {
        if(modalType === 'address') return <AddAddress setUserAddresses={setUserAddresses} handleCloseModal={handleCloseModal}/>
        if(modalType === 'password') return <ChangePassword handleCloseModal={handleCloseModal}/>
        return <Box/>
    }

    return (
        <Box p={2} boxShadow={4} display='flex' alignItems='center' justifyContent='center' flexDirection='column' className={classes.container}>
            <Box width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column' p={4}>
                <Typography className={classes.name} variant="h3">{`${user?.name} ${user?.lastName}`}</Typography>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' >
                    <Typography className={classes.title} variant="h6">email:</Typography>
                    <Typography className={classes.titleContent} variant="h6" color="initial">{`${user?.email}`}</Typography>
                </Box>
                <Button
                    className={classes.changePassword}
                    variant="contained"
                    color="primary"
                    onClick={e => handleOpenModal('password')}
                >
                    change password
                </Button>
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
                    onClick={() => handleOpenModal('address')}
                >
                    add address
                </Button>
            </Box>
            {/* Add address modal */}
            <Modal
                className={classes.modal}
                open={modalState}
                onClose={() => handleCloseModal()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalState}>
                    {setModalComponent() || <Typography> Close </Typography>}
                </Fade>
            </Modal> 
        </Box>
    );
}