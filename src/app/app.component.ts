import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tripFinder : FormGroup;
  dataObject: any;
  bookingCode: string;
  originCityName: string;
  originCountryName: string;
  destinationCityName: string;
  destinationCountryName: string;
  dataMatched: boolean = false;
  dataMissMatch:boolean = false;

constructor(private fb: FormBuilder, public http: HttpClient){}


  ngOnInit(){
  	this.tripFinder = this.fb.group({
  		 code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6),Validators.pattern('^$|^[A-Za-z2-9]+')]],
  		 familyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),Validators.pattern('^$|^[A-Za-z]+')]]
  		});
  	}

  onSubmit(form: FormGroup) {
    if(form.valid){
    this.http.get('../assets/mock/mock.json').subscribe(data => {
      this.dataObject = data;
      let getBookingCode  = this.dataObject.bookingCode;
      let getFamilyName  = this.dataObject.passengers.lastName;
      let formBookingCode = form.value.code;
      let formFamilyName = form.value.familyName;
      if(formBookingCode === getBookingCode && formFamilyName === getFamilyName){
       this.dataMatched =true;
       this.dataMissMatch = false;
       this.originCityName = this.dataObject.itinerary.connections[0].origin.city.name;
       this.originCountryName = this.dataObject.itinerary.connections[0].origin.city.country.name;
       this.destinationCityName = this.dataObject.itinerary.connections[0].destination.city.name;
       this.destinationCountryName = this.dataObject.itinerary.connections[0].destination.city.country.name;
      }else{
        this.dataMatched = false;
        this.dataMissMatch = true;
      }
    });
  }else{
        this.dataMatched = false;
        this.dataMissMatch = false;
  }
  }

}