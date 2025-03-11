export const errorsMachine = new Map([
    ['MR-000', 'No autorizado para realizar la operación.'],
    ['MR-100', 'La API-Key no pertenece a un dispositivo en el sistema.'],
    ['MR-110', 'amount es menor al mínimo permitido.'],
    ['MR-120', 'amount es mayor al máximo permitido.'],
    ['MR-130', 'dteType no dentro de [0, 33, 48, 99].'],
    [
        'MR-140',
        'dteType = 99 requiere extraData.exemptAmount y el atributo no se encuentra en la petición.'
    ],
    [
        'MR-141',
        'dteType = 99 requiere que extraData.exemptAmount sea igual a amount y no lo es.'
    ],
    [
        'MR-150',
        'dteType dentro de [0, 33, 48] extraData.exemptAmount necesita ser menor a amount.'
    ],
    ['MR-160', 'La petición de pago no existe.'],
    ['MR-161', 'El serial number no pertenece a un dispositivo en el sistema.'],
    ['MR-180', 'La cola de peticiones del dispositivo se encuentra llena.']
])
