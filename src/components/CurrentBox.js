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
import { AddCircle, Close } from "grommet-icons";

import { products, box } from "../actions";

class CurrentBox extends React.Component {
  componentDidMount() {
    this.props.getAllProducts();
    this.props.getCurrentBox();
  }

  render() {
    const { products, box } = this.props;
    return (
      <Box direction="row" pad="medium" justify="around">
        <Box pad="medium">
          <Heading level="4" margin="small">
            Available products
          </Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Name
                </TableCell>
                <TableCell scope="col" border="bottom" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell scope="row">
                    <strong>{product.name}</strong>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={<AddCircle />}
                      onClick={() => {
                        this.props.addBoxItem(product.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
