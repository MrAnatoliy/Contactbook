import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ContactService } from '../contact.service'; // Update the path to your ContactService
import { Contact } from '../contact';
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router"; // Update the path to your Contact model

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

  constructor(
    private contactService: ContactService,
    private router: Router,
    private ref:ChangeDetectorRef
    ) { }

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

  newContact() {
    let contact = new Contact();
    contact.first_name = "Name";
    contact.last_name = "Surname";
    this.contactService.addContact(contact).subscribe(
      (newContact: Contact) => {
        console.log('Contact has been created successfully:');
        // Navigate or refresh view as needed
        this.router.navigate([`/contact/${newContact._id}`]); // Example: Navigate to contacts list page
      },
      (error) => {
        console.error('Error creating contact:', error);
        // Handle error
      }
    );
  }

  deleteContact(_id: string) {
    this.contactService.deleteContact(_id).subscribe(
      () => {
        console.log(`Contact ${_id} has been deleted successfully`);
        this.loadContacts();
      },
      (error) => {
        console.error('Error deleting contact:', error);
      }
    );
  }
}
