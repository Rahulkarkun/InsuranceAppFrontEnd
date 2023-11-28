import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemporaryDataService } from '../services/temporary-data.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrl: './claim.component.css'
})
export class ClaimComponent {
  userRole:string=''
  constructor(private router: Router,private temporaryData:TemporaryDataService) 
  {this.userRole=temporaryData.getRole()
    console.log(this.userRole) }

  ngOnInit(): void {
  }

  redirectTo(route: string): void {
    this.router.navigate([route]);
  }
  viewClaim(){
    console.log("hih")
    //debugger
    this.temporaryData.setRole('Admin')
    this.router.navigateByUrl("/claim-list")
    // console.log(this.temporarydata.getRole)
    
  }
}
