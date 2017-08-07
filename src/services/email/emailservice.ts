import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Email} from '../../domain/email.domain';

@Injectable()
export class EmailService {

  constructor(private http: Http) {

  }

  sendEmail(email: Email): Promise<any> {
    return this.http.post('/api/email', email)
               .map(res => res.json())
               .toPromise();
  }

}
