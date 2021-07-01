import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//Imports Material UI components:
import { TableCell, TableRow, Button, Modal, Fade, Backdrop, Avatar  }from '@material-ui/core'
import { Delete } from '@material-ui/icons';
import useStyles from './styles';
//components
import ProductDetailsCard from '../../../../ProductDetailsCard/ProductDetailsCard';
//actions
import { deleteFavorite } from '../../../../../actions/favorites/favorites_actions';
//custom function
import { createArrayFromNumber } from '../../../../../assets/utils/productCardFunctions'

export default function Items({ favorite, user }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [scoreArray, setScoreArray] = useState([]);
    const [modalState, setModalState] = useState(false);

    useEffect(() => {
        const newScoreArray = createArrayFromNumber(favorite.score)
        setScoreArray(newScoreArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
      
    function deleteHandler(productId, userEmail) {
        dispatch(deleteFavorite(productId, userEmail));
    }

    return (
        <TableRow key={favorite.name}>
          <TableCell padding= '0' className={classes.openDetails} onClick={() => setModalState(true)}>
            <Avatar src={favorite.Images[0].url} className={classes.image}/>
          </TableCell>
          <TableCell align= 'left' onClick={() => setModalState(true)} className={classes.openDetails}>{favorite.name}</TableCell>
          <TableCell align= 'right'>
            <Button color='primary' aria-label="delete" onClick={() => deleteHandler(favorite.id, user.email)}>
              <Delete/>
            </Button>
          </TableCell>
          <Modal
            aria-labelledby="Product details"
            aria-describedby="Product details"
            className={classes.modal}
            open={modalState}
            onClose={() => setModalState(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modalState}>
                <ProductDetailsCard scoreArray={scoreArray} product={favorite} setModalState={setModalState}></ProductDetailsCard>
            </Fade>
        </Modal>
        </TableRow>
      )
          
}