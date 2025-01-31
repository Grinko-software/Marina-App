/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer';
// Create StylePdf
import { StylePdf } from './style';

export const CustomerDetailed = ({ targetCustomer }) => (
	<View>
		<View style={StylePdf.container}>
			<Text style={StylePdf.underline}>
				{'SEÑOR(ES): '}
				<Text style={StylePdf.subtitle}>{targetCustomer?.business_name}</Text>
			</Text>
			<Text style={StylePdf.underline}>
				{'RUT: '}
				<Text style={StylePdf.subtitle}>{targetCustomer?.rut}</Text>
			</Text>
			<Text style={StylePdf.underline}>
				{'GIRO: '}
				<Text style={StylePdf.subtitle}>{targetCustomer?.business_line}</Text>
			</Text>
			<Text style={StylePdf.underline}>
				{'COMUNA: '}
				<Text style={StylePdf.subtitle}>{targetCustomer?.commune}</Text>
			</Text>
			<Text style={StylePdf.underline}>
				{'DIRECCIÓN: '}
				<Text style={StylePdf.subtitle}>{targetCustomer?.address}</Text>
			</Text>
		</View>
	</View>
);
