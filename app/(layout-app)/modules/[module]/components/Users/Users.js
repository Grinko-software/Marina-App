'use client'
import { useEffect } from 'react'
import useUsersStore from './store'
import UsersInfo from './UsersInfo'

export default function Users ({ params }) {
    const { requestData, loading, data } = useUsersStore()
    // const [target, setTarget] = useState(null)

    useEffect(() => {
        requestData()
    }, [])

    return <section className='w-full'>

        {/* <CreateUser/> */}
        <section className='flex flex-row' >
            <UsersInfo data={data} loading={loading} /* setTarget={setTarget} *//>
        </section>
    </section>
}
