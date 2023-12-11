'use client'
import { useRouter } from 'next/navigation'
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { useState } from 'react'
import useAuthStore from '@/stores/user'

export default function RequireAdminComponent ({ moduleName, children }) {
    const [isAuthMode, setIsAuthMode] = useState(false)
    const { signInWithCode, loading, isAdmin } = useAuthStore()
    const router = useRouter()

    return <section className='flex w-full min-h-full items-center justify-center'>
        <div className=''>
            {!isAuthMode
                ? <Card>
                    <CardHeader>
                    Estimado usuario
                    </CardHeader>
                    <CardBody>
                        <p className='mx-10 my-5'>
                            {`No puedes acceder a ${moduleName}, necesitas permisos de administrador.`}
                        </p>
                    </CardBody>
                    <CardFooter>
                        <div className='flex w-full flex-row gap-5'>
                            <Button className='flex-1' onPress={() => router.push('/admin')}>
                            Regresar
                            </Button>
                            <Button className='flex-1' onPress={() => setIsAuthMode(true)}>
                            Autenticar
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
                : <Card>
                    <CardHeader>
                        Auth
                    </CardHeader>
                    <CardBody>
                        <p className='mx-10 my-5'>
                            {'Escanea tu credencial para ingresar.'}
                        </p>
                    </CardBody>
                    <CardFooter>
                        <div className='flex w-full flex-row'>
                            <Button className='flex-1' onPress={() => setIsAuthMode(false)}>
                        Volver
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            }
        </div>
    </section>
}
