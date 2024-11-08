import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.clearToken();

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/products']);
      },
      (error) => {
        this.showModalWithMessage('Nome de usuário ou senha inválidos.');
      }
    );
  }

  onRegister() {
    this.clearToken();
  
    const credentials = this.loginForm.value;
    this.authService.register(credentials).subscribe(
      (response) => {
        console.log('Registro bem-sucedido:', response);
        this.showModalWithMessage('Cadastro realizado com sucesso!');
      },
      (error) => {
        console.error('Erro no registro:', error);
        this.showModalWithMessage('Erro ao registrar. Tente novamente.');
      }
    );
  }
  

  private clearToken() {
    localStorage.removeItem('token');
  }

  showModalWithMessage(message: string) {
    this.errorMessage = message.includes('sucesso') ? '' : message;
    this.successMessage = message.includes('sucesso') ? message : '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onOverlayClick(event: MouseEvent) {
    if ((<HTMLElement>event.target).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
