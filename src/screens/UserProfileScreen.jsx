import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../store/action/userAction";
import { Row, ListGroup, Col } from "react-bootstrap";

function UserProfileScreen() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <div>
      <Row>
        <h1 className="mt-5 ">USER INFO</h1>
        <Col md={4} className="mt-5">
          {userList.map((row) => (
            <ListGroup variant="flush" key={row._id}>
              <ListGroup.Item>USER NAME : {row.username} </ListGroup.Item>
              <ListGroup.Item>USER PHONE NUMBER : {row.phone} </ListGroup.Item>
              <ListGroup.Item>USER RESPONSIBILITY :{row.role}</ListGroup.Item>
            </ListGroup>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default UserProfileScreen;
