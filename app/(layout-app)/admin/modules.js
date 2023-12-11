import { FaChartLine, FaClipboardList, FaShoppingCart, FaTruck, FaUsersCog } from 'react-icons/fa'
import ReportView from '../reports/components/MainReportView'
import Sales from './[module]/components/Sales/Sales'

export const modules = [
    {
        key: 'sales',
        path: 'sales',
        name: 'Ventas',
        description: 'Descripción del módulo',
        requireAdmin: true,
        content: <Sales/>,
        icon: <FaClipboardList />
    },
    {
        key: 'reports',
        path: 'reports',
        name: 'Reportes',
        description: 'Descripción del módulo',
        requireAdmin: true,
        content: <ReportView/>,
        icon: <FaChartLine />
    },
    {
        key: 'users',
        path: 'users',
        name: 'Usuarios',
        description: 'Descripción del módulo',
        requireAdmin: true,
        content: <div>Usuarios</div>,
        icon: <FaUsersCog />
    },
    {
        key: 'aaaa',
        path: 'aaaa',
        name: 'Proveedores',
        description: 'Descripción del módulo',
        requireAdmin: false,
        content: <div>Proveedores</div>,
        icon: <FaTruck />
    },
    {
        key: 'products',
        path: 'products',
        name: 'Productos',
        description: 'Descripción del módulo',
        requireAdmin: false,
        content: <div>Productos</div>,
        icon: <FaShoppingCart />
    },
    {
        key: 'aaaa6',
        path: 'aaaa6',
        name: 'Módulo 6',
        description: 'Descripción del módulo',
        requireAdmin: false,
        content: <div>6</div>,
        icon: <FaUsersCog />
    }
]

export const getModuleName = ({ path: pathSearch }) => {
    return modules?.find(({ path }) => { return path === pathSearch })?.name || undefined
}
