'use client';
import { Button, Input } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function UserPassword({ target }) {
	const [edit, setEdit] = useState(false);
	const [newPassword, setNewPassword] = useState(null);
	const [newPassword2, setNewPassword2] = useState(null);

	useEffect(() => {}, []);

	return (
		<section className="w-full">
			{edit ? (
				<section className="p-1 w-full gap-3 items-center grid grid-cols-1 md:grid-cols-2 ">
					<Input
						autoFocus
						type="text"
						value={newPassword}
						variant={'underlined'}
						label={'Nueva contraseña'}
						labelPlacement={'outside'}
						placeholder={'Ingrese la nueva contraseña'}
						onValueChange={(value) => {
							setNewPassword(value);
						}}
					/>
					<Input
						type="text"
						value={newPassword2}
						variant={'underlined'}
						label={'Repita la contraseña'}
						labelPlacement={'outside'}
						placeholder={'Ingrese la nueva contraseña'}
						onValueChange={(value) => {
							setNewPassword2(value);
						}}
					/>
					<Button onClick={() => setEdit(true)}>{'Guardar'}</Button>
					<Button onClick={() => setEdit(false)}>{'Cancelar'}</Button>
				</section>
			) : (
				<Button onClick={() => setEdit(true)}>{'Cambiar contraseña'}</Button>
			)}
		</section>
	);
}
