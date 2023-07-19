import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = ({ shoes }) => {
  const { id } = useParams();
  const item = shoes.find((el) => el.id == id);

  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {show ? (
        <div className="alert alert-warning">2초 이내 구매 시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
