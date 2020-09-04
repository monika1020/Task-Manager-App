import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, Validators,

} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faEnvelope, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public uiInvalidCredential = false;

  public faEnvelope = faEnvelope;
  public faLock = faLock;
  public faFacebook = faFacebook;
  public faGoogle = faGoogle;
  public faLinkedin = faLinkedin;
  public faExclamationCircle = faExclamationCircle;

  public fbFormGroup = this.fb.group({


    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void { }

  async loginProcessHere() {
    const data = this.fbFormGroup.value;

    // ajax call
    const url = 'http://localhost:3000/auth-user';
    const result: any = await this.http.post(url, data).toPromise();
    if (result.opr) {
      sessionStorage.setItem('sid', 'true');
      this.router.navigate(['welcome']);
    } else {
      this.uiInvalidCredential = true;
    }
  }


  SignupHere() {
    this.router.navigate(['regi']);
  }

}
