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
            className="cursor-pointer transform transition duration-300 hover:scale-[1.03] snap-start"
        >
            <Card
                className="p-2 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-300 dark:border-black  dark:from-secondary-700 dark:to-secondary-900
                min-h-[50px] max-h-[150px] flex flex-col justify-between mx-2"
            >
                <CardBody className="space-y-2 flex-1 items-center justify-center">
                    <h4 className="font-black text-md text-primary-500 dark:text-white tracking-wide leading-tight capitalize ">
                        {title}
                    </h4>
                </CardBody>
                <div className="border-t border-gray-300 dark:border-gray-600"></div>
                <CardFooter className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2 min-w-[32px] max-w-[32px]">
                        <FaRegClock className="text-primary-500 text-xs" />
                        <span className="font-mono text-xs font-semibold">Fecha límite:</span>
                    </span>
                    <span className="font-mono text-xs text-gray-900 dark:text-white capitalize min-h-[32px] min-w-[8rem] max-w-[8rem]">
                        {getMoment(dateLimit).locale('es').calendar() || '-'}
                    </span>
                </CardFooter>
            </Card>
        </div>
    )
}
