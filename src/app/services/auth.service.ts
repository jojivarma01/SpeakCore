import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isUserAuthenticated(): boolean {
        return !!JSON.parse(sessionStorage.getItem('userAuthenticated') as string)
    }

    setUserAuthenticated(): void {
        sessionStorage.setItem('userAuthenticated', 'true');
    }
}