// import { today } from '@/utils/date'
import moment from 'moment-timezone';
import useSyncStore from '@/stores/common/sync';
export const upgradeVersion = (lastUpdate, setLastUpdate) => {
	const date1 = moment(lastUpdate, 'DD-MM-YYYY HH:mm:ss');
	const date2 = moment();
	const diferenciaEnHoras = date2.diff(date1, 'minutes');
	if (diferenciaEnHoras >= 60) {
		setLastUpdate(moment().format('DD-MM-YYYY HH:mm:ss'));
		return true;
	} else {
		return false;
	}
};

export const withImage = () => {
	const { withImage } = useSyncStore.getState();
	return withImage;
};
export const setWithImage = () => {
	const { setWithImage } = useSyncStore.getState();
	return setWithImage;
};
