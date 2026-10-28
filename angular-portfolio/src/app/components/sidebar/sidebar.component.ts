import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterLinkWithHref
} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterLinkWithHref], // ✅ Required for router directives
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {}



