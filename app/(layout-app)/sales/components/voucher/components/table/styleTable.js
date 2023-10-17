import { StyleSheet /* , Font */ } from '@react-pdf/renderer'
const COL_WIDTH_1 = 12.5
const COL_WIDTH_2 = 56.5//
const COL_WIDTH_3 = 18.5
const COL_WIDTH_4 = 25
export const StylePdf = StyleSheet.create({
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 1,
        borderBottomColor: '#000',
        borderTopColor: '#000'
    },
    rowTableMandatory: {
        margin: 'auto',
        flexDirection: 'row',
        marginBottom: 1
    },
    rowTable: {
        margin: 'auto',
        flexDirection: 'row'
    },
    tableColumn1: {
        width: COL_WIDTH_1 + '%',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColumn2: {
        width: COL_WIDTH_2 + '%',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColumn3: {
        width: COL_WIDTH_3 + '%',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColumn4: {
        width: COL_WIDTH_4 + '%',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    textRow: {
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        letterSpacing: 1,
        fontSize: 7
    },
    textTable: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 7,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold'
    }
})
