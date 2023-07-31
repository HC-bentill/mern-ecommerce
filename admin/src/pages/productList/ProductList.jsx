import "./productList.css";
import {DeleteOutline} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../../redux/apiCalls";
import {Box, Button} from "@material-ui/core";
import DataGrid from 'react-data-grid';

export default function ProductList() {
  const dispatch = useDispatch();
  const _products = useSelector((state) => state.product.products);
  const products = [];

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    {field: "_id", headerName: "ID", width: 220},
    // {
    //   field: "product",
    //   headerName: "Product",
    //   width: 200,
    //   renderCell: (params) => {
    //     return (
    //       <div className="productListItem">
    //         <img className="productListImg" src={params.row.img} alt="" />
    //         {params.row.title}
    //       </div>
    //     );
    //   },
    // },
    // {field: "inStock", headerName: "Stock", width: 200},
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 160,
    // },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/product/" + params.row._id}>
    //           <button className="productListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="productList">
      <Box sx={{my: "10px"}}>
        <Link to="/product">
          <Button variant="outlined">Add Product</Button>
        </Link>
      </Box>
      <DataGrid columns={columns} rows={_products?.data} className='rdg-light text-[12px]'/>;
    </div>
  );
}
