import { useDispatch, useSelector } from "react-redux";
import { Box, Button }from '@material-ui/core';
import { Home } from '@material-ui/icons'
import useStyles from './styles'

import { getProductsByCategory, getAllProducts, updateCategory, updateSearching } from '../../actions/home/home_actions'

export default function HomeLeftBar() {

    const { searched, order, filter, categories } = useSelector((state) => ({ ...state.homeReducer }))

    const classes = useStyles();  
    const dispatch = useDispatch();

    function handleGetAllClick() {
        dispatch(getAllProducts())
        dispatch(updateCategory(''))
        dispatch(updateSearching(''))
    }

    function handleClick(category) {
        dispatch(getProductsByCategory({name: searched, category, order, filter}))
        dispatch(updateCategory(category))
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-start' className={classes.filter} elevation={3}>
            <Button
                color="secondary"
                className={classes.button}
                startIcon={<Home/>}
                onClick={() => handleGetAllClick()}
            >
                get all
            </Button>
            {/* <Link href="/" className={classes.links}><HomeIcon /></Link> */}
            {categories ? 
            categories.map(category => 
            <Button size='small' color="secondary" onClick={() => handleClick(category)}>{category}</Button>) :
            <p>No Such Category</p>}
        </Box>
    );
}

