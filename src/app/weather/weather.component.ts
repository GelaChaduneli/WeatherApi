import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherWithDesiredFields } from '../interfaces/weather';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  constructor(private weatherService: WeatherService) { }

  weatherInfo !: WeatherWithDesiredFields

  weatherSubscription$: Subscription;

  ngOnInit(): void {
  }

  getWeather(cityName: string) {
    this.weatherSubscription$ = this.weatherService.getWeatherByCityName(cityName).subscribe({
      next: res => this.weatherInfo = res,
      error: err => alert(err.message)
    })
  }

  ngOnDestroy(): void {
    this.weatherSubscription$.unsubscribe();
  }

}
