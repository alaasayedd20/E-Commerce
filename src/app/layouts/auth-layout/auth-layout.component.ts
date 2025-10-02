import { Component } from '@angular/core';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { RegisterComponent } from "../../components/register/register.component";
import { LoginComponent } from "../../components/login/login.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavAuthComponent, RegisterComponent, LoginComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
