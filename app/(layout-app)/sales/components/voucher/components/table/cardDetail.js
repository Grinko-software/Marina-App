/* eslint-disable no-unused-vars */
import { Text, View } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './styleTable'
import { formatter, roundValue } from '@/utils/number'

export const TableCardDetail = ({ dataCard }) => {
    const details = dataCard?.data?.transactionDetails
    if (!details?.applicationLabel && !details?.transactionNumber) return null

    return (
        <View>
            <View style={StylePdf.table}>
                <View key={1} style={StylePdf.rowTableMandatory}>
                    <View style={StylePdf.tableColumn5}>
                        <Text style={StylePdf.textRow}>
                            {[details?.applicationLabel, details?.last4].filter(Boolean).join(' ')}
                        </Text>
                    </View>
                    <View style={StylePdf.tableColumn6}>
                        <Text style={StylePdf.textRow}>
                            {details?.aid ?? ''}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.subtitle}>
                    {[
                        details?.transactionNumber ? `#${details.transactionNumber}` : null,
                        details?.authCode ? `Cód. Aut.:${details.authCode}` : null
                    ].filter(Boolean).join(' | ')}
                </Text>
            </View>
        </View>
    )
}
