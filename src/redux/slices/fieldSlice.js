import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: [],
  selfEmployee: [],
  business: [],
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField: (state, action) => {
      state[action.payload.category].push(action.payload.currentFields);
    },
  },
});

export const { addField } = fieldsSlice.actions;
export default fieldsSlice.reducer;
