import React from 'react';
import useStyles from './DevCards/styles';
//import clsx from 'clsx';
import { Grid, Typography } from '@material-ui/core/';
//import { ExpandMore } from '@material-ui/icons/';
//import argflag from './../../assets/img/ArgFlag.png'
import DevCards from './DevCards/DevCards'

export default function Devs() {
    const classes = useStyles();
    const devs = [{
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    }]
    //const [expanded, setExpanded] = React.useState(false);

    /*
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };*/

    return (
        <Grid container spacing={1} className={classes.gridContainer} >
            {
                devs ?
                    devs.map(dev => {
                        return (
                            <Typography>Hello</Typography>
                            /*
                            <Grid key={dev.id} item>
                                <DevCards className={classes.devsCard} title="title" devs={} />
                            </Grid>*/
                        )
                    }) :
                    <Grid>
                        <Typography variant="h5" color="primary">No Devs availables</Typography>
                    </Grid>
            }
        </Grid>

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

