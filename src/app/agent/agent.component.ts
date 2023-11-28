import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }
}
