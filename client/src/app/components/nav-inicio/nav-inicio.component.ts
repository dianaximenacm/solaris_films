import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Pelicula } from '../../modelo/pelicula';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-inicio',
  templateUrl: './nav-inicio.component.html',
  styleUrls: ['./nav-inicio.component.css']
})
export class NavInicioComponent implements OnInit {

  public usuarioRegistro : Usuario;
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
    this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
    this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
    this.pelicula = new Pelicula("",0,"","","","","","","","",0,"","","","",true);
   }

  ngOnInit(): void {
      
  }

  home(){
    localStorage.setItem("pagina","home");
    window.location.reload();
  }

  registrarUsuario(){
    this.usuarioServicio.Registro(this.usuarioRegistro).subscribe(
        (response : any)=>{
            let usuario = response.usuario;
            let mensaje = response.message;
            this.usuarioRegistro = usuario;
            if(!this.usuarioRegistro){
               alert(mensaje);
                this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
            }else {
               alert(mensaje);
                this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
                this._router.navigate(['/']);
            }
        },
        error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
               console.log(errorMensaje);
            }
        }
    )

}


  ingresoUsuario(){
    this.usuarioServicio.ingreso(this.usuarioIngreso).subscribe((response : any)=>{
        let validar = response.usuario;
        let mensaje = response.message; 
        this.usuarioIngreso = validar;
        if(!this.usuarioIngreso){
           alert(mensaje);
            this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
        } else if(this.usuarioIngreso.estado){
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
                    this.usuarioIngreso.suscripcion,
                    this.usuarioIngreso.estado
                   
                );
                    // creamos el objeto localStorage  
                    localStorage.setItem('sesion',JSON.stringify(datosUsuario));
                    localStorage.setItem('pelicula', JSON.stringify(this.pelicula));
                    //let usuario = JSON.parse(localStorage.getItem('sesion'));
            
                    for(let i = 0 ; i < this.usuarioIngreso.correo.length ; i++){
                        if(this.usuarioIngreso.correo[i] == '@'){
                            this.inicio = i;
                        }
                    }
                    
                    let correo = this.usuarioIngreso.correo;
                    let correoUsu = correo.substr(this.inicio,8);
                    if(correoUsu == "@solaris"){
                        alert("Bienvenido administrador")
                        localStorage.setItem('pagina','administrador'); 
                        localStorage.setItem('usuarioEncontrado',JSON.stringify(this.usuarioIngreso));                       
                    } else {
                        alert("usuario")
                        localStorage.setItem('pagina','usuario'); 
                    }  
                    window.location.reload();    
                    
        } else {
            alert('Tu cuenta se encuentra bloqueada, por favor contáctanos para más información');
        }
    },
    error =>{
        var errorMensaje = <any>error;
        if(errorMensaje != null){
          console.log(errorMensaje);  
        }
    }
    )
}

contacto() {
    localStorage.setItem("pagina", "nosotros");
    window.location.reload()
  }
  
}
