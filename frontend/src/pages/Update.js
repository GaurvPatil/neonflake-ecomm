import { Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../components/Input";
import * as api from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


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

const Update = ({product}) => {
  const classes = useStyles();
  const initialState = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateRequest = async (_id) => {
    const result = window.confirm("are you sure");
    if (result) {
      await api
        .updateSingleProduct(_id)
        .then(() => {
          const notify = () =>
            toast.success("Product Successfully Deleted!", {
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
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          encType="multipart-form-data"
        >
          <Grid container spacing={2}>
            <Input
              name="title"
              label="Product name"
              defaultvalue={formData.title}
              handleChange={handleChange}
              autoFocus
              half
            />
            <Input
              name="price"
              label="price"
              defaultvalue={formData.price}
              handleChange={handleChange}
              autoFocus
              half
            />

            <Input
              name="description"
              label="description"
              defaultvalue={formData.description}
              handleChange={handleChange}
            />

            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              name="image"
              defaultvalue={formData.image}
              onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Select File
              </Button>
            </label>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() =>  updateRequest(product)}
          >
            Update{" "}
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
    
  );
};

export default Update;
