import { getMoment } from '@/utils/date'
import { Card, CardBody, CardFooter } from '@nextui-org/react'

export default function CardTask ({
    title,
    // priority,
    description,
    user,
    dateLimit,
    userId,
    imageAlt,
    imageUrl,
    openDetail
}) {
    return (
        <div onClick={openDetail}>
            <Card className="py-2">
                <CardBody>
                    <h4 className="font-bold text-large uppercase line-clamp-2">{title}</h4>
                </CardBody>
                <CardFooter className="overflow-visible pt-0">
                    <div className="flex flex-col items-start">
                        <p className="text-tiny uppercase font-bold line-clamp-3">{description}</p>
                        <small className="text-default-500">Fecha límite: {getMoment(dateLimit).calendar() || '-'}</small>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
