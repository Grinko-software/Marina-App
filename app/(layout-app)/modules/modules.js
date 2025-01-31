/* eslint-disable no-unused-vars */
import {
	FaChartLine,
	FaClipboardList,
	FaTruck,
	FaUsersCog
} from 'react-icons/fa';
import { GiPodium } from 'react-icons/gi';
import { MdAccountBalance } from 'react-icons/md';
import ReportView from '../reports/components/MainReportView';
import Sales from './[module]/components/Sales/Sales';
import Supplier from './[module]/components/Supplier/Supplier';
import Users from './[module]/components/Users/Users';
import AccountingEvent from './[module]/components/AccountingEvents/AccountingEvents';
import RootWorkPerformance from './[module]/components/WorkerPerformance';
import { MODULES_KEYS } from '@/utils/modules';

export const modules = [
	{
		key: MODULES_KEYS.SALES,
		path: 'sales',
		name: 'Ventas',
		description: 'Detalle de las últimas ventas realizadas',
		requireAdmin: false,
		content: <Sales />,
		icon: <FaClipboardList />
	},
	{
		key: MODULES_KEYS.REPORT,
		path: 'reports',
		name: 'Reportes',
		description: 'Indicadores de ventas por periodos',
		requireAdmin: true,
		content: <ReportView />,
		icon: <FaChartLine />
	},
	{
		key: MODULES_KEYS.EVENTS,
		path: 'accounting',
		name: 'Eventos contables',
		description: 'Historial de todos los eventos contables',
		requireAdmin: true,
		content: <AccountingEvent />,
		icon: <MdAccountBalance />
	},
	{
		key: MODULES_KEYS.USERS,
		path: 'users',
		name: 'Usuarios',
		description: 'Administración de usuarios/trabajadores',
		requireAdmin: true,
		content: <Users />,
		icon: <FaUsersCog />
	},
	{
		key: MODULES_KEYS.PROVIDERS,
		path: 'supplier',
		name: 'Proveedores',
		description: 'Administración de proveedores',
		requireAdmin: false,
		content: <Supplier />,
		icon: <FaTruck />
	},
	{
		key: MODULES_KEYS.PERFORFANCE,
		path: 'performance',
		name: 'Rendimiento',
		description: 'Rendimiento de trabajadores',
		requireAdmin: false,
		content: <RootWorkPerformance />,
		icon: <GiPodium />
	}
];

export const getModuleName = ({ path: pathSearch }) => {
	return (
		modules?.find(({ path }) => {
			return path === pathSearch;
		})?.name || undefined
	);
};

export const getModuleKey = ({ path: pathSearch }) => {
	return (
		modules?.find(({ path }) => {
			return path === pathSearch;
		})?.key || undefined
	);
};

export const getModuleNameByKey = ({ key: moduleKey }) => {
	return (
		modules?.find(({ key }) => {
			return key === moduleKey;
		})?.name || undefined
	);
};
