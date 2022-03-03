import React from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { fetchOrders } from "../../../store/orders";

class PastOrders extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.auth.id);
  }

  render() {
    const { orders } = this.props;

    return (
      <>
        <div className=" d-flex justify-content-center align-items-center flex-column">
          {orders && orders.length <= 0 ? (
            <>
              <div className="col-12 alert alert-info text-center mt-3">
                <div> No Orders</div>
                <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/home"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  START SHOPPING
                </Link>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: "100%" }} className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const date = new Date(order.updatedAt).toDateString(
                        "en-US"
                      );
                      const itemSubtotal = order.orderitems.reduce(
                        (acc, curr) => acc + (curr.price * curr.quantity) / 100,
                        0
                      );
                      const tax = itemSubtotal * 0.03;

                      return (
                        <>
                          <tr className={"alert-success"}>
                            <td>
                              <a className="link">{index + 1}</a>
                            </td>
                            <td>Paid</td>
                            <td>{date.split(" ").splice(1).join(" ")}</td>
                            <td> ${(itemSubtotal + tax).toFixed(2)}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: (userId) => dispatch(fetchOrders(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);
