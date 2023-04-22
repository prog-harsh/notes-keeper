import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		darkMode: false,
	},
	reducers: {
		toggleTheme(state) {
			state.darkMode = !state.darkMode;
			localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
		},
		getTheme(state) {
			const darkMode = JSON.parse(localStorage.getItem("darkMode"));
			state.darkMode = darkMode;
		}
	},
});

export const themeActions = themeSlice.actions;

export default themeSlice;