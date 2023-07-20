import { createContext, useState } from "react";
import "./App.css";
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap";
import data from "./data";
import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Item from "./components/Item";
import About from "./pages/About";
import Event from "./pages/Event";
import axios from "axios";

// state 보관함 생성: createContext
export const Context1 = createContext();

function App() {
  const [shoes, setShoes] = useState(data);
  const [stock] = useState([10, 11, 12]);

  return (
    <div className="App">
      {/* navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Shoemoa</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Promotion</Nav.Link>
              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">스니커즈</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">러닝화</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">구두</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">기타</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home shoes={shoes} setShoes={setShoes} />} />

        <Route
          path="/detail/:id"
          element={
            // context 공유: Provider, value에 공유할 state 입력
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />

        {/* Nested Routes 작성 방식 */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버이름</div>} />
          <Route path="location" />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 폰 받기</div>} />
        </Route>

        {/* 404페이지 */}
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

const Home = ({ shoes, setShoes }) => {
  const [moreCnt, setMoreCnt] = useState(2);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {/* main image */}
      <div className="main-bg"></div>

      {/* goods list */}
      <Container style={{ textAlign: "center" }}>
        <Row>
          {shoes?.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </Row>
      </Container>

      {/* 더보기 */}
      <button
        onClick={() => {
          setLoading(true);
          if (moreCnt == 3) {
            alert("더 이상 가져올 항목이 없습니다.");
            return setLoading(false);
          }
          axios
            .get(`https://codingapple1.github.io/shop/data${moreCnt}.json`)
            .then((data) => {
              setShoes([...shoes, ...data.data]);
              setLoading(false);
              setMoreCnt(moreCnt + 1);
            })
            .catch((e) => {
              console.error(e);
              setLoading(false);
            });
        }}
      >
        더보기
      </button>

      {/* 로딩중 */}
      {loading ? <div>로딩중입니다.</div> : null}
    </div>
  );
};

export default App;
