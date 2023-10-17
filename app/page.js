/* Aqui debemos redirigir entre el home o el login */
import Auth from './auth'
export default function Home () {
    return (
        <Auth pathname={'/'}/>
    )
}
