/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer';
// Create StylePdf
import { StylePdf } from './styleTotal';
import { formatter, transformNumberFormat } from '@/utils/number';

const WrapperComponent = ({
	totalPay,
	totalDiscount,
	totalTaxFree,
	netTotal,
	iva,
	discountPctg
}) => (
	<View style={StylePdf.table}>
		<View style={StylePdf.rowTable}>
			<View style={StylePdf.tableColumn1}>
				<Text style={StylePdf.textRow}>{'Monto NETO'}</Text>
			</View>
			<View style={StylePdf.tableColumn2}>
				<Text style={StylePdf.textRow}>
					{netTotal ? formatter.format(transformNumberFormat(netTotal)) : '-'}
				</Text>
			</View>
		</View>
		{totalTaxFree ? (
			<View style={StylePdf.rowTable}>
				<View style={StylePdf.tableColumn1}>
					<Text style={StylePdf.textRow}>{'Monto EXENTO'}</Text>
				</View>
				<View style={StylePdf.tableColumn2}>
					<Text style={StylePdf.textRow}>
						{totalTaxFree
							? formatter.format(transformNumberFormat(totalTaxFree))
							: '-'}
					</Text>
				</View>
			</View>
		) : null}

		<View style={StylePdf.rowTable}>
			<View style={StylePdf.tableColumn1}>
				<Text style={StylePdf.textRow}>{'Monto IVA (19%)'}</Text>
			</View>
			<View style={StylePdf.tableColumn2}>
				<Text style={StylePdf.textRow}>
					{iva ? formatter.format(transformNumberFormat(iva)) : '-'}
				</Text>
			</View>
		</View>
		{totalDiscount > 0 ? (
			<View style={StylePdf.rowTable}>
				<View style={StylePdf.tableColumn1}>
					<Text style={StylePdf.textRow}>{'Total Descuentos'}</Text>
				</View>
				<View style={StylePdf.tableColumn2}>
					<Text style={StylePdf.textRow}>
						{totalDiscount
							? formatter.format(transformNumberFormat(totalDiscount))
							: '-'}
					</Text>
				</View>
			</View>
		) : null}
		<View style={StylePdf.rowTable}>
			<View style={StylePdf.tableColumn1}>
				<Text style={StylePdf.textRow}>{'Monto TOTAL'}</Text>
			</View>
			<View style={StylePdf.tableColumn2}>
				<Text style={StylePdf.textRow}>
					{totalPay ? formatter.format(transformNumberFormat(totalPay)) : '-'}
				</Text>
			</View>
		</View>
	</View>
);
export default WrapperComponent;
