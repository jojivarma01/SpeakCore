import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, this.validEmail]],
      confirmEmail: ['', [Validators.required, this.validEmail]],
      subscribe: [true]
    })

    this.registrationForm.controls['confirmEmail'].valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((confirmedEmail: string) => {
      if (this.registrationForm.controls['email'].value !== confirmedEmail) {
        this.registrationForm.controls['confirmEmail'].setErrors({email: 'email does not match with above'});
      }
    })
  }

  onContinue(): void {
    // console.log("registrationForm", this.registrationForm);
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

  private validEmail(control: AbstractControl): ValidationErrors | null {
    // console.log("control", control);
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if (!emailRegExp.test(control.value)) {
      return {email: "please enter valid email"}
    }

    return null;
  }
}
