import React, { useEffect, useState } from "react";
import * as api from "../api/index";
import Loading from "../components/Loading";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";
import AdminCard from "../components/AdminCard";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  },
});

const Adminhome = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const navigate = useNavigate();

  const fetchingAllData = async (mounted) => {
    try {
      const { data } = await api.getAllProduct();

      if (mounted) {
        setProduct([...data.data]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchingAllData(mounted);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let newArray =
    product.length > 4
      ? product.slice((page - 1) * 4, (page - 1) * 4 + 4)
      : product;

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button
          style={{ background: "green", fontWeight: "bold" }}
          onClick={() => navigate("/upload", { replace: "true" })}
        >
          {" "}
          Upload New Product{" "}
        </Button>
      </div>
      <AdminCard allProduct={newArray} />
      {/* pagination from material ui  */}
      <Pagination
        count={parseInt((product.length / 2.5).toFixed(0))}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        // after clicking on pagination number this number is change state
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </>
  );
};

export default Adminhome;
