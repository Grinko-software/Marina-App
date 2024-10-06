import { Card, CardHeader, CardBody, Avatar, CardFooter } from '@nextui-org/react'

export default function CardTask ({ taskTitle, taskPriority, taskDescription, imageAlt, imageUrl }) {
    return (
        <Card className="py-2">
            <CardHeader className="pb-0 pt-1 px-4 flex-col items-start">
                <div className="flex flex-row gap-x-2 justify-center items-center relative">
                    <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <div className="flex flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{'Dionisio Olivares'}</p>
                        <small className="text-default-500">{'Empleado'}</small>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <h4 className="font-bold text-large">{taskDescription}</h4>
            </CardBody>
            <CardFooter className="overflow-visible py-2">
                <div className="flex flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{taskTitle}</p>
                    <small className="text-default-500">{taskPriority}</small>
                </div>
            </CardFooter>
        </Card>
    )
}
