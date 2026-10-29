import { Component, inject, OnInit, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../app/Core/Services/Flowbite/flowbite';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/Core/Services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {

  isLogin = signal<boolean>(false);

  private auth:AuthService=inject(AuthService);

  private router:Router=inject(Router);

    constructor(private flowbiteService: FlowbiteService) {}


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite ();
    });

    this.checkLogin();



}

checkLogin(){
  this.auth.userData.subscribe({
    next: (res) => {
      if(this.auth.userData.getValue() == null){
        this.isLogin.set(false);

      }
      else {
        this.isLogin.set(true);
      }
    }
  });

}

logout(){
  localStorage.removeItem('userToken');

  this.auth.userData.next(null);

  this.router.navigate(['/login']);


}
}
