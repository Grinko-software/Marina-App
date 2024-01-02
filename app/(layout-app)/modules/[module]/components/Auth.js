'use client'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import useAuthStore from '@/stores/user'
import AlertMessage from '@/components/ui/AlertMessage'

const InputCode = ({ value, setValue }) => {
    return <Input
        label="Credencial"
        value={value}
        labelPlacement="inside"
        onValueChange={(v) => setValue(v)}
        type="number"
        variant='bordered'
    />
}

export default function RequireAdminComponent ({ moduleName, children }) {
    const [authCode, setAuthCode] = useState(null)
    const [messageAuth, setMessageAuth] = useState(null)
    const { signInWithCode, loading, errorAuthCode, isAdmin } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (authCode?.length > 3) {
            signInWithCode({ authCode })
        }
    }, [authCode])

    useEffect(() => {
        if (authCode?.length > 3) {
            if (!isAdmin) {
                setMessageAuth('No tienes permiso de administrador')
            } else {
                setMessageAuth(errorAuthCode || null)
            }
        } else {
            setMessageAuth(null)
        }
    }, [errorAuthCode, isAdmin, authCode])

    return <section className='flex w-full min-h-full items-center justify-center'>
        <div className=''>
            <Card>
                <CardHeader>
                    <p className='text-md'>
                    Estimado usuario
                    </p>
                </CardHeader>
                <CardBody className='flex flex-col gap-2 h-[20rem]'>
                    <div className='mx-10 my-5 gap-2 flex flex-col'>
                        <p className='text-md'>
                            {`No puedes acceder a ${moduleName}, necesitas permisos de administrador.`}
                        </p>
                        <p className='text-md'>
                            {'Escanea tu credencial.'}
                        </p>
                    </div>
                    <section className='flex flex-col flex-1 items-center justify-center'>
                        <div className='w-[40%] mx-auto py-4 text-center'>
                            <InputCode value={authCode} setValue={setAuthCode}/>
                        </div>
                        {messageAuth && !loading
                            ? <div className='w-[60%]'>
                                <AlertMessage message={messageAuth}/>
                            </div>
                            : null
                        }
                        {loading
                            ? <div className='w-[60%] m-auto flex items-center'>
                                <Spinner className='text-md m-auto my-1'>
                                    {'Verificando...'}
                                </Spinner>
                            </div>
                            : null}
                    </section>

                </CardBody>
                <CardFooter>
                    <div className='flex w-full flex-row'>
                        <Button isDisabled={loading} className=' w-[50%] m-auto text-md' onPress={() => router.push('/modules')}>
                            {'Regresar'}
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </section>
}
