import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { UserRegistration } from '../../models/user-registration.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(private fb: FormBuilder,
    private router: Router,
    private registrationService: RegistrationService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      state: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirmEmail: ['', [Validators.required]],
      subscribe: [true]
    })
  }

  onContinue(): void {
    console.log("registrationForm", this.registrationForm);
    const formValue =  this.registrationForm.value;
    const userDetails: UserRegistration = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      state: formValue.state,
      email: formValue.email,
      subscribe: formValue.subscribe,
    }
    this.registrationService.saveRegistration(userDetails).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.router.navigate(['confirmation']);
    })
  }
}
