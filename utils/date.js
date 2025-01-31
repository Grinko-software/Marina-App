import moment from 'moment-timezone';
import 'moment/locale/es';

export const DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

// Configurar Moment en español
moment.locale('es');

// Función para obtener el momento actual
export const today = () => moment();

// Obtener el año actual
export const getCurrentYear = () => today().year();

// Obtener un objeto Moment con formato en español
export const getMoment = (value, format = DEFAULT_FORMAT) =>
	moment(value, format).locale('es');

// Formatear fecha a ISO
export const formatDateToISO = (date) => {
	const isoDate = new Date(date).toISOString();
	return isoDate.split('Z')[0] + 'Z';
};
