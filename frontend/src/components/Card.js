import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  Container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    margin: "3rem 0",
  },
}));

export default function MediaCard({ allProduct }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const product = allProduct;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("profile"))
      setUser(JSON.parse(localStorage.getItem("profile")));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (product) => {
    if (user?.result) {
      const cartArr = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];
      let alreadyInCart = false;
      cartArr.forEach((item) => {
        if (item._id === product._id) {
          alreadyInCart = true;
        }
        return;
      });
      if (!alreadyInCart) {
        cartArr.push({ ...product, count: 1 });
        dispatch({ type: "ADDCART" });
        const notify = () =>
        toast.success(" Product added!", {
          autoClose: 2000,
        });
      notify();
      }

      let cartItems = [...cartArr];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      const notify = () =>
        toast.warn(" You need to login!", {
          autoClose: 2000,
        });
      notify();
    }
  };

  return (
    <Container className={classes.Container}>
      {product.map((prod) => {
        const ID = prod._id;
        return (
          <Card
            className={classes.root}
            key={prod._id}
         
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={prod.image}
                title={prod.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  ${prod.price}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {prod.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {prod.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => addToCart(prod)}
              >
                Add to cart
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/buy/${ID}`, { replace: "true" })}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <ToastContainer />
    </Container>
  );
}
