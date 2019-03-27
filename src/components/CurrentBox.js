import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Heading
} from "grommet";
import { CodeSandbox, Close, Cart } from "grommet-icons";
import { Link } from "react-router-dom";

import { products, box } from "../actions";
import ProductsTable from "./ProductsTable";

class CurrentBox extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
    this.props.getCurrentBox();
    this.props.getRecommendedProducts();
  }

  render() {
    const {
      products: { products, recommendedProducts },
      box,
      addBoxItem
    } = this.props;
    return (
      <Box>
        <Box direction="row" pad="medium" justify="around">
          <Box pad="medium">
            <Heading level="4" margin="small">
              Available Products
            </Heading>
            <ProductsTable products={products} addItem={addBoxItem} />
          </Box>
          <Box pad="medium">
            <Heading level="4" margin="small">
              Recommended Products
            </Heading>
            <ProductsTable
              products={recommendedProducts}
              addItem={addBoxItem}
            />
            <Link to="/questionnaire">
              <Button
                icon={<CodeSandbox />}
                label={
                  recommendedProducts.length === 0
                    ? "Get Recommendations"
                    : "Take quiz again"
                }
                margin="small"
              />
            </Link>
          </Box>
          <Box pad="medium" background="light-3">
            <Heading level="4" margin="small">
              Current Box
            </Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Name
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    Qty
                  </TableCell>
                  <TableCell scope="col" border="bottom" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(box).map(key => (
                  <TableRow key={key}>
                    <TableCell scope="row">
                      <strong>{box[key].product}</strong>
                    </TableCell>
                    <TableCell scope="row">
                      <strong>{box[key].ids.length}</strong>
                    </TableCell>
                    <TableCell>
                      <Button
                        icon={<Close />}
                        onClick={() => {
                          this.props.removeBoxItem(box[key].ids.slice(-1)[0]);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Box direction="row" pad="medium" justify="around">
          <Link to="/order">
            <Button primary icon={<Cart />} label="Place Order" />
          </Link>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    box: state.box
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => {
      dispatch(products.getAllProducts());
    },
    getRecommendedProducts: () => {
      dispatch(products.getRecommendedProducts());
    },
    getCurrentBox: () => {
      dispatch(box.getCurrentBox());
    },
    addBoxItem: id => {
      return dispatch(box.addBoxItem(id));
    },
    removeBoxItem: id => {
      return dispatch(box.removeBoxItem(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentBox);
