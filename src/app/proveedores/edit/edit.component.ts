import { Component,OnInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../proveedores.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  constructor(private proveedoresService:ProveedoresService, private router:Router,private route:ActivatedRoute){}

  process_data:Proveedores= {
    idProveedor:0,
    nombre:''
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let idProveedor = Number(param.get('idProveedor'));
      this.getById(idProveedor);
    });
    }
    getById(idProveedor:number){
      this.proveedoresService.editarProveedor(idProveedor).subscribe((data)=>{
        this.process_data=data;
      })
  }

  update(){
    this.proveedoresService.updateProveedor(this.process_data).subscribe({
      next:(data) => {
        this.router.navigate(["/proveedores/home"]);
      },
      error:(err) => {
        console.log(err)
      }
    })
  }
}
