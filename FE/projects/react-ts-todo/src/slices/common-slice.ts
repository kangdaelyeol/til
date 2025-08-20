import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FunctionComponent } from 'react';

interface CommonState {
	user: { username: string } | null;
	modals: FunctionComponent<{ onClose: () => void }>[];
}

const commonSlice = createSlice({
	name: 'common',
	initialState: {
		user: null,
		modals: [],
	} as CommonState,
	reducers: {
		login(_, __: PayloadAction<{ username: string; password: string }>) {
			// saga will handle the login logic
		},
		setUser(state, action: PayloadAction<{ username: string }>) {
			state.user = action.payload;
		},
		openModal(
			state,
			action: PayloadAction<FunctionComponent<{ onClose: () => void }>>
		) {
			state.modals.push(action.payload);
		},
		closeModal(state, action: PayloadAction<{ index: number }>) {
			state.modals.splice(action.payload.index, 1);
		},
		closeAllModals(state) {
			state.modals = [];
		},
	},
});

export const { login, setUser, openModal, closeModal, closeAllModals } =
	commonSlice.actions;

const commonReducer = commonSlice.reducer;

export default commonReducer;
