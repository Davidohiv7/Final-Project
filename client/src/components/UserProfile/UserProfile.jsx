import React from "react";

// Material UI imports
import {
  Grid,
  Paper,
  Container,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
} from "@material-ui/core";
import useStyles from "./styles";
import { Delete } from "@material-ui/icons";
export default function Home() {
  const classes = useStyles();
  const userOrders = [
    {
      name: "order024",
      Images:
        "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
      quantity: "20",
    },
    {
      name: "order025",
      Images:
        "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
      quantity: "30",
    },
    {
      name: "order026",
      Images:
        "http://1.bp.blogspot.com/_TkpyopjpTII/TE-HiYKSpaI/AAAAAAAAAA8/DHEzm31ueFo/s1600/verduras1.jpg",
      quantity: "30",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={2} className={classes.filterGrid}>
          <CardContent align="center">
            <Typography
              align="center"
              variant="h5"
              color="secondary"
              display="inline"
            >
              Username
            </Typography>
            <Avatar className={classes.profilePic}></Avatar>
            <Button className={classes.button}> Order History </Button>
            <Button className={classes.button}> Account Configuration</Button>
            <Box className={classes.BoxLogOut}>
              <Button className={classes.button}> Log Out </Button>
            </Box>
          </CardContent>
        </Grid>
        <Grid className={classes.Screen} item xs={9}>
          <Box>
            <TableContainer
              component={Paper}
              className={classes.tableContainer}
            >
              <Table aria-label="customized table">
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.title}>Product</TableCell>
                    <TableCell align="center" className={classes.title}>
                      Quantity
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                      Unit price
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                      Total price
                    </TableCell>
                    <TableCell align="center" className={classes.title}>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders &&
                    userOrders.map((order) => (
                      <TableRow key={order.name}>
                        <TableCell align="center">
                          <Box
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <Avatar src={order.Images} />
                            <Typography
                              className={classes.productName}
                              display="inline"
                              variant="h6"
                              color="initial"
                            >
                              {order.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            size="small"
                            value={order.quantity}
                            className={classes.quantityInput}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              inputProps: {
                                max: 99,
                                min: 1,
                              },
                            }}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">${order.price} EA</TableCell>
                        <TableCell align="center">
                          ${(order.price * order.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            variant="contained"
                            color="primary"
                            aria-label="delete"
                            onClick={(e) => console.log("hola")}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
