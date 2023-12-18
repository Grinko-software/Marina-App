/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTable'
import { formatter, roundValue } from '@/utils/number'

export const TableCardDetail = ({ dataCard }) =>
    (
        <View>
            <View style={StylePdf.table}>

                <View key={1} style={StylePdf.rowTableMandatory}>
                    <View style={StylePdf.tableColumn5}>
                        <Text style={StylePdf.textRow}>{dataCard?.applicationLabel + ' ' + dataCard?.last4}</Text>
                    </View>
                    <View style={StylePdf.tableColumn6}>
                        <Text style={StylePdf.textRow}>{dataCard?.aid}</Text>
                    </View>

                </View>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.subtitle}>{'#' + dataCard?.transactionNumber + ' | Cód. Aut.:' + dataCard?.authCode}
                </Text>
            </View>
        </View>
    )
