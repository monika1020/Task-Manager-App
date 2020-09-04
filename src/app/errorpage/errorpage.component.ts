import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {
  public faHeart = faHeart;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  gotohome() {
    this.router.navigate(['home']);
  }


}
