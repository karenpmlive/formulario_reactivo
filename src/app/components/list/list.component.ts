import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/store/user.service';
import { UserModel } from '../../model/userModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: []
})
export class ListComponent implements OnInit {
  private user: UserModel[] = [];

  constructor(
    private _servicio: UserService
  ) { }

  ngOnInit() {
    this.listarUser();
  }

  listarUser(){
    this._servicio.consultarTodas().subscribe(resp=>{
      this.user = resp;
      console.log(resp);
    });
  }

  eliminarUser(user: UserModel){
    this._servicio.deletePorId(user).subscribe(resp=>{
      console.log('elimnado');
      this.listarUser();
    });
  }

}
