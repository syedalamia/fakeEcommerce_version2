import React from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ProductScreen({ product }) {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/product_detail/${id}`);
  };

  return (
    <Card
      className="my-3 p-3 rounded text-center "
      onClick={() => handleClick(product._id)}
    >
      <div>
        <Card.Img
          src={"http://127.0.0.1:8080" + product.image}
          style={{ height: "200px", width: "250px" }}
        />
      </div>

      <Card.Body>
        <Card.Title as="h3">
          <strong>{product.title}</strong>
        </Card.Title>
        <Card.Text as="h5"> Price of Product ${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductScreen;
