import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
//Imports Material UI components:
import Box from '@material-ui/core/Box'
import CardContent from '@material-ui/core/CardContent'
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography'

export default function ProductDetailsTab({ product }) {

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box className={classes.root} width='100%'>

            <Tabs value={selectedTab} onChange={handleChange} >
                <Tab label="Description"  />
                <Tab label="Reviews"  />
            </Tabs>
            {selectedTab === 0 && <CardContent className={classes.tabContainer}>
                <Typography className={classes.tabsTypography}>{product.description}</Typography>
            </CardContent>
            }

            {selectedTab === 1 && <CardContent className={classes.tabContainer}>
                <Typography className={classes.tabsTypography}>Ladsffasdfasfast consectetur adipiscing, elit interdum congue aptent nulla mus nullam, convallis in luctus taciti curae. Turpis nostra aliquam ut fringilla fusce non enim nullam.</Typography>
            </CardContent>
            }
    
        </Box>   
    )
}


//Custom styles
const useStyles = makeStyles((theme) => ({
    root: {
    },
    tabContainer: {
        height: 180,
    },
    tabsTypography: {
        fontSize: 16,
        fontStyle: "italic"
    }
    }));