import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, RouterLinkActive, ButtonModule, MatSlideToggleModule, HomeComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
