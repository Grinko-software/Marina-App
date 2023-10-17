/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTotal'
import { formatter } from '@/utils/number'

const WrapperComponent = ({ totalPay, totalDiscount }) =>
    (
        <View style={StylePdf.table}>
            <View style={StylePdf.rowTable}>
                <View style={StylePdf.tableColumn1}>
                    <Text style={StylePdf.textRow}>{'Monto IVA (19%)'}</Text>
                </View>
                <View style={StylePdf.tableColumn2}>
                    <Text style={StylePdf.textRow}>{totalPay ? formatter.format(totalPay * 0.19) : '-'}</Text>
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
