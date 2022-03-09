import { Button, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Input from "../components/Input";
import * as api from "../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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

const Admin = () => {
  const classes = useStyles();
  const initialState = {
    title: "",
    price: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const postRequest = async (category, _id) => {
    const result = window.confirm("are you sure");
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
      <Paper className={classes.paper} elevation={3}>
        <form className={classes.form} onSubmit={handleSubmit}>
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
           
              onChange = {handleChange}
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

export default Admin;
