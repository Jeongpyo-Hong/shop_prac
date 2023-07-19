import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Detail = ({ shoes }) => {
  const { id } = useParams();
  const item = shoes.find((el) => el.id == id);

  const [show, setShow] = useState(true);

  const [count, setCount] = useState("");
  const countChange = (e) => {
    if (isNaN(e.target.value)) {
      alert("숫자만 입력 가능합니다.");
      return;
    }
    setCount(e.target.value);
  };

  const [tab, setTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setShow(!show);
    }, 2000);

    // cleanup function: useEffect 실행 전 동작, unmount 될 때만 동작
    return () => {
      clearTimeout(timer);
    };
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
        {/* 숫자 말고 다른 거 입력하면 alert 띄우기 */}
        <div className="col-md-6">
          <input onChange={countChange} type="text" value={count} />개
          <h4 className="pt-5">{item.title}</h4>
          <p>{item.content}</p>
          <p>{item.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      {/* 탭 */}
      <Nav variant="tabs" defaultActiveKey="link1">
        <Nav.Item onClick={() => setTab(0)}>
          <Nav.Link eventKey="link1">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTab(1)}>
          <Nav.Link eventKey="link2">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => setTab(2)}>
          <Nav.Link eventKey="link3">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab tab={tab} />
    </div>
  );
};

// if문은 html 안에서 사용할 수 없으므로 컴포넌트로 분리하여 사용
const Tab = ({ tab }) => {
  // 방법1
  if (tab == 0) {
    return <div>내용0</div>;
  } else if (tab == 1) {
    return <div>내용1</div>;
  } else if (tab == 2) {
    return <div>내용2</div>;
  }

  // 방법2: array에서 하나씩 꺼내는 방식
  // [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
};

export default Detail;
