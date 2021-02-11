import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //this.promesa();
    this.getUsuarios()
      .then(usuarios => {
        console.log(usuarios);
      });
  }

  promesa() {
    const promesa = new Promise((resolve, reject) => {
      
      if (false) {
        resolve('Hola mundo');
      } else {
        reject('Algo salio mal');
      }
      
    });

    promesa.then((mensaje) => {
      console.log(mensaje);
    }).catch(error => console.log(error));

    console.log('Fin del Init');
  }

  getUsuarios() {

    const promesa = new Promise(resolve => {
      
      fetch('https://reqres.in/api/users')
        .then(result => result.json())
        .then(body => resolve(body.data));
    });

    return promesa;
  }

}
