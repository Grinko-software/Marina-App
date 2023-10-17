/* eslint-disable no-unused-vars */
import { Document, Page, Text, View, Svg, G, Line, Image } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './StylePdf'
import { DefaultImageMarinaMarket } from '@/utils/image'
import { TableProductVoucher } from './components/table/table'
import ViewTotal from './components/total/total'

// Create Document Component
export const Voucher = ({ listSales, totalPay, date, totalDiscount }) => (
    <Document>
        <Page size={[180]} style={StylePdf.page}>
            <View style={StylePdf.container}>
                <View style={StylePdf.logo}>
                    <Image
                        width="50"
                        height="50"
                        src={DefaultImageMarinaMarket()}/>
                </View>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.title}>{'MARINA MARKET'}</Text>
                <Text style={StylePdf.title}>{'RUT: 77426986-K'}</Text>
                <Text style={StylePdf.subtitle}>{'MINIMARKET'}</Text>
                <Text style={StylePdf.subtitle}>{'LA MARINA 200'}</Text>
                <Text style={StylePdf.subtitle}>{'COQUIMBO'}</Text>
                <Text style={StylePdf.subtitle}>{'944226305'}</Text>
            </View>
            <View style={StylePdf.container}>
                <Text style={StylePdf.titleSecondary}>{'COMPROBANTE DE VENTA'}</Text>
                <Text style={StylePdf.subtitle}>{date}</Text>

            </View>
            {/* Table products */}
            <View style={StylePdf.containerFlexCol}>
                <TableProductVoucher listSales={listSales}/>
            </View>
            <View style={StylePdf.containerFlexCol}>
                <ViewTotal totalPay={totalPay} totalDiscount={totalDiscount}/>
            </View>
        </Page>
    </Document>
)
/*
    <Svg height="10" width="495"><Line x1="0" y1="5" x2="140" y2="5" strokeWidth={5} stroke="rgb(0,0,0)" /></Svg>
*/
