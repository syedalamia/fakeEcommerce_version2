import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuserOrder } from "../store/action/orderAction";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Container } from "react-bootstrap";
function OrderScreen() {
  const dispatch = useDispatch();
  const { userorderList } = useSelector((state) => state.orderStore);

  useEffect(() => {
    dispatch(getuserOrder());
  }, []);
  return (
    <Container>
      <Row>
        <Col md={10} className="mx-auto mt-3">
          <h1>All Orders</h1>
          {userorderList.length === 0 ? (
            <h1>
              Your order screen is empty <Link to="/">Go Back</Link>
            </h1>
          ) : (
            <ListGroup variant="flush">
              {userorderList.length > 0 &&
                userorderList.map((row) => (
                  <Row key={row._id}>
                    {row.products.map((product, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={4}>
                            <Image
                              src={
                                "http://127.0.0.1:8080" +
                                product.productId.image
                              }
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
                  </Row>
                ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default OrderScreen;
