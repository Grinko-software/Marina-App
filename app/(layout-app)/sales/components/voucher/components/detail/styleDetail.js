import { StyleSheet /* , Font */ } from '@react-pdf/renderer';

export const StyleDetail = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		fontSize: 11,
		paddingTop: 3,
		paddingLeft: 6,
		paddingRight: 6,
		lineHeight: 1.5,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100vh',
		width: '100%',
		align: 'justify'
	},
	logo: {
		width: 80,
		height: 80,
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	stamp: {
		width: '100%',
		height: '100%'
	},
	stampContainer: {
		width: 170,
		height: 550
	},
	containerAbsoulte: {
		// marginTop: 20,
		position: 'absolute',
		top: -80
	},
	container: {
		alignContent: 'center',
		alignItems: 'center',
		textTransform: 'uppercase',
		marginTop: 0,
		marginBottom: 10
	},
	containerFlexCol1: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		// marginTop: 60,
		marginBottom: 10
	},
	containerFlexCol2: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		// marginTop: 60,
		marginBottom: 10
	},
	containerFlexCol3: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: -20
	},
	containerFlexCol: {
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 0,
		marginBottom: 67
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
		fontSize: 5,
		fontFamily: 'Helvetica-Bold'
	},
	underline: {
		textDecoration: 'underline',
		color: '#000000',
		letterSpacing: 1,
		fontSize: 5,
		fontFamily: 'Helvetica-Bold'
	}
});
