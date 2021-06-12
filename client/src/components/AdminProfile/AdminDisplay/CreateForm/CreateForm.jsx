import React, { useState } from 'react';

//Imports Material UI components:
import { Box, CardContent, Tab, Tabs, TextField, InputAdornment, Button, FormControl,InputLabel, Select, MenuItem }from '@material-ui/core'
import useStyles from './styles';

export default function CreateForm() {

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.root}>

            <Tabs className= {classes.tabs} value={selectedTab} onChange={handleChange} >
                <Tab label="Create Product"  />
                <Tab label="Create Category"  />
            </Tabs>
            {selectedTab === 0 && 
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField className= {classes.input} id="outlined-number" label="Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>

                    <TextField className= {classes.input} id="outlined-number" label="Stock" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>
                    <TextField className= {classes.input} id="outlined-basic" label="Description" variant="outlined" multiline />

                <FormControl className= {classes.input} variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Categories</InputLabel>
                    <Select
                    labelId="demo-simple -select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={'categories'}
                    label="Categories"
                    >
                    <MenuItem value="" >
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                    <Button className = {classes.button}>Create</Button>
                </form>
            </CardContent>
            }

            {selectedTab === 1 && 
            <CardContent className={classes.tabContainer}>
                <form className= {classes.form}>
                    <TextField className= {classes.input} id="outlined-basic" label="Name" variant="outlined" />
                    <Button className = {classes.button}>Create</Button>
                </form>
            </CardContent>
            }
    
        </Box>
    )
}
