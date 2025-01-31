/* eslint-disable camelcase */
import { PRODUCT_API_URL } from '@/settings/constants';
import { DELETE, getData, PUT } from './http';

export const updateProduct = async ({
	id,
	name,
	cost_price,
	sale_price,
	net_price,
	image,
	code,
	category_id,
	stock_type_id,
	stock,
	stock_min,
	tax_free,
	notify
}) => {
	try {
		const queryParams = new URLSearchParams({
			id: id || '',
			name: name || '',
			cost_price: cost_price || '',
			sale_price: sale_price || '',
			net_price: net_price || '',
			image: image || '',
			code: code || '',
			product_category_id: category_id || '',
			stock_type_id: stock_type_id || '',
			stock: stock || '',
			stock_min: stock_min || '',
			tax_free
		});
		return getData(`${PRODUCT_API_URL}?${queryParams}`, PUT).then(
			(response) => {
				try {
					if (response?.code === 200) {
						notify('✅ Producto actualizado con exito!');
					} else {
						notify(
							'❌ El producto no se actualizo correctamente, intenta otra vez!'
						);
					}
				} catch {
					return null;
				}
			}
		);
	} catch {
		return null;
	}
};

export const updateProductStock = async ({ stock_min, stock, notify }) => {
	try {
		const queryParams = new URLSearchParams({ stock, stock_min });
		return getData(`${PRODUCT_API_URL}/stock?${queryParams}`, PUT).then(
			(response) => {
				try {
					if (response?.code === 200) {
						notify('✅ Stock de producto actualizado con exito!');
					} else {
						notify(
							'❌ El stock de producto no se actualizo correctamente, intenta más tarde.'
						);
					}
				} catch {
					return null;
				}
			}
		);
	} catch {
		return null;
	}
};

export const deleteProduct = async ({ id, notify }) => {
	try {
		const queryParams = new URLSearchParams({ id });
		return getData(`${PRODUCT_API_URL}?${queryParams}`, DELETE).then(
			(response) => {
				try {
					if (response?.code === 200) {
						notify('🗑️ Producto eliminado con exito!');
					} else {
						notify(
							'❌ El producto no se elimino correctamente, intenta más tarde'
						);
					}
				} catch {
					return null;
				}
			}
		);
	} catch {
		return null;
	}
};
