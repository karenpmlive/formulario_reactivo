import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/store/user.service';
import { UserModel } from 'src/app/model/userModel';
// import { UserModel} from '../../model/userModel';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { Observable } from 'rxjs';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  private user = new UserModel();


  constructor(
    private fbu: FormBuilder,
    private _servicio:UserService,
    private route: ActivatedRoute
  )
  {
    this.form = this.fbu.group({
      id: new FormControl(),
      name: ['',[
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)//solo letras
      ]],
      lastname: ['',[
        Validators.required,
        Validators.pattern(/^[A-Za-z\_\-\.\s\xF1\xD1]+$/)//solo lestras
      ]],
      email: ['',[
        Validators.required,
        Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),//correo debe tner @ y .com
      ]],
      telefono: ['',[
        Validators.required,
        Validators.pattern(/^([0-9])*$/)//solo numeros
      ]],
      password: ['',[
        Validators.required
      ]]
    });

  }

  ngOnInit() {
    const id: any = this.route.snapshot.paramMap.get('id'); // leer id de el URL  PARA ESO SE USA ESTE METODO

    if (id !== 'nuevo') {
        this._servicio.consultarPorId(id).subscribe(resp=>{
          this.user = resp;
          // console.log(resp);
        });
      }
  }

  guardarUse(){

    if (this.user.id) {
      console.log(this.user);
      this._servicio.updateServUser(this.user).subscribe(resp=>{
        console.log('Actualizada');
      });

    } else {

      const user = new UserModel();
      // console.log(this.form.value)
      user.name = this.form.get('name').value;
      user.lastname = this.form.get('lastname').value;
      user.email = this.form.get('email').value;
      user.password = this.form.get('password').value;

      this._servicio.crearServUsuario(user).subscribe(resp=>{
        console.log('guardo');
      });

    }



    // console.log(this.form);
  }

}
