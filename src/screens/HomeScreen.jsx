import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { storeAllProduct } from "../store/action/productAction";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // use selector die jate reducer guli pai store er bisheshportion r access
import ProductScreen from "../components/ProductScreen";

function HomeScreen() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.productStore); // use selector die ami amar reducer r product store part ta nicchi
  const { loading } = useSelector((state) => state.loaderStore); //store er loader store ta select korchi
  //chaile ei const guli aro venge nea jai reducer e ki ki ache tar upor base kore

  const history = useHistory();

  useEffect(() => {
    dispatch(storeAllProduct()); // use effect er moddhe dispatch korte hobe product
  }, []);

  return (
    <div className="mt-5 mb-2">
      <h3 style={{ color: "#fe4c50" }} className="text-center">
        AVAILABLE PRODUCTS
      </h3>
      <Row>
        {productList &&
          productList.map((product, index) => {
            return (
              <Col item md={6} sm={12} xl={3} lg={4} key={index}>
                <ProductScreen product={product} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default HomeScreen;
