import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../store/orders";

class PastOrders extends React.Component {
  componentDidMount() {
    this.props.getOrders(this.props.auth.id);
  }

  render() {
    const { orders } = this.props;

    return (
      <div>
        <h2>Past Orders</h2>
        {orders.map((order) => {
          const itemSubtotal = order.orderitems.reduce(
            (acc, curr) => acc + (curr.price * curr.quantity) / 100,
            0
          );
          const tax = itemSubtotal * 0.09;

          return (
            <div className="past-order" key={order.id}>
              <div className="past-order-items">
                {order.products.map((product) => (
                  <div className="product" key={product.id}>
                    <img className="product-img" src={product.imageUrl} />
                    <h3>{product.name}</h3>
                    <h4>Price Per Unit: ${product.price / 100}</h4>
                    <h4>Quantity: {product.orderitem.quantity}</h4>
                    <h4>
                      Total Per Product: $
                      {(
                        (product.price * product.orderitem.quantity) /
                        100
                      ).toFixed(2)}
                    </h4>
                  </div>
                ))}
              </div>
              <div className="past-order-total">
                <h3>Order Summary:</h3>
                <table>
                  <tbody>
                    <tr>
                      <th className="left">Items Subtotal: </th>
                      <th className="right">${itemSubtotal.toFixed(2)}</th>
                    </tr>
                    <tr>
                      <th className="left">Shipping: </th>
                      <th className="right">$0.00</th>
                    </tr>
                    <tr>
                      <th className="left">Tax: </th>
                      <th className="right">${tax.toFixed(2)}</th>
                    </tr>
                    <tr>
                      <th className="left">Total: </th>
                      <th className="right">
                        ${(itemSubtotal + tax).toFixed(2)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
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
