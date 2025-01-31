'use client'

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { modules } from '../modules'

const ModuleView = ({ key, path, name, description, icon }) => {
    const router = useRouter()
    return (
        <section key={key} className="flex">
            <Card
                className="border border-default-300 flex-1"
                isPressable
                onPress={() => {
                    router.push(`/modules/${path}`)
                }}
            >
                <CardBody>
                    <div className="text-9xl m-auto text-default-600 py-0 md:py-5">
                        {icon}
                    </div>
                </CardBody>
                <CardFooter>
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-semibold text-start">
                            {name?.toUpperCase()}
                        </p>
                        <p className="text-md text-default-500 text-start">
                            {description?.toUpperCase()}
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </section>
    )
}

export function Modules () {
    useEffect(() => {}, [])
    return (
        <Card className="w-full h-full">
            <CardHeader className="flex gap-3">
                <p className="text-md font-bold">{'MÓDULOS'}</p>
            </CardHeader>
            <CardBody>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-1 w-full">
                    {modules?.map(
                        ({ key, path, name, description, content: component, icon }) => {
                            return (
                                <ModuleView
                                    key={key}
                                    path={path}
                                    name={name}
                                    description={description}
                                    icon={icon}
                                >
                                    {component}
                                </ModuleView>
                            )
                        }
                    )}
                </div>
            </CardBody>
        </Card>
    )
}
