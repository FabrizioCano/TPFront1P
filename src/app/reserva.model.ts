export interface ReservaCabecera {
    idTurno: number;
    fecha: string;
    horaInicioAgendamiento: string;
    horaFinAgendamiento: string;
    idProveedor: number;
    idJaula?: number;
    horaInicioRecepcion?: string;
    horaFinRecepcion?: string;
  }
  
  export interface ReservaDetalle {
    idTurno: number;
    idProducto: number;
    cantidad: number;
  }
