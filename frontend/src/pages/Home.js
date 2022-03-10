import React, { useEffect, useState } from "react";
import MediaCard from "../components/Card";
import * as api from "../api/index";
import Loading from "../components/Loading";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  },
});

const Home = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const classes = useStyles();

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
      <MediaCard allProduct={newArray} />
      {/* pagination from material ui  */}
      <Pagination
        count={parseInt(( product.length / 3.5).toFixed(0))}
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

export default Home;
