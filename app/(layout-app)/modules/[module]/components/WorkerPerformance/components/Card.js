import { getMoment } from '@/utils/date'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { FaRegClock } from 'react-icons/fa' // Importamos un icono para la fecha límite

export default function CardTask ({
    title,
    description,
    dateLimit,
    openDetail
}) {
    return (
        <div
            onClick={openDetail}
            className="cursor-pointer transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl"
        >
            <Card
                className="p-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-300 dark:border-black  dark:from-secondary-700 dark:to-secondary-900
                min-h-[100px] max-h-[200px] flex flex-col justify-between"
            >
                <CardBody className="space-y-2 flex-1">
                    <h4 className="font-black text-lg text-primary-500 dark:text-white tracking-wide leading-tight capitalize">
                        {title}
                    </h4>
                    <div className="border-t border-gray-300 dark:border-gray-600"></div>
                </CardBody>
                <CardFooter className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                        <FaRegClock className="text-primary-500 text-xs" />
                        <span className="font-semibold">Fecha límite:</span>
                    </span>
                    <span className="font-mono text-xs text-gray-900 dark:text-white">
                        {getMoment(dateLimit).locale('es').calendar() || '-'}
                    </span>
                </CardFooter>
            </Card>
        </div>
    )
}
