import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent {
  constructor(private router: Router) {}

  // navigateToMarketing() {
  //   this.router.navigate(['/marketing']);
  // }
}
