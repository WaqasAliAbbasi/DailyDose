import React from "react";
import { connect } from "react-redux";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Heading,
  Select,
  Button,
  Text
} from "grommet";
import moment from "moment";
import { Deliver } from "grommet-icons";

import { box, orders } from "../actions";

class Order extends React.Component {
  state = {
    month: "",
    year: String(moment().year())
  };

  componentDidMount() {
    this.props.getCurrentBox();
    this.props.getAllOrders();
  }

  render() {
    const { box, orders } = this.props;
    const { month, year } = this.state;
    const monthList = moment.months().filter(
      m =>
        moment()
          .add(1, "M")
          .startOf("month") <=
        moment()
          .month(m)
          .year(year)
    );
    const disabledMonths = moment.months().filter(m => {
      return orders.orderList.reduce((accumulator, order) => {
        const { for_month } = order;
        if (String(moment(for_month).year()) === year) {
          if (moment(for_month).format("MMMM") === m) {
            return true;
          }
        }
        return accumulator;
      }, false);
    });
    const yearList = [...Array(2).keys()].map(key =>
      String(moment().year() + key)
    );
    return (
      <Box pad="medium" justify="around">
        <Box pad="medium">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Box pad="medium" align="center">
          <Box direction="row" pad="medium">
            <Select
              options={monthList}
              disabled={disabledMonths}
              placeholder="Select Month"
              value={month}
              onChange={({ option }) => this.setState({ month: option })}
            />
            <Select
              options={yearList}
              value={year}
              onChange={({ option }) => this.setState({ year: option })}
            />
          </Box>
          <Button
            disabled={!(month && year) || disabledMonths.includes(month)}
            onClick={() => this.props.placeOrder(month, year)}
            icon={<Deliver />}
            label="Order"
          />
          <Text
            color={orders.error ? "status-error" : "status-ok"}
            margin="xsmall"
          >
            {orders.message}
          </Text>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return {
    box: state.box,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentBox: () => {
      dispatch(box.getCurrentBox());
    },
    placeOrder: (month, year) => {
      return dispatch(orders.placeOrder(month, year));
    },
    getAllOrders: () => {
      dispatch(orders.getAllOrders());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
