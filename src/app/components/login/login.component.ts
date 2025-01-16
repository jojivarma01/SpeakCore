import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  incorrectPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin(): void {
    // console.log(this.loginForm);
    // console.log("login button clicked")
    if(this.loginForm?.controls?.['password']?.value === 'SpeakCore!') {
      this.incorrectPassword = false;
      this.authService.setUserAuthenticated();
      this.router.navigate(['new-registration']);
    } else {
      this.incorrectPassword = true;
      this.loginForm?.controls?.['password'].setValue('');
    }
  }
}
