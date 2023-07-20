import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice";
import { changeCnt, removeItem } from "../store/cartSlice";

const Cart = () => {
  // store에서 데이터 가져오기
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  // state 변경 시 useDispatch 사용
  const dispatch = useDispatch();

  return (
    <div>
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
