import React, { useState } from "react";
import formatCurrency from "../util";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  carthHeader: {
    fontWeight: "bold",
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

const Cart = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // cart remove function

  const removeFromCart = (cart) => {
    setCartItems(cartItems.filter((item) => item._id !== cart._id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item._id !== cart._id))
    );
    dispatch({ type: "REMOVECART" });
  };

  // addOne removeOne

  const addOne = (cartItem) => {
    const addArr = cartItems;
    addArr.forEach((item) => {
      if (item._id === cartItem._id) {
        item.count++;
      }
    });

    setCartItems([...addArr]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeOne = (cartItem) => {
    const minusArr = cartItems;
    minusArr.forEach((item) => {
      if (item._id === cartItem._id) {
        if (cartItem.count === 1) {
          item.count = 1;
        } else {
          item.count--;
        }
      }
    });

    setCartItems([...minusArr]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const orderPlace = () => {
    const notify = () =>
      toast.success("order place successfully", {
        autoClose: 2000,
      });

    notify();
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <Typography
          className={classes.carthHeader}
          variant="h6"
          style={{ textAlign: "center", width: "100%" }}
        >
          Cart Is Empty
        </Typography>
      ) : (
        <Typography
          className={classes.carthHeader}
          variant="h6"
          style={{ textAlign: "center", width: "100%" }}
        >
          You Have {cartItems.length} Items In Your Cart
        </Typography>
      )}
      <Container maxWidth="lg" className={classes.Container}>
        <div>
          <div className="cart">
            {cartItems.map((product) => {
              const { _id, image, title, price, count } = product;
              return (
                <div key={_id} className={classes.Container}>
                  <div>
                    <img src={image} alt={title} />
                  </div>
                  <div
                    className={classes.Container}
                    style={{ flexDirection: "column" }}
                  >
                    <Button
                      onClick={() => addOne(product)}
                      variant="contained"
                      color="primary"
                      style={{ fontWeight: "bold" }}
                    >
                      <GrAddCircle />
                    </Button>

                    <Button
                      onClick={() => removeOne(product)}
                      variant="contained"
                      color="primary"
                      style={{ fontWeight: "bold" }}
                    >
                      <AiOutlineMinusCircle />
                    </Button>
                  </div>
                  <div>
                    <h5>{title}</h5>
                    <h3>
                      {" "}
                      {formatCurrency(price)} x {count} {"  "}{" "}
                    </h3>
                    <Button
                      variant="contained"
                      style={{ background: "red", fontWeight: "bold" }}
                      onClick={() => removeFromCart(product)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div>
                <div>
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce(
                        (acc, curr) => acc + curr.price * curr.count,
                        0
                      )
                    )}
                  </div>
                  <Button
                    onClick={() => orderPlace()}
                    variant="contained"
                    style={{ background: "green", fontWeight: "bold" }}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Cart;
