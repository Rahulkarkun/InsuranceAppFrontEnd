import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-agent-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agent-customer-list.component.html',
  styleUrl: './agent-customer-list.component.css'
})
export class AgentCustomerListComponent {

}
