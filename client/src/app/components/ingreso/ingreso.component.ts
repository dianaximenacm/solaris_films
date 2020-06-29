import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Pelicula } from '../../modelo/pelicula';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  public usuarioIngreso : Usuario;
  public pelicula : Pelicula;
  public identidad;
  public tipoUsuario = String;
  public inicio = 0;
  public final = 0;

  constructor(
    private usuarioServicio : UsuarioService,
    private _router : Router
  ) {
    this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
    this.pelicula = new Pelicula("","","","","","","","","",0,"","","","",true);
   }

  ngOnInit(): void {
      
  }

  ingresoUsuario(){
    this.usuarioServicio.ingreso(this.usuarioIngreso).subscribe((response : any)=>{
        let validar = response.usuario;
        let mensaje = response.message; 
        this.usuarioIngreso = validar;
        if(!this.usuarioIngreso){
           alert(mensaje);
            this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
        } else{
                let datosUsuario = new Usuario(
                    this.usuarioIngreso._id,
                    this.usuarioIngreso.imagen,
                    this.usuarioIngreso.nombre,
                    this.usuarioIngreso.apellido,
                    this.usuarioIngreso.correo,
                    this.usuarioIngreso.contrasena,
                    this.usuarioIngreso.rol,
                    this.usuarioIngreso.compras,
                    this.usuarioIngreso.direccion,
                    this.usuarioIngreso.celular,
                    this.usuarioIngreso.subcripcion,
                    this.usuarioIngreso.estado
                   
                );
                    // creamos el objeto localStorage  
                    localStorage.setItem('sesion',JSON.stringify(datosUsuario));
                    localStorage.setItem('pelicula', JSON.stringify(this.pelicula));
                    let usuario = JSON.parse(localStorage.getItem('sesion'));
            
                    for(let i = 0 ; i < this.usuarioIngreso.correo.length ; i++){
                        if(this.usuarioIngreso.correo[i] == '@'){
                            this.inicio = i;
                        }
                    }
                    
                    let correo = this.usuarioIngreso.correo;
                    let correoUsu = correo.substr(this.inicio,8);
                    console.log(correoUsu);
                    console.log(this.inicio)
                    if(correoUsu == "@solaris"){
                        alert("administrador")
                        localStorage.setItem('pagina','administrador'); 
                    } else {
                        alert("usuario")
                        localStorage.setItem('pagina','usuario'); 
                        this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
                    }  
                    window.location.reload();    
        }
    },
    error =>{
        var errorMensaje = <any>error;
        if(errorMensaje != null){
            alert('Datos Incorrectos');
        }
    }
    )
}

}
