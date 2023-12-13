// import { fetchGet } from '@/services/sales'
import { getToken } from '@/services/user'
export const getStateSaleMachine = (url) => {
    return new Promise((resolve, reject) => {
        let limitTime = 0
        const intervalId = setInterval(() => {
            limitTime += 1000 // Incrementa el tiempo transcurrido en cada consulta
            // Realiza la solicitud al endpoint
            fetch(url,
                {
                    method: 'get',
                    headers: new Headers({
                        Authorization: 'Bearer ' + getToken(),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                })
                .then(response => {
                    if (response?.status !== 200) {
                        throw new Error(`Error en la solicitud: ${response.status}`)
                    }
                    return response.json()
                })
                .then(data => {
                    // Comprueba si el estado es confirmado
                    if (data?.data?.paymentRequest?.status === 'Completed') {
                        clearInterval(intervalId)
                        resolve(data)
                    } else if (data?.data?.paymentRequest?.status === 'Canceled') {
                        clearInterval(intervalId)
                        reject(new Error('Venta cancelada desde la máquina'))
                    }
                })
                .catch(error => {
                    clearInterval(intervalId)
                    reject(error)
                }
                )
            // Verifica si ha pasado más de 2 minutos y cancela la promesa si es así
            if (limitTime >= 120000) {
                clearInterval(intervalId)
                reject(new Error('Tiempo de espera agotado (más de 2 minutos).'))
            }
        }, 1000) // Consulta cada 1000ms
    })
}
