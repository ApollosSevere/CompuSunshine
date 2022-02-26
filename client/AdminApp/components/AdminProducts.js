import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/products";
import { deleteProduct, fetchAllProducts } from "../../store/adminproducts";

class AdminProducts extends React.Component {
  async componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    // *Important: Sort products first to keep from reshifting after a change!
    this.props.products.sort((itemA, itemB) => itemA.id - itemB.id);

    return (
      <div>
        {this.props.products.map((product) => {
          return (
            <div key={product.id}>
              <img style={{ maxWidth: "50px" }} src={product.imageUrl} />
              <Link to={`/admin/editProducts/${product.id}`}>
                {product.name}
              </Link>
              <button
                type="button"
                onClick={() => this.props.deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.adminproducts.allProducts,
    state: state,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadAllProducts: () => {
      dispatch(fetchAllProducts());
    },
    deleteProduct: (productId) => {
      dispatch(deleteProduct(productId, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
