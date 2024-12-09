/* eslint-disable no-unused-vars */
import { FaChartLine, FaClipboardList, FaTruck, FaUsersCog } from 'react-icons/fa'
import { GiPodium } from 'react-icons/gi'
import { MdAccountBalance } from 'react-icons/md'
import ReportView from '../reports/components/MainReportView'
import Sales from './[module]/components/Sales/Sales'
import Supplier from './[module]/components/Supplier/Supplier'
import Users from './[module]/components/Users/Users'
import AccountingEvent from './[module]/components/AccountingEvents/AccountingEvents'
import RootWorkPerformance from './[module]/components/WorkerPerformance'

export const modules = [
    {
        key: 'sales',
        path: 'sales',
        name: 'Ventas',
        description: 'Detalle de las últimas ventas realizadas',
        requireAdmin: false,
        content: <Sales/>,
        icon: <FaClipboardList />
    },
    {
        key: 'reports',
        path: 'reports',
        name: 'Reportes',
        description: 'Indicadores de ventas por periodos',
        requireAdmin: true,
        content: <ReportView/>,
        icon: <FaChartLine />
    },
    {
        key: 'accounting',
        path: 'accounting',
        name: 'Eventos contables',
        description: 'Historial de todos los eventos contables',
        requireAdmin: true,
        content: <AccountingEvent/>,
        icon: <MdAccountBalance />
    },
    {
        key: 'users',
        path: 'users',
        name: 'Usuarios',
        description: 'Administración de usuarios/trabajadores',
        requireAdmin: true,
        content: <Users/>,
        icon: <FaUsersCog />
    },
    {
        key: 'supplier',
        path: 'supplier',
        name: 'Proveedores',
        description: 'Administración de proveedores',
        requireAdmin: false,
        content: <Supplier/>,
        icon: <FaTruck />
    },
    {
        key: 'performance',
        path: 'performance',
        name: 'Rendimiento',
        description: 'Rendimiento de trabajadores',
        requireAdmin: false,
        content: <RootWorkPerformance/>,
        icon: <GiPodium />
    }
]

export const getModuleName = ({ path: pathSearch }) => {
    return modules?.find(({ path }) => { return path === pathSearch })?.name || undefined
}
