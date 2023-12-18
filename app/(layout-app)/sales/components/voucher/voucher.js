/* eslint-disable no-unused-vars */
import { Document, Page, Text, View, Svg, G, Line, Image } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './StylePdf'
import { DefaultImageMarinaMarket } from '@/utils/image'
import { TableProductVoucher } from './components/table/table'
import ViewTotal from './components/total/total'
import { Detail } from './components/detail/detail'
import { TableCardDetail } from './components/table/cardDetail'

// Create Document Component
export const Voucher = ({ listSales, totalPay, date, totalDiscount, stamp, totalTaxFree, netTotal, iva, dataCard }) => {
    return (
        <Document>
            <Page size={[180]} style={StylePdf.page}>
                <View style={StylePdf.containerLogo}>
                    <View style={StylePdf.logo}>
                        <Image
                            width="100"
                            height="100"
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
                <View style={StylePdf.containerFlexCol1}>
                    <TableProductVoucher listSales={listSales}/>
                </View>
                {/* Data Card */}
                {dataCard
                    ? <View style={StylePdf.containerFlexCol1}>
                        <TableCardDetail dataCard={dataCard}/>
                    </View>
                    : null}
                <View style={totalTaxFree ? StylePdf.containerFlexCol : StylePdf.containerFlexCol4}>
                    <ViewTotal
                        totalPay={totalPay}
                        totalDiscount={totalDiscount}
                        totalTaxFree={totalTaxFree}
                        netTotal={netTotal}
                        iva ={iva}
                    />
                </View>
                {stamp
                    ? <View>
                        <View style={StylePdf.containerFlexCol2}>
                            <View style={StylePdf.containerAbsoulte}>
                                <View style={StylePdf.stampContainer}>
                                    <Image
                                        fixed={true}
                                        src={'data:image/png;base64,' + stamp}
                                        style={StylePdf.stamp}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={StylePdf.containerFlexCol3}>
                            <Detail/>
                        </View>
                    </View>
                    : <View></View>}
            </Page>
        </Document>
    )
}
