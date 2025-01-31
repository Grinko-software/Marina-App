/* eslint-disable no-unused-vars */
'use client';
import { useRouter } from 'next/navigation';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader
} from '@nextui-org/react';
import useAuthStore from '@/stores/user';
import ScannerCredential from '@/components/ScannerCredential/ScannerCredential';

/* const InputCode = ({ value, setValue }) => {
    return <Input
        label="Credencial"
        value={value}
        labelPlacement="inside"
        onValueChange={(v) => setValue(v)}
        type="number"
        variant='bordered'
    />
}
 */
export default function RequireAdminComponent({
	moduleName,
	children,
	isAdmin,
	setIsAdmin
}) {
	/*  const [authCode, setAuthCode] = useState(null)
    const [messageAuth, setMessageAuth] = useState(null) */
	const { loading, isAdmin: isAdminStoreValue } = useAuthStore();
	const router = useRouter();

	/*  useEffect(() => {
        if (authCode?.length > 3) {
            signInWithCode({ authCode })
        }
    }, [authCode]) */

	/*     useEffect(() => {
        if (authCode?.length > 3) {
            if (!isAdmin) {
                setMessageAuth('No tienes permiso de administrador')
            } else {
                setMessageAuth(errorAuthCode || null)
            }
        } else {
            setMessageAuth(null)
        }
    }, [errorAuthCode, isAdmin, authCode]) */

	const onSuccess = () => {
		setIsAdmin(true);
	};

	return (
		<section className="flex mx-auto min-h-full items-center justify-center">
			<div className="flex h-full py-5">
				<Card className="">
					<CardHeader>
						<p className="text-md">Estimado usuario</p>
					</CardHeader>
					<CardBody className="flex flex-col">
						<div className="mx-auto flex flex-col">
							<p className="text-md">
								{`No puedes acceder a ${moduleName}, necesitas permisos de administrador.`}
							</p>
							<p className="text-md">{'Escanea tu credencial.'}</p>
						</div>
						<section className="mx-auto flex flex-col flex-1 items-center justify-center">
							<div className="">
								<ScannerCredential
									onSuccess={onSuccess}
									changeSession={false}
									requireAdmin={true}
									withoutDelay={true}
								/>
							</div>
						</section>
					</CardBody>
					<CardFooter>
						<div className="flex w-full flex-row">
							<Button
								isDisabled={loading}
								className=" w-[50%] m-auto text-md"
								onPress={() => router.push('/modules')}
							>
								{'Regresar'}
							</Button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
}
