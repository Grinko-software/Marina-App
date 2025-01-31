import {
	KEY_API_URL,
	CREATE_KEY_API_URL,
	ASSOCIATION_KEY_API_URL
} from '@/settings/constants';
import { DELETE, GET, POST, getData } from './http';

export const fetchGetCredentials = async () => {
	try {
		return await getData(KEY_API_URL, GET, null, true);
	} catch {
		return null;
	}
};

export const fetchGetCredentialsAssociations = async () => {
	try {
		return await getData(ASSOCIATION_KEY_API_URL, GET, null, true);
	} catch {
		return null;
	}
};

export const fetchCreateCredential = ({ name, lastName, email, password }) => {
	try {
		return getData(
			CREATE_KEY_API_URL,
			POST,
			{
				name,
				last_name: lastName,
				email,
				password
			},
			true
		);
	} catch {
		return null;
	}
};

export const deleteCredential = async ({ id, notify }) => {
	try {
		const queryParams = new URLSearchParams({ id });
		return getData(
			`${KEY_API_URL}?${queryParams}`,
			DELETE,
			undefined,
			true
		).then((response) => {
			try {
				if (response?.code === 200) {
					notify('✅ Credencial eliminada con exito!');
				} else {
					notify(
						'❌ La credencial no se pudo eliminar correctamente, intente mas tarde.'
					);
				}
			} catch {
				return null;
			}
		});
	} catch {
		return null;
	}
};

export const createUserAssociationCredential = async ({
	userId,
	keyCredential,
	notify
}) => {
	try {
		return getData(
			`${ASSOCIATION_KEY_API_URL}/${userId}/${keyCredential}`,
			POST,
			undefined,
			true
		).then((response) => {
			try {
				if (response?.code === 200) {
					notify('✅ Credencial asociada con exito!');
				} else {
					notify(
						'❌ La credencial no ha sido asociada correctamente, intente mas tarde.'
					);
				}
			} catch {
				return null;
			}
		});
	} catch {
		return null;
	}
};

export const deleteUserAssociationCredential = async ({ userId, notify }) => {
	try {
		return getData(
			`${ASSOCIATION_KEY_API_URL}/${userId}`,
			DELETE,
			undefined,
			true
		).then((response) => {
			try {
				if (response?.code === 200) {
					notify('✅ Credencial desasociada con exito!');
				} else {
					notify(
						'❌ La credencial ha sido desasociada correctamente, intente mas tarde.'
					);
				}
			} catch {
				return null;
			}
		});
	} catch {
		return null;
	}
};
