import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tripFinder : 	FormGroup;

constructor(private fb: FormBuilder, public http: HttpClient){}


  ngOnInit(){
  	this.tripFinder = this.fb.group({
  		 code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6),Validators.pattern('^$|^[A-Za-z2-9]+')]],
  		 familyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30),Validators.pattern('^$|^[A-Za-z]+')]]
  		});
  	}

  onSubmit(form: FormGroup) {
    this.http.get('../assets/mock/mock.json').subscribe(data => {
      console.log(data);
    });
  }
}