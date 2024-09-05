export interface ReservaCabecera {
    detalles_res: { idProducto: string; cantidad: number;idTurno?:string;id?:string }[];
    id: string;
    fecha: string;
    horaInicioAgendamiento: string;
    horaFinAgendamiento: string;
    idProveedor: string;
    idJaula?: string;
    horaInicioRecepcion?: string;
    horaFinRecepcion?: string;
  }

  export interface ReservaDetalle {
    id: string;
    idProducto: string;
    cantidad: number;
    idTurno?:string;
  }
