import { Button, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as api from "../api/index";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Buy = () => {
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const ID = params.id;
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const [user, setUser] = useState();

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

  const fetchingData = async (mounted) => {
    try {
      if (ID) {
        const { data } = await api.getSingleProduct(ID);

        if (mounted) {
          setProduct(data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchingData(mounted);

    if (localStorage.getItem("profile"))
      setUser(JSON.parse(localStorage.getItem("profile")));
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const orderPlace = async () => {
    if (user?.result) {
      const notify = () =>
        toast.success("order place successfully", {
          autoClose: 2000,
        });

      notify();
    } else {
      const notify = () =>
        toast.warn(" You need to login!", {
          autoClose: 2000,
        });
      notify();
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        {" "}
        {product.title}{" "}
      </Typography>
      <img src={product.image} alt="productimg" />
      <Typography variant="h6"> {product.description} </Typography>
      <Button>${product.price}</Button>
      <Button
        onClick={() => orderPlace()}
        variant="contained"
        style={{ background: "green", fontWeight: "bold" }}
      >
        {" "}
        Place Order{" "}
      </Button>
      <Button
        onClick={() => addToCart(product)}
        variant="contained"
        color="primary"
      >
        Add to cart
      </Button>
      <ToastContainer />
    </Container>
  );
};

export default Buy;
