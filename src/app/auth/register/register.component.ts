import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.form.group({
    nombre: ['Harol', [Validators.required, Validators.minLength(3)]],
    email: ['harolpg17@hotmail.com',[Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private form: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    } 

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        // Navegar al dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  contrasenasValida() {
    const pas1 = this.registerForm.get('password').value;
    const pas2 = this.registerForm.get('password2').value;

    if (pas1 !== pas2  && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value  && this.formSubmitted;
  }

  passwordsIguales(passwordName: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(passwordName);
      const pass2Control = formGroup.get(password2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true});
      }
    }
  }

}
