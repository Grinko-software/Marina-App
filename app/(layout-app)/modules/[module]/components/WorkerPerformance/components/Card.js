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
            className="cursor-pointer transform transition duration-300 hover:scale-[1.03] hover:shadow-2xl">

            <Card className="p-4 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gradient-to-br from-white to-gray-100 dark:from-secondary-700 dark:to-secondary-900
                min-h-[200px] max-h-[300px] flex flex-col justify-between">

                <CardBody className="space-y-5 flex-1">
                    <h4 className="font-black text-xl text-primary-500 dark:text-white tracking-wide leading-tight capitalize">
                        {title}
                    </h4>
                    <div className="border-t border-gray-300 dark:border-gray-600"></div>
                    <p className="text-base text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed capitalize">
                        {description}
                    </p>
                </CardBody>

                <CardFooter className="pt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2">
                        <FaRegClock className="text-primary-500 text-lg" />
                        <span className="font-semibold">Fecha límite:</span>
                    </span>
                    <span className="font-mono text-gray-900 dark:text-white">
                        {getMoment(dateLimit).locale('es').calendar() || '-'}
                    </span>
                </CardFooter>
            </Card>
        </div>
    )
}
