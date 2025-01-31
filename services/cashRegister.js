import useSettingsStore from '@/stores/settings';

export const getCashRegister = () => {
	const { selectedCashRegister } = useSettingsStore.getState();
	return selectedCashRegister;
};

export const getCashRegisterName = () => {
	const { selectedCashRegister } = useSettingsStore.getState();
	return selectedCashRegister?.name || null;
};
