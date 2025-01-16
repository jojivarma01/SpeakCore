import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  stateNames: string[] = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Telangana",
    "Tamil Nadu"
  ]

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirmEmail: ['', [Validators.required]],
      subscribeToNewsLetter: [true]
    })
  }

  onContinue(): void {
    console.log("registrationForm", this.registrationForm);
  }
}
