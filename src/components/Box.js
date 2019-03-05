import React from "react";
import { connect } from "react-redux";

import { products } from "../actions";

class Box extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <h1>Order Box</h1>
        <h3>Available products</h3>
        <div>
          {products.map(product => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(products.getAllProducts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box);
