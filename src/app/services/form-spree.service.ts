//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormSpreeService {
  constructor(/*private http: HttpClient*/) {}

  sendMessage(data: object) {
    //return this.http.post(
    //  `${environment.URI_FORMSPREE}/${environment.TEMPLATE_EMAIL_ID}`,
    //  data
    //);
  }
}
