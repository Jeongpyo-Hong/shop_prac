import React, { memo, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { changeCnt, removeItem } from "../store/cartSlice";

/**
 * memo를 사용하여 불필요한 리렌더링 방지(props가 변할 때만 렌더링)
 * 렌더링 전 비교작업을 하므로 props가 복잡한 경우 memo를 쓰지 않는 것이 나을 수 있음
 */
const Memo = memo(() => {
  console.log("a");
  return <div>자식 컴포넌트 예제</div>;
});

const UseMemo = () => {
  return <div>useMemo</div>;
};

const Cart = () => {
  /**
   * 컴포넌트 렌더링 시 1회만 실행 or state가 변화할 때만 작동
   * useEffect와 실행 시점의 차이가 있음
   * useMemo(() => UseMemo(), [state])
   */

  // store에서 데이터 가져오기
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // state 변경 시 useDispatch 사용
  const dispatch = useDispatch();

  // const [count, setCount] = useState(0);

  return (
    <div>
      {/* <Memo count={count} /> */}
      {/* <button onClick={() => setCount(count + 1)}>+</button> */}
      <h4>
        {user.name}
        {user.age}님의 장바구니
        <button onClick={() => dispatch(changeName())}>changeName</button>
        <button onClick={() => dispatch(increase())}>age++</button>
      </h4>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button onClick={() => dispatch(changeCnt(item.id))}>+</button>
              </td>
              <td>
                <button onClick={() => dispatch(removeItem(item.id))}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cart;
