import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserRegistration } from "../models/user-registration.model";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    private readonly codingExcecise: string = "https://codingexercise.speakcore.com/";
    private readonly newRegistrationApi: string = "api/registrations";

    constructor(private httpClient: HttpClient) {

    }

    public saveRegistration(userDetails: UserRegistration): Observable<any> {
        const httpHeaders: HttpHeaders = new HttpHeaders();
        httpHeaders.append("Access-Control-Allow-Origin", "*");
        return this.httpClient.post(this.codingExcecise + this.newRegistrationApi, userDetails, {headers: httpHeaders});
    }
}