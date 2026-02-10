/* eslint-disable no-unused-vars */
import {
    FaChartLine,
    FaClipboardList,
    FaTruck,
    FaUsersCog
} from 'react-icons/fa'
import { GiPodium } from 'react-icons/gi'
import { MdAccountBalance } from 'react-icons/md'
import Reports from './[module]/components/Reports/Reports'
import Sales from './[module]/components/Sales/Sales'
import Supplier from './[module]/components/Supplier/Supplier'
import Users from './[module]/components/Users/Users'
import AccountingEvent from './[module]/components/AccountingEvents/AccountingEvents'
import RootWorkPerformance from './[module]/components/WorkerPerformance'
import { MODULES_KEYS } from '@/utils/modules'
// import Schedule from './[module]/components/Schedule/Schedule'
// import { IoCalendar } from 'react-icons/io5'

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
        requireAdmin: false,
        content: <Reports/>,
        icon: <FaChartLine />
    },
    {
        key: MODULES_KEYS.EVENTS,
        path: 'accounting',
        name: 'Eventos contables',
        description: 'Historial de todos los eventos contables',
        requireAdmin: false,
        content: <AccountingEvent/>,
        icon: <MdAccountBalance />
    },
    {
        key: MODULES_KEYS.USERS,
        path: 'users',
        name: 'Usuarios',
        description: 'Administración de usuarios/trabajadores',
        requireAdmin: false,
        content: <Users/>,
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
/*     {
        key: MODULES_KEYS.SCHEDULE,
        path: 'schedule',
        name: 'Turnos',
        description: 'Calendario de turnos',
        requireAdmin: false,
        content: <Schedule/>,
        icon: <IoCalendar />
    } */
]

export const getModuleName = ({ path: pathSearch }) => {
    return (
        modules?.find(({ path }) => {
            return path === pathSearch
        })?.name || undefined
    )
}

export const getModuleKey = ({ path: pathSearch }) => {
    return (
        modules?.find(({ path }) => {
            return path === pathSearch
        })?.key || undefined
    )
}

export const getModuleNameByKey = ({ key: moduleKey }) => {
    return (
        modules?.find(({ key }) => {
            return key === moduleKey
        })?.name || undefined
    )
}
