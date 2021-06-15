//react imports
import React from "react";

// Material UI imports
import {
    Grid,
    Typography,
    Avatar,
    Button,
} from "@material-ui/core";
import useStyles from "./../styles";

export default function UserInfo({ user }) {
    const classes = useStyles();

    //User harcoded
    // const user = {
    //     name: 'Pablo Argüello',
    //     eMail: 'pablo@pablo.com',
    //     phoneN: '351-772-1323',
    //     city: 'Hobart',
    //     profilePic: 'https://lh3.googleusercontent.com/proxy/g57VziW_c_KuOhMXWFhal5EPV60l1Swy4HrZjTact49EPWj6p6z1Q-houCg3oKpxmWs15plTRC0_vWMeJfW9RbBp6Oy8cutgiu_pZa1T'
    // }

    return (
        <Grid container spacing={3} className={classes.profile}>
            <Grid item xs={12} className={classes.section}>
                <Avatar className={classes.profilePic} src={user.profilePic} href='Profile Picture' />
            </Grid>
            <Grid item xs={12} className={classes.section}>
                <Typography variant="h3">{`${user.name} ${user.lastName}`}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.section}>E-Mail: {user.email}</Grid>
            <Grid item xs={6} className={classes.section}>Phone Number: {user.phone ? user.phone : 'No phone registered'}</Grid>
            <Grid item xs={6} className={classes.section}>Adress: {user.city ? user.city : 'No address registered'}</Grid>
            <Grid item xs={12} className={classes.section}>
                <Button className={classes.button}>Change Information</Button>
            </Grid>
        </Grid>
    );
}