import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css']
})
export class AuthenComponent implements OnInit {

  constructor(private routeur:Router) { }

  ngOnInit(): void {
  }

  loginClicked(){
    this.routeur.navigateByUrl('/dashboard');
  }

}
