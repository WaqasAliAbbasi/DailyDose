import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Heading
} from "grommet";
import moment from "moment";

import { orders } from "../actions";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  render() {
    const { orders } = this.props;
    return (
      <Box pad="medium">
        <Heading level="4" margin="small">
          Your Orders
        </Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Order #
              </TableCell>
              <TableCell scope="col" border="bottom">
                For Month
              </TableCell>
              <TableCell scope="col" border="bottom">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.orderList.map(order => (
              <TableRow key={order.id}>
                <TableCell scope="row">
                  <strong>{order.id}</strong>
                </TableCell>
                <TableCell scope="row">
                  <strong>{moment(order.for_month).format("MMMM YYYY")}</strong>
                </TableCell>
                <TableCell scope="row">
                  <strong>{order.status}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: () => {
      dispatch(orders.getAllOrders());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
