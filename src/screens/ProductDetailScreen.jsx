import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { storeSingleProduct } from "../store/action/productAction";
import { addToCart } from "../store/action/cartAction";
import { setNotificationDisplay } from "../store/action/notificationAction";

function ProductDetailScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { selectedProduct } = useSelector((state) => state.productStore);

  const session = useSelector((state) => state.sessionStore);

  const params = useParams(); // useparams theke url er id ta peye jabo

  let { id } = params;
  useEffect(() => {
    dispatch(storeSingleProduct(id)); //action dispatch korchi detail dekhanor jonno
  }, [id]);

  //product adding redirect to login
  const add_product = () => {
    if (session.token && session.expire_at > new Date().valueOf()) {
      dispatch(addToCart(selectedProduct));
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setNotificationDisplay());
    };
  }, []);

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go back to Home page
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={"http://127.0.0.1:8080" + selectedProduct.image}
            alt={selectedProduct.title}
            fluid
          />
        </Col>
        <Col md={4}>
          <Row>
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{selectedProduct.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{selectedProduct.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  price : ${selectedProduct.price}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <Button
                  className="btn-block my-3"
                  type="button"
                  onClick={add_product}
                >
                  Add To Cart
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ProductDetailScreen;
