import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.css'
})
export class EmployeeNavbarComponent {
  constructor(private router:Router,private temporarydata:TemporaryDataService){
  }
  setRole(){
    this.temporarydata.setRole('Employee')
    // console.log(this.temporarydata.getRole)
    
  }
  deleteToken(){
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }
}
