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
                        <Text style={StylePdf.textRow}>{dataCard?.data?.transactionDetails?.applicationLabel + ' ' + dataCard?.data?.transactionDetails?.last4}</Text>
                    </View>
                    <View style={StylePdf.tableColumn6}>
                        <Text style={StylePdf.textRow}>{dataCard?.data?.transactionDetails?.aid}</Text>
                    </View>

                </View>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.subtitle}>{'#' + dataCard?.data?.transactionDetails?.transactionNumber + ' | Cód. Aut.:' + dataCard?.data?.transactionDetails?.authCode}
                </Text>
            </View>
        </View>
    )
