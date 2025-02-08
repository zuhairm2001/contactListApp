import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl = 'http://localhost:5228/api/Contacts';
  
  constructor(private http: HttpClient ) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
