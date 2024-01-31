'use client'
import { useEffect, useState } from 'react'
import useUsersStore from './store'
import TableUsers from './TableUsers'
import UserInfo from './UserInfo'
import CreateUser from './NewUser/newUser'

export default function Users ({ params }) {
    const { requestData, loading, data } = useUsersStore()
    const [target, setTarget] = useState(null)

    useEffect(() => {
        requestData()
    }, [])

    return <section className='w-full'>

        <CreateUser/>
        <section className='flex flex-row' >
            <TableUsers data={data} loading={loading} setTarget={setTarget}/>
            <UserInfo target={target} setTarget={setTarget} handleRefresh={requestData}/>
        </section>
    </section>
}
