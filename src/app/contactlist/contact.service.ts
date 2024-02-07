import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiUrl = 'http://localhost:8080/contacts'; // API endpoint URL

    constructor(private http: HttpClient) {}

    // Method to get all contacts from the API
    getAllContacts(): Observable<Contact[]> {
        console.log("Getting all contacts...");
        return this.http.get<Contact[]>(this.apiUrl);
    }

    // Method to get a single contact by ID
    getContactById(id: string): Observable<Contact> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Contact>(url);
    }

    // Method to add a new contact
    addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(this.apiUrl, contact);
    }

    // Method to update an existing contact
    updateContact(updatedContact: Contact): Observable<Contact> {
        const url = `${this.apiUrl}/${updatedContact._id}`;
        return this.http.put<Contact>(url, updatedContact);
    }

    // Method to delete a contact
    deleteContact(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
