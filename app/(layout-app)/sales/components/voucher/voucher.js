/* eslint-disable no-unused-vars */
import { Document, Page, Text, View, Svg, G, Line, Image } from '@react-pdf/renderer'
// Create StylePdf
import { StylePdf } from './StylePdf'
import { DefaultImageMarinaMarket } from '@/utils/image'
import { TableProductVoucher } from './components/table/table'
import ViewTotal from './components/total/total'
import { Detail } from './components/detail/detail'

// Create Document Component
export const Voucher = ({ listSales, totalPay, date, totalDiscount, stamp, totalTaxFree, netTotal, iva }) => {
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
                <View style={StylePdf.containerFlexCol}>
                    <ViewTotal
                        totalPay={totalPay}
                        totalDiscount={totalDiscount}
                        totalTaxFree={totalTaxFree}
                        netTotal={netTotal}
                        iva ={iva}
                    />
                </View>
                <View style={StylePdf.containerFlexCol2}>
                    <View style={StylePdf.containerAbsoulte}>
                        <View style={StylePdf.stampContainer}>
                            <Image
                                fixed={true}
                                src={'data:image/png;base64,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0aNHjx49evTo0aNHjx49evTo0X+V3s3QLqHnmXPcauupuXDejj712cGp1O6LWo9+UYHd0szDkivV7OncaR72UMU977v99Gj7FwQV/dt14H7t6NWLI4QnUa/hHxciqkf7PasDXPqaX6LLXdl/OG1K++LnpfJ//GLqCHr06NGjR48ePXr06NGjR48ePXr06NF/lN714Vz/JlH1OWekLiK75nxFL/t8qI6tgvEcLnurQXop4iGOC9N5LGNZ63LdNfQIogrgbrp2sqbmuRt5karPMexT5mF2ebzV5Upxrd4bufV4ch/Vtpsut/lUbq4e7YeTFVXsRo8ePXr06NGjR48ePXr06NGjR48ePXr036P3GJHQyI/2827EuB3X1stQ+txQ1XHV2fVNG+Yfufjr0e8P91OHS+0qq2ugyDWTJMOZ1tFRLY6lValeXdQJe9RdehtjXj5clf1XJescfh5Aaz96r3mGW8JP762zi1u65x7ML37NQI8ePXr06NGjR48ePXr06NGjR48ePfrP0udaQji+d1Wfo0ZquB+7Qr+KyLV1u2rGr9Dr/to5vOdKkTbsyfLQC3OaZz3rdX/HvcfisncoGLV0Z1RL9LHUarBOrC6vuRuToo1q6f7To121bT2DiF4An2s4h/We7xG/mLuBHj169OjRo0ePHj169OjRo0ePHj169Og/R39eXdS5terfL4U+/N8XEzbPBcn44q/RJG9NHVH5v7ULMbz7JBKFk9c25fY9u/wvvXvBM5bm1dfBsGbi67iq+H4Apffl9QLFvMgx+SeFGm3ijPjNi+uob9ou9f3sih49evTo0aNHjx49evTo0aNHjx49evTfpvfI5Twm8/h2g/Xuy2rrVdVrD71QHTov73rfeBWmb2qG7m/y673Tbr9W6XncZo2/2KenV5LlEe7R7hdFTZJ2sbty61f79RDC8z38AHxMLdm5j7u1daAq2nXj4WHW9e5Bl8J/MXUEPXr06NGjR48ePXr06NGjR48ePXr06NF/jL6p4q4gqibeasOq4udauvz40R+jbkz966zau7bJU4PT1ov+w7vi05ASzxrpvwy4hD9nwLm6Yk5Oc+1dd6ks767w0jePQLkaxnXMY60Fc/k/H4ruzR0zewomV5+rK/xRv0UsvgI9evTo0aNHjx49evTo0aNHjx49evTov0u/3dxFHa22Hmp2hcLphWWXrQVzpTgR6sd+Ofqroq0wy7yEis1K2+KKti5vnsoxPUv/dB4rbVrzGqlxqFg9neMWf5W9q6gevU1cTddX+3VzXT1zI33fRytV7P1RDv85SRo9evTo0aNHjx49evTo0aNHjx49evTo0X+QPv/lvr3PufV+6uNqkNY2NXVEN+rymFRxP90qPZf+Vp3Zq0Qp1fyRyQX20fH58invUKS1ki5XFf7wrwW6Vzu6pTvqJ4Xz54eAp6XSt6tU77HWg1ST8phLq798eFePtqaoqJd8/UWHOnr06NGjR48ePXr06NGjR48ePXr06NF/lL4988p2FYHzGi9eK+RCutw92o55aG0d+xhnDezo+oe3cR27eYk8lbHM3tB5OKvEfLiirUnStURURXvVde69dkbMMeI9664f/eqydzhZVjx3z90466I+zNrd2pNWb/9Z0UaPHj169OjRo0ePHj169OjRo0ePHj169B+kX3tndvVoR8GOqyaeocehmvrWZ4A8qp5/8x8q0C+eC9K0+OgXEzYPiV6tr47p++u2u57fnL3boakjk/7IjY9e/s8o9HrGnxB2v7JReRjaNfjEveAd5p8fdgeT//l+HdPUkdZj/0U9Hz169OjRo0ePHj169OjRo0ePHj169Og/Sq9i9exJ0l7OxCl3U2d2wrRNYdWt3ZNVg6edLJeeNbw5ouZuGHaOW4TXTPbL36bmAvi86tRdJWrHlyHce+VcpfCoonourUgHlcI11aMejyrvr15o97d6cu2VS6uGXo+i3j24+QB69OjRo0ePHj169OjRo0ePHj169OjRo/8ivWrvik8Bu7KfN7gsP7jAv15bt/XobzT0NOernm+zwmxvLb60nofJY5wVQR9SMjUHnGf9bsTSr4ffjZjHMrd68+I6eia1AzY7FzwrJu2Yx6rvW5cPmhq99Zkmz+YO8LNCaJWs/54kjR49evTo0aNHjx49evTo0aNHjx49evSfpd9yhVAtuUY7qwi8e62hNqwpFs8qJx9KVlW5NfTC3x517PCs6KW5n7pnpLq655q7obUGv0LwEZ4krSyH9UuVo/Uo8hlUefzh8vrr7xDc0j1csbdeAM+wFLh3rCEgLqrr8l/U89GjR48ePXr06NGjR48ePXr06NGjR48e/cfoVbRX7T28luY6P81+5TZaQRX3qB5tX+RW6XcoTG/j2r1GNr9V6jfHfdul90rNrzhc61Re1KeOrH2Ju35SUNprVsjrWvbe+pyTKsvXE3l1WKs3N+quXv5XOmZl1MFMejbo0aNHjx49evTo0aNHjx49evTo0aNH//l6Pnz48OHDhw8fPnz4fNvnfxLunNbkqlwbAAAAAElFTkSuQmCC'}
                                style={StylePdf.stamp}
                            />
                        </View>
                    </View>
                </View>
                <View style={StylePdf.containerFlexCol3}>
                    <Detail/>
                </View>
            </Page>
        </Document>
    )
}
/*
    <Svg height="10" width="495"><Line x1="0" y1="5" x2="140" y2="5" strokeWidth={5} stroke="rgb(0,0,0)" /></Svg>
*/
