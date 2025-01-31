/* eslint-disable camelcase */
import { create } from 'zustand';

const useMachineStore = create((set) => ({
	status: null,
	setStatus: (value) => set({ status: value })
}));

export default useMachineStore;
