import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//Imports Material UI components:
import { TableCell, TableRow, Button, Modal, Fade, Backdrop  }from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
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
            <img width='50px' src={favorite.Images[0].url} alt={favorite.name}></img>
          </TableCell>
          <TableCell align= 'left' onClick={() => setModalState(true)} className={classes.openDetails}>{favorite.name}</TableCell>
          <TableCell align= 'right'>
            <Button onClick={() => deleteHandler(favorite.id, user.email)}>
              <ClearIcon/>
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