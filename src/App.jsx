import { createContext, lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import data from "./data";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
// import Detail from "./pages/Detail";
// import Cart from "./pages/Cart";
import Item from "./components/Item";
import About from "./pages/About";
import Event from "./pages/Event";

// 홈 화면에서 로드할 필요가 없는 페이지는 lazy loading 처리(성능 개선을 위함)
const Detail = lazy(() => import("./pages/Detail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

// state 보관함 생성: createContext
export const Context1 = createContext();

function App() {
  const nav = useNavigate();
  const [shoes, setShoes] = useState(data);
  const [stock] = useState([10, 11, 12]);

  const {
    data: user,
    loading,
    error,
  } = useQuery(
    "user",
    () =>
      axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((res) => res.data),
    { staleTime: 2000 }
  );

  return (
    <div className="App">
      {/* navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Shoemoa</Navbar.Brand>
          {loading && <Nav className="ms-auto">로딩중</Nav>}
          {error && <Nav className="ms-auto">에러</Nav>}
          {user && <Nav className="ms-auto">반갑습니다. {user?.name}님</Nav>}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => nav("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => nav("/cart")}>cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* lazy loading 할 때 로딩화면 적용(fallback) */}
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route
            path="/"
            element={<Home shoes={shoes} setShoes={setShoes} />}
          />

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

          {/* cart */}
          <Route path="/cart" element={<Cart />} />

          {/* 404페이지 */}
          <Route path="*" element={<div>없는 페이지</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

const Home = ({ shoes, setShoes }) => {
  const [moreCnt, setMoreCnt] = useState(2);
  const [loading, setLoading] = useState(false);
  const [watched, setWatched] = useState(null);

  useEffect(() => {
    const getWatched = JSON.parse(localStorage.getItem("watched"));
    setWatched(getWatched);
    getWatched || localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div>
      {/* main image */}
      <div className="main-bg">
        {/* 최근 본 상품 */}
        <ul className="watched">
          <div>최근 본 상품</div>
          {watched?.map((id) =>
            shoes?.map(
              (item) => item.id == id && <li key={item.id}>{item.title}</li>
            )
          )}
        </ul>
      </div>

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
