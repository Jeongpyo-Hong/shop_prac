import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: [
    { id: "a", name: "testA", count: 2 },
    { id: "b", name: "testB", count: 1 },
  ],
  // state 변경 함수 생성
  reducers: {
    changeCnt(state, action) {
      const id = action.payload;
      state.map((item) => {
        if (item.id == id) item.count++;
      });
    },
    orderItem(state, action) {
      // 동일 상품이 있는 경우 수량만 증가
      const count = +action.payload.count;
      const sameItem = state.find((item) => item.id == action.payload.id);

      if (sameItem) {
        sameItem.count = Number(sameItem.count) + count;
      } else {
        state.push(action.payload);
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      return state.filter((item) => item.id != id);
    },
  },
});

export const { changeCnt, orderItem, removeItem } = cart.actions;
export default cart;
