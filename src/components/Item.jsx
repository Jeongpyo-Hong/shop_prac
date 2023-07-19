import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Item = ({ item }) => {
  const nav = useNavigate();

  return (
    <Col
      md={4}
      onClick={() => {
        nav(`/detail/${item.id}`);
      }}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`}
        width="80%"
      />
      <h4>{item.title}</h4>
      <p>{item.content}</p>
      <p>{item.price}원</p>
    </Col>
  );
};

export default Item;
