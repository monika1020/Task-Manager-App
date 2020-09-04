import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public uiInvalidCredential = false;

  public faUser = faUser;
  public faEnvelope = faEnvelope;
  public faLock = faLock;
  public faFacebook = faFacebook;
  public faGoogle = faGoogle;
  public faLinkedin = faLinkedin;

  public fbFormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  async registerHere() {
    const data = this.fbFormGroup.value;
    const url = 'http://localhost:3000/adduser';

    await this.http.post(url, data).toPromise();

    this.router.navigate(['login']);
  }

  SigninHere() {
    this.router.navigate(['login']);
  }

}
