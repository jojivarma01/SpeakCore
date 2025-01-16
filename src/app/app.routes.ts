import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserAuthGuard } from './guards/user-auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'new-registration',
        component: RegistrationComponent,
        canActivate: [UserAuthGuard]
    },
    {
        path: 'confirmation',
        component: ConfirmationComponent,
        canActivate: [UserAuthGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
