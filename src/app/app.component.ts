import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-form';
  reactiveForms :FormGroup;
  formStatus;

  ngOnInit(): void {
    this.reactiveForms=new FormGroup({
      
        personalDetails:new FormGroup({
          firstName:new FormControl(null,[Validators.required,Validators.min(5),this.noSpace]),    
      age:new FormControl(null,Validators.required),   
      email:new FormControl(null,[Validators.required,Validators.email]),  

        }),  
      gender:new FormControl('Male'),
      city:new FormControl('Salem'),
      skills:new FormArray([
        new FormControl(null,[Validators.required,Validators.maxLength(10)]),
       
      ])
      
     
       })
      //  this.reactiveForms.get('personalDetails.firstName').valueChanges.subscribe((value)=>{
      //   console.log(value)
      // })
      // this.reactiveForms.valueChanges.subscribe((value)=>
      // {
      //   console.log(value)
      // })
      this.reactiveForms.statusChanges.subscribe((value)=>
      {
        console.log(value)
        this.formStatus=value;
      })
  }
  onSubmit()
  {
    console.log(this.reactiveForms)
  }
  addSkills()
  {
    (<FormArray>this.reactiveForms.get('skills')).push(new FormControl(null,Validators.required))
  }
  //Custom Validation
  noSpace(control :FormControl)
  {
    if(control.value !=null && control.value.indexOf(' ')!=-1)
    {
        return{noSpace:true}
    }
    return null;
  }
 
}
