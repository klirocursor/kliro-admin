import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalsNames = {
  loginModal: "loginModal";
  registerModal: "registerModal";
  verifyModal: "verifyModal";
  sessionExpiredModal: "sessionExpiredModal";
  searchModal: "searchModal";
  servicesModal: "servicesModal";
};

type ModalsState = { modals: { [K in keyof ModalsNames]: boolean } };

const defaultState: ModalsState = {
  modals: {
    loginModal: false,
    registerModal: false,
    verifyModal: false,
    sessionExpiredModal: false,
    searchModal: false,
    servicesModal: false,
  },
};

const slice = createSlice({
  name: "modals",
  initialState: defaultState,
  reducers: {
    openModal: (state, action: PayloadAction<keyof ModalsNames>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof ModalsNames>) => {
      state.modals[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = slice.actions;
export default slice.reducer;
