import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { checkoutOrder } from "../store/action/cartAction";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

function CartScreen() {
  const dispatch = useDispatch();

  const [total_price, setTotal_price] = useState(0);

  const { count, productList } = useSelector((state) => state.cartStore);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/product_detail/${id}`);
  };

  useEffect(() => {
    let total = 0;
    if (count > 0) {
      productList.forEach((obj) => {
        total += obj.productId.price;
      });
      setTotal_price(total);
    }
  }, []);

  const checkout = () => {
    dispatch(checkoutOrder());
    history.push("/order");
  };

  return (
    <Row>
      <Col md={6}>
        <h1>Shopping Cart</h1>
        {productList.length === 0 ? (
          <h1>
            Your cart is empty <Link to="/">Go Back</Link>
          </h1>
        ) : (
          <ListGroup variant="flush">
            {productList.map((product, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={4}>
                    <Image
                      src={"http://127.0.0.1:8080" + product.productId.image}
                      alt={product.productId.title}
                      fluid
                      rounded
                    />
                  </Col>

                  <Col md={4}>
                    <p>Name :{product.productId.title}</p>
                    <p>price of product ${product.productId.price}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <h1>Total price</h1>
        {count > 0 && (
          <ListGroup variant="flush">
            <ListGroup.Item>
              Total Price: <b>${total_price}</b>
            </ListGroup.Item>

            <Card>
              <Button
                className="btn-block my-3"
                type="button"
                onClick={checkout}
              >
                Proceed to checkout
              </Button>
            </Card>
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default CartScreen;
