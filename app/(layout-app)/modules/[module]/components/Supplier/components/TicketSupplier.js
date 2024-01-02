/* eslint-disable no-unused-vars */
import { Document, Page, Text, View, Svg, G, Line, Image } from '@react-pdf/renderer'
// Create StylePdf

import { DefaultImageMarinaMarket } from '@/utils/image'
import { formatter, roundValue } from '@/utils/number'
import { StylePdf } from './StylePdf'

const TableProducts = ({ listProducts }) =>
    (
        <View style={StylePdf.table}>
            <View style={StylePdf.columnsName}>
                <View style={StylePdf.rowProduct}>
                    <Text style={StylePdf.textRow}>{'Producto'}</Text>
                </View>
                <View style={StylePdf.rowRequest}>
                    <Text style={StylePdf.textRow}>{'Cant.'}</Text>
                </View>
            </View>

            {listProducts?.map((element, index) => (
                <View key={index} >
                    {element?.request > 0
                        ? <View key={index} style={StylePdf.rowTableMandatory}>
                            <View style={StylePdf.column1}>
                                <Text style={StylePdf.textRow}>{(element?.product?.name || element?.name) ?? '-'}</Text>
                            </View>
                            <View style={StylePdf.column2}>
                                <Text style={StylePdf.textRow}>{ roundValue(element?.request, 2, '-')}</Text>
                            </View>
                        </View>
                        : null
                    }
                </View>
            )
            )}

        </View>

    )

// Create Document Component
export const TicketSupplier = ({ date, listProducts }) => {
    return (
        <Document>
            <Page size={[180]} style={StylePdf.page}>
                <View style={StylePdf.container}>
                    <Text style={StylePdf.title}>{'MARINA MARKET'}</Text>
                </View>
                <View style={StylePdf.container}>
                    <Text style={StylePdf.titleSecondary}>{'TICKET PROVEEDOR'}</Text>
                    <Text style={StylePdf.subtitle}>{date}</Text>
                </View>

                <View style={StylePdf.container}>
                    <TableProducts listProducts={listProducts}/>
                </View>

            </Page>
        </Document>
    )
}
