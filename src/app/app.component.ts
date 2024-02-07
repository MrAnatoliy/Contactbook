import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UpperCasePipe} from "@angular/common";
import {ContactListComponent} from "./contactlist/contact-list/contact-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contactsbook';
}
