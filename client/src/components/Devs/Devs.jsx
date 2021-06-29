import React from 'react';
import useStyles from './styles';
//import clsx from 'clsx';
import { Grid, Typography, Box } from '@material-ui/core/';
//import { ExpandMore } from '@material-ui/icons/';
//import argflag from './../../assets/img/ArgFlag.png'
import DevCards from './DevCards/DevCards'
import devs from './../../assets/utils/devsData'

export default function Devs() {
    const classes = useStyles();

    return (
        <Box bgcolor='secondary.main' className={classes.root}>
            <Grid container spacing={5} className={classes.gridContainer}>
                {
                    devs ?
                        devs.map(dev => {
                            return (
                                <Grid key={dev.id} item xs={12} sm={(12/devs.length)} className={classes.devsCard}>
                                    <DevCards props={dev.data}/>
                                </Grid>
                            )
                        }) :
                        <Grid item>
                            <Typography variant="h5" color="primary">No Devs availables</Typography>
                        </Grid>
                }
            </Grid>
        </Box>

        /*
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        A
                    </Avatar>
                }
                title="Argentina"
            />
            <CardMedia
                className={classes.media}
                image={argflag}
                title="Argentina"
            />
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Devs:</Typography>
                    <Typography paragraph>
                        Baeza Mariano
                    </Typography>
                    <Typography paragraph>
                        Basili Pablo    
                    </Typography>
                    <Typography paragraph>
                        León Federico
                    </Typography>
                    <Typography paragraph>
                        Nuñez Nicolas
                    </Typography>
                    <Typography paragraph>
                        Radicella Theo
                    </Typography>
                    <Typography paragraph>
                        Rosales Federico
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        */
    );
}

