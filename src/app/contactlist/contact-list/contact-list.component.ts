import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service'; // Update the path to your ContactService
import { Contact } from '../contact';
import {NgForOf} from "@angular/common"; // Update the path to your Contact model

@Component({
    selector: 'app-contact-list',
    standalone: true,
    imports: [
        NgForOf
    ],
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
      console.log("Loading contacts");
    this.contactService.getAllContacts().subscribe(
      (contacts: Contact[]) => {
          console.log(contacts);
        this.contacts = contacts;
      },
      (error) => {
        console.error('Error loading contacts:', error);
      }
    );
  }
}
