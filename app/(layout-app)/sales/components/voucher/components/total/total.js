/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTotal'
import { formatter, roundValue, roundValueWithMath } from '@/utils/number'

const WrapperComponent = ({ totalPay, totalDiscount, totalTaxFree, netTotal, iva, discountPctg }) =>
    (
        <View style={StylePdf.table}>
            <View style={StylePdf.rowTable}>
                <View style={StylePdf.tableColumn1}>
                    <Text style={StylePdf.textRow}>{'Monto NETO'}</Text>
                </View>
                <View style={StylePdf.tableColumn2}>
                    <Text style={StylePdf.textRow}>{netTotal ? formatter.format(netTotal) : '-'}</Text>
                </View>
            </View>
            {totalTaxFree
                ? <View style={StylePdf.rowTable}>
                    <View style={StylePdf.tableColumn1}>
                        <Text style={StylePdf.textRow}>{'Monto EXENTO'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn2}>
                        <Text style={StylePdf.textRow}>{totalTaxFree ? formatter.format(totalTaxFree) : '-'}</Text>
                    </View>
                </View>
                : null}

            <View style={StylePdf.rowTable}>
                <View style={StylePdf.tableColumn1}>
                    <Text style={StylePdf.textRow}>{'Monto IVA (19%)'}</Text>
                </View>
                <View style={StylePdf.tableColumn2}>
                    <Text style={StylePdf.textRow}>{iva ? formatter.format(iva) : '-'}</Text>
                </View>
            </View>
            {totalDiscount > 0
                ? <View style={StylePdf.rowTable}>
                    <View style={StylePdf.tableColumn1}>
                        <Text style={StylePdf.textRow}>{'Total Descuentos'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn2}>
                        <Text style={StylePdf.textRow}>{totalDiscount ? formatter.format(totalDiscount) : '-'}</Text>
                    </View>
                </View>
                : null}
            {discountPctg > 0 && discountPctg
                ? <View style={StylePdf.rowTable}>
                    <View style={StylePdf.tableColumn1}>
                        <Text style={StylePdf.textRow}>{'Descuento'}</Text>
                    </View>
                    <View style={StylePdf.tableColumn2}>
                        <Text style={StylePdf.textRow}>{discountPctg ? formatter.format(totalPay * discountPctg) : '-'}</Text>
                    </View>
                </View>
                : null}

            <View style={StylePdf.rowTable}>
                <View style={StylePdf.tableColumn1}>
                    <Text style={StylePdf.textRow}>{'Monto TOTAL'}</Text>
                </View>
                <View style={StylePdf.tableColumn2}>
                    <Text style={StylePdf.textRow}>{totalPay ? formatter.format(totalPay) : '-'}</Text>
                </View>
            </View>
        </View>
    )
export default WrapperComponent
