import { StyleSheet /* , Font */ } from '@react-pdf/renderer'

export const StylePdf = StyleSheet.create({

    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 3,
        paddingLeft: 6,
        paddingRight: 6,
        lineHeight: 1.5,
        display: 'flex',
        width: '100%',
        align: 'justify',
     	border: '1px black'

    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    title: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold'
    },
    titleSecondary: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold'
    },
    subtitle: {
        color: '#000000',
        letterSpacing: 1,
        fontSize: 7,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold'
    },

    table: {
        display: 'flex',
        width: '100%',
        borderBottomColor: '#000',
        borderTopColor: '#000',
       	alignContent: 'center',
      	paddingHorizontal: 2
    },
    rowTableMandatory: {
        margin: 'auto',
        flexDirection: 'row',
        marginBottom: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'start'
    },
    rowTable: {
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'start'
    },
  	columnsName: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    column1: {
        width: '100%',
        paddingRight: 15
    },
   	column2: {
        width: 'auto',
        borderLeftWidth: 0,
        borderTopWidth: 0
    },

    textRow: {
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        letterSpacing: 1,
        fontSize: 7,
        lineHeight: 1,
        marginVertical: 3
    }

})
