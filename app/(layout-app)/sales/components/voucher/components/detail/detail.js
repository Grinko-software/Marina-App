/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer';
// Create StylePdf
import { StyleDetail } from './styleDetail';
// Create Document Component
export const Detail = () => {
	return (
		<View style={StyleDetail.container}>
			<Text style={StyleDetail.subtitle}>{'Timbre Electrónico S.I.I'}</Text>
			<Text style={StyleDetail.subtitle}>{'Res. 80 de 2014'}</Text>
			<Text style={StyleDetail.subtitle}>
				{'Verifique en:'}
				<Text style={StyleDetail.underline}>{'www.sii.cl'}</Text>
			</Text>
			<Text style={StyleDetail.underline}>{'Verify.haulmer.com'}</Text>
		</View>
	);
};
