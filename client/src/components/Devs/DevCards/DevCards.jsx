import React, { useState } from 'react';
import useStyles from './styles';
import clsx from 'clsx';
import { Link, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core/';
import { ExpandMore } from '@material-ui/icons/';

export default function DevCards(props) {
    const {flag, title, devs} = props.props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="lav" className={classes.avatar}>
                            {title[0]}
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
                    <Typography paragraph>Developers from {title}:</Typography>
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
                        {devs && devs.map(dev =>
                         
                            <Typography paragraph>
                                <Link color='inherit' onClick={() => window.open(dev.linkedinURL)}>
                                {dev.name}
                                 </Link>
                            </Typography>
                       
                        )}
                    </CardContent>
                </Collapse>
            </Card>
    );
}



