import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent {
  weatherData:any;
  showError=false
  showData=false
  errorMessage=""
  constructor(private weatherInfo:WeatherService){
    weatherInfo.get().subscribe({
      next:(data)=>{
        this.weatherData=data
        this.showData=true
        this.showError=false
      },
      error:(errorResponse:HttpErrorResponse)=>{
        this.errorMessage="403 UnAuthorized User: Forbidden ! Only Admins can view Data.."
        this.showError=true
        this.showData=false
      }
    })
  }
}
