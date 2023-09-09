import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  username: any;
  password: any;

  constructor(private authService: AuthService, private router: Router) { }


  onLoginClick(): void {
    if (this.authService.login(this.username, this.password)) {
      // Successful login logic
      console.log('Login successful');

      // Redirect to the blog page
      this.router.navigate(['/main/blogs']);  // Replace 'blog' with the actual route path
    } else {
      // Failed login logic
      console.log('Login failed');
    }
  }


}
