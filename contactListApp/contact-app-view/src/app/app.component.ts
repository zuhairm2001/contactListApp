import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from './services/contact.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatHeaderRow, MatHeaderCell, MatRow, MatCell } from '@angular/material/table'; // Import necessary directivesimport { MatButtonModule } from '@angular/material/button';

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
  ],
  providers: [ContactService],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contacts: Contact[] = [];
  newContact: Contact = { name: '', email: '', phone: '' };
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  addContacts(){
    this.contactService.addContact(this.newContact).subscribe(() => {
      this.fetchContacts();
      this.newContact = { name: '', email: '', phone: '' };
    });
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(() => this.fetchContacts());
  }
}
