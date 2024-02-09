import { Routes } from '@angular/router';
import {ContactListComponent} from "./contactlist/contact-list/contact-list.component";
import {ContactDetailsComponent} from "./contactlist/contact-details/contact-details.component";
import {NotFoundComponent} from "./contactlist/not-found/not-found.component";

export const routes: Routes = [
  {path: "", component: ContactListComponent},
  {path: "contact/:id", component: ContactDetailsComponent},
  {path: "**", component: NotFoundComponent }
];
