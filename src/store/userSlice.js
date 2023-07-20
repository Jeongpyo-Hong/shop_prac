import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: { name: "hong", age: 30 },
  reducers: {
    changeName(state) {
      return { ...state, name: "kim" };
    },
    increase(state) {
      return { ...state, age: state.age + 1 };
    },
  },
});

export const { changeName, increase } = user.actions;
export default user;
