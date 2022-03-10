import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Paper } from "@material-ui/core";
import * as api from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Input from "./Input";
import axios from "axios";

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminCard({ allProduct }) {
  const classes = useStyles();
  const product = allProduct;

  const [update, setUpdate] = useState(false);
  const [updateProduct, setUpdateProduct] = useState();
  let initialState = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [coverImage, setCoverImage] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateRequest = async (_id, formData) => {
    console.log(formData);
    const result = window.confirm("are you sure");
    if ( formData.image) {
      if (result) {
        await api
          .updateSingleProduct(_id, formData)
          .then(() => {
            const notify = () =>
              toast.success("Product Update Successfully !", {
                autoClose: 2000,
              });

            notify();
          })
          .catch((err) => {
            console.log(err);
            const notify = () =>
              toast.error("Server Error!", {
                autoClose: 2000,
              });
            notify();
          });
      }
    } else {
      const notify = () =>
        toast.warn("first Upload Image", {
          autoClose: 2000,
        });

      notify();
    }
  };

  const deleteRequest = async (_id) => {
    console.log(_id);
    const result = window.confirm("are you sure");
    if (result) {
      await api
        .deleteSingleProduct(_id)
        .then(() => {
          const notify = () =>
            toast.success("Product Successfully Deleted!", {
              autoClose: 2000,
            });

          notify();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          const notify = () =>
            toast.error("Server Error!", {
              autoClose: 2000,
            });
          notify();
        });
    }
  };

  const uploadImage = () => {
    if (coverImage ) {
      console.log(coverImage);
      const Data = new FormData();

      Data.append("file", coverImage);
      Data.append("upload_preset", "on a mission");
      axios
        .post("https://api.cloudinary.com/v1_1/dg3djk3zp/image/upload", Data)
        .then((res) => {
          const imgUrl = res.data.url;
          setFormData({
            ...formData,
            image: imgUrl,
          });

          // notify and after success

          const notify = () =>
            toast.success("CoverImage Added SuccessFully!", {
              autoClose: 2000,
            });

          notify();
        })
        .catch((err) => {
          console.log(err);

          const notify = () =>
            toast.error("Cloudinary error", {
              autoClose: 2000,
            });

          notify();
        });
    } else {
      alert("please upload image");
    }
  };

  return (
    <>
      <Container className={classes.Container}>
        {product.map((prod) => {
          return (
            <Card className={classes.root} key={prod._id}>
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {prod.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setUpdateProduct(prod);
                    setFormData({
                      title: prod.title,
                      price: prod.price,
                      description: prod.description,
                      image: prod.image,
                    });
                    setUpdate(true);

                    window.scroll({
                      top: document.body.offsetHeight,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  size="small"
                  color="primary"
                  style={{ color: "red" }}
                  onClick={() => deleteRequest(prod._id)}
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <ToastContainer />
        {update && (
          <Container
            component="main"
            maxWidth="xs"
            style={{
              marginTop: "5rem",
              marginBottom: "5rem",
            }}
          >
            <Paper className={classes.paper} elevation={3}>
              <form className={classes.form} encType="multipart-form-data">
                <Grid container spacing={2}>
                  <Input
                    name="title"
                    label="Product name"
                    defaultvalue={updateProduct?.title}
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="price"
                    label="price"
                    defaultvalue={updateProduct?.price}
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="description"
                    label="description"
                    defaultvalue={updateProduct?.description}
                    handleChange={handleChange}
                  />

                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="image"
                    defaultvalue={updateProduct?.image}
                    onChange={(e) => {
                      setCoverImage(e.target.files[0]);
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={() => uploadImage()}
                  >
                    Upload Image
                  </Button>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    updateRequest(updateProduct?._id, formData);
                    setUpdate(false);
                    window.location.reload();
                    window.scroll(0, 0);
                  }}
                >
                  Update{" "}
                </Button>

                <div style={{ margin: "2rem" }}>
                  <img
                    src={updateProduct?.image}
                    alt={updateProduct?.title}
                    style={{ height: "4rem", width: "4rem" }}
                  />
                </div>
              </form>
            </Paper>
            <Button
              color="primary"
              className={classes.submit}
              onClick={() => {
                setUpdate(false);
                window.scroll(0, 0);
              }}
              style={{
                background: "green",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Cancel{" "}
            </Button>
            <ToastContainer />
          </Container>
        )}
      </Container>
    </>
  );
}
