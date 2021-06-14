import { useSelector, useDispatch } from "react-redux";
import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getProductsByCategory, updateSorting } from '../../../actions/home/home_actions';

export default function SortSelect() {

    const { category, page, searched, filter, order } = useSelector((state) => ({ ...state.homeReducer }))

    const classes = useStyles();
    const dispatch = useDispatch();


    const handleSortChange = event => {
        let filter = event.target.value.split(',')[0];
        let order = event.target.value.split(',')[1];
        dispatch(getProductsByCategory({name: searched, category, filter, order, page}))
        dispatch(updateSorting(filter, order))
      };

    return (
        <FormControl variant='outlined' fullWidth className={classes.sortForm}>
            <InputLabel className={classes.select} id='sortLabel'>Sort by...</InputLabel>
            <Select
                labelId='sortLabel'
                className={classes.select}
                onChange={handleSortChange}
                label='Sort by...'
                value={`${filter},${order}`}
            >
                <MenuItem value={'name,ASC'}>A-Z</MenuItem>
                <MenuItem value={'name,DESC'}>Z-A</MenuItem>
                <MenuItem value={'price,DESC'}>Highest price</MenuItem>
                <MenuItem value={'price,ASC'}>Lowest price</MenuItem>
            </Select>
        </FormControl>
    );
}

const useStyles = makeStyles((theme) => ({
    
    sortForm: {
      margin: theme.spacing(1),
      marginTop: '0px',
      width: '200px'
    },
    select: {
      fontSize: '12px',
    }
  }));