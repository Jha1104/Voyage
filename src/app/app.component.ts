import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./app/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeaderComponent, RouterModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Fixed this line
})
export class AppComponent {
  title = 'rashi';
}
