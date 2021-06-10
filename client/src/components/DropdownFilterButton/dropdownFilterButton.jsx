
// React/Redux imports
import React, { useState, useRef, useEffect } from 'react';

// Material UI imports
import {
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Button,
    Popper,
    Grow
} from '@material-ui/core';
import useStyles from './styles';

export default function FilterButton(props) {
    let classes = useStyles();

    const { arrayCategories, other } = props.props;

    //set the local state for open and close the menu
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    //Functions to handle the clicks
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <div>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.button}
            >
                {props.title}
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {arrayCategories ? 
                                        arrayCategories.map(category => <MenuItem onClick={(e) => {other(category); handleClose(e)}}>{category}</MenuItem>) :
                                        null
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
