import { Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../components/Input";
import * as api from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Upload = () => {
  const classes = useStyles();
  const initialState = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postRequest = async () => {
    const result = window.confirm("are you sure");
    if (coverImage && formData.image) {
      if (formData && result) {
        await api
          .uploadProduct(formData)

          .then(() => {
            const notify = () =>
              toast.success("Product Successfully Upload!", {
                autoClose: 2000,
              });

            notify();
          })
          .catch((err) => {
            console.log(err);
            const notify = () =>
              toast.error(" Error!", {
                autoClose: 2000,
              });
            notify();
          });
      } else {
        const notify = () =>
          toast.warn("first Upload Image", {
            autoClose: 2000,
          });

        notify();
      }
    }
  };

  const uploadImage = () => {
    if (coverImage) {
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
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: "5rem",
        marginBottom: "5rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ background: "green", fontWeight: "bold" }}
          onClick={() => navigate("/adminhome", { replace: "true" })}
        >
          {" "}
          Back{" "}
        </Button>
      </div>
      <Paper className={classes.paper} elevation={3}>
        <form className={classes.form} encType="multipart-form-data">
          <Grid container spacing={2}>
            <Input
              name="title"
              label="Product name"
              handleChange={handleChange}
              autoFocus
              half
            />
            <Input
              name="price"
              label="price"
              handleChange={handleChange}
              autoFocus
              half
            />

            <Input
              name="description"
              label="description"
              handleChange={handleChange}
            />

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="image"
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
            onClick={() => postRequest()}
          >
            Upload{" "}
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Upload;
