export interface Pedido {
    id:number,
    idCliente:number,
    orden:number,
    cliente:any,
    detalles:any,
    fecha_entrega:string,
    monto:number,
    n_cuota:number,
    entregado:boolean,
    cancelado:boolean
}
