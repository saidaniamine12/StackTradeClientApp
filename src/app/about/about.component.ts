import {AfterViewInit, Component, OnInit} from '@angular/core';
import {catchError, Observable, of, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  //oneWayBinding
  myName : string = "amine";
  isValid : boolean = true;
  //two way binding
  secondName : string = "";
  searchInput : FormControl = new FormControl();
  weather:string = '';
  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/find?q=';
  private apiKey = '6235f2493d9b60fc9bff5845a9b4df0c';
  private units = 'metric'; // or 'imperial' for Fahrenheit
  constructor(private http: HttpClient) {
    this.isValid = this.myName.length > 0 ? false : true;
  }

  onClickEvent() {
    console.log("button clicked");
  }


  onInputEvent(value: Event): void {
    console.log(value);
    // Perform further logic here
  }



  getWeather(city: string): Observable<any> {
    const url = `${this.baseWeatherURL}${city}&units=${this.units}&appid=${this.apiKey}`;

    // @ts-ignore
    return this.http.get<any>(url).pipe(
      catchError(err => {
        if (err.status === 404) {
          //console.log(`City ${city} not found`);

        }else if (err.status === 400){
          console.log(`City ${city} not found`);
        }
         throw err;})
    );
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(switchMap(city => this.getWeather(city)))
      .subscribe(
        res => {
          if (res && res.list && res.list.length !== 0) {
            console.log(res.list[0]['main']);
            this.weather =
              `Current temperature is ${res.list[0]['main'].temp} C, ` +
              `humidity: ${res.list[0]['main'].humidity}% in ${res.list[0].name}`;
          } else {
            this.weather = ''; // Set default value if response is invalid
          }
        },
        err => {
          console.log(`Can't get weather. Error code: %s, URL: %s`,
            err.message, err.url);
          this.weather = ''; // Set default value in case of error
        }
      );
  }

}
