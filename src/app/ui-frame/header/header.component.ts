import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string;
  activeusername: string;
  isActiveUser;
  constructor(public authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.title ="Prediction League";
    this.authService.user$.subscribe((user =>{
      if(user && user.uid){
        this.isActiveUser =true;
      }else{
        this.isActiveUser=false;
      }
    }));
  }

  logout(){
    this.authService.logout().then(user => {
      this.router.navigate(['/user/logout']);
    })
  }

  
}
