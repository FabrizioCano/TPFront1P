export interface ReservaCabecera {
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
  }
  