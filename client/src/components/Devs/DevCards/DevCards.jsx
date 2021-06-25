import React from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core/';
import { ExpandMore } from '@material-ui/icons/';

export default function DevCards(title, flag, devs) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="lav" className={classes.avatar}>
                        -
                    </Avatar>
                }
                title={title}
            />
            <CardMedia
                className={classes.media}
                image={flag}
                title="country flag"
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
                    {devs && devs.map(dev => 
                        <Typography paragraph>
                            {dev.name}
                        </Typography>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}



