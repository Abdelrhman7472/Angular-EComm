import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './Core/Services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from '../layout/footer/footer.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

    constructor(private flowbiteService: FlowbiteService) {}

ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite ();
    });
  }}
