import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Contact} from "../contact";
import {ContactService} from "../contact.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit{

  id: string;
  contact: Contact;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private contactService: ContactService) {
    this.id = this.activeRoute.snapshot.params["id"];
    this.contact = new Contact();
  }

  ngOnInit(): void {
    this.loadContactById();
  }

  loadContactById(): void {
    console.log(`Loading contact by id: ${this.id}`);
    this.contactService.getContactById(this.id).subscribe(
      (contact: Contact) => {
        console.log(contact);
        this.contact = contact;
      },
      (error) => {
        console.error(`Error loading contact: ${this.id}`, error);
      }
    );
  }

  saveContact() {
    this.contactService.updateContact(this.contact).subscribe(
      (updatedContact: Contact) => {
        console.log('Contact updated successfully:', updatedContact);
        // Update data in component
        this.contact = updatedContact;
        // Navigate or refresh view as needed
        this.router.navigate([`/contact/${this.id}`]); // Example: Navigate to contacts list page
      },
      (error) => {
        console.error('Error updating contact:', error);
        // Handle error
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
