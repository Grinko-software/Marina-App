import React from 'react'
import { Card, Skeleton } from '@nextui-org/react'

export default function LoadingCard () {
    return (
        <Card className='animation-fade-in p-1' shadow="sm">
            <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 py-3">
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-2 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    )
}
/*
<Card className='animation-fade-in' shadow="sm" isPressable>
*/
