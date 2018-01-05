import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ FormsModule, ReactiveFormsModule ] 
    }).compileComponents();
  }));

it('form valid when sumbitted ', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const familynameInput = fixture.debugElement.query(By.css('#familyName'));
  const codeInput = fixture.debugElement.query(By.css('#code'));
  let familyname = familynameInput.nativeElement;
  let code = codeInput.nativeElement;
  familyname.value = "Allan";
  code.value = "789GH";
  const familynameValue = fixture.debugElement.query(By.css('#familynameMandate'));
  const codeValue = fixture.debugElement.query(By.css('#codeMandate'));
  expect(familynameValue).toBe(null);
  expect(codeValue).toBe(null);
});

it('form invalid when form empty and sumbitted ', () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.debugElement.query(By.css('#retriveBooking')).nativeElement.click();
  fixture.detectChanges();
  const familynameValue = fixture.debugElement.query(By.css('#familynameMandate')).nativeElement.innerText;
  const codeValue = fixture.debugElement.query(By.css('#codeMandate')).nativeElement.innerText;
  expect(familynameValue).toEqual("please enter a valid family name.");
  expect(codeValue).toEqual("please enter a valid booking code.");
});


});
