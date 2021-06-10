import { MenuItem, InputLabel, FormControl, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function SortSelect({ handleChange, value }) {
    const classes = useStyles();

    return (
        <FormControl variant='outlined' fullWidth className={classes.sortForm}>
            <InputLabel className={classes.select} id='sortLabel'>Ordenar por...</InputLabel>
            <Select
                labelId='sortLabel'
                className={classes.select}
                value={value}
                onChange={handleChange}
                label='Ordenar por...'
            >
                <MenuItem value={''}>-</MenuItem>
                <MenuItem value={'0'}>A-Z</MenuItem>
                <MenuItem value={'1'}>Mayor Precio</MenuItem>
                <MenuItem value={'2'}>Menor Precio</MenuItem>
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