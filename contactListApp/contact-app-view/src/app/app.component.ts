import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from './services/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatHeaderRow, MatHeaderCell, MatRow, MatCell } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { catchError, of } from 'rxjs';


@Component({

  selector: 'app-root',
  standalone: true,
  imports: [
  FormsModule,
  HttpClientModule,
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatHeaderRow,
  MatHeaderCell,
  MatRow,
  MatCell,
  MatButtonModule,
  ],
  providers: [ContactService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  })
  
  export class AppComponent implements OnInit {
    contacts: Contact[] = [];
    newContact: Omit<Contact, 'id'> = { name: '', email: '', phone: '' }; // Use Omit
    displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
    errorMessage: string = ''; // For error display
  
    constructor(private contactService: ContactService) { }
  
    ngOnInit(): void {
      this.fetchContacts();
    }
  
    fetchContacts(): void {
      this.contactService.getContacts().pipe(
        catchError(error => {
          this.errorMessage = error.message; // Display error
          console.error("Error fetching contacts:", error);
          return of([]); // Return empty array to avoid breaking the app
        })
      ).subscribe(contacts => this.contacts = contacts);
    }
  
    addContact(): void {
      this.contactService.addContact(this.newContact).pipe(
        catchError(error => {
          this.errorMessage = error.message;
          console.error("Error adding contact:", error);
          return of(null); // Or handle as needed
        })
      ).subscribe(addedContact => {
        if (addedContact) { // Check if the contact was actually added
          this.fetchContacts();
          this.newContact = { name: '', email: '', phone: '' };
        }
      });
    }
  
    deleteContact(id: number): void {
      this.contactService.deleteContact(id).pipe(
        catchError(error => {
          this.errorMessage = error.message;
          console.error("Error deleting contact:", error);
          return of(null);
        })
      ).subscribe(() => this.fetchContacts());
    }
  }
   