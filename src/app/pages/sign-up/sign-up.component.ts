import { CommonModule } from '@angular/common';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { UserSignUp } from '../../model/Get_res';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TripService } from '../../services/api/call_api.service';
import { Constants } from '../../config/constants';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ServiceParams } from '../../services/service_params';
import {MatCardModule} from '@angular/material/card';
import { Router,RouterModule } from '@angular/router';




@Component({
  selector: 'app-call-api',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HttpClientModule,MatFormFieldModule,MatInputModule,FormsModule,MatSelectModule,MatCardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})


export class SignUpComponent {
  

  constructor(private http: HttpClient, private tripService : TripService,private constants : Constants,private S_params : ServiceParams,private router: Router) {}
  signUp : UserSignUp[] = [];
  signUp_status : any;

    async sign_up() {  
      const body = {
        email : this.email,
        username : this.username,
        password : this.password,
        type: this.type
      };

      if (this.email && this.username && this.password && this.type) {
        try {
          this.signUp_status = null;
          const response = await this.tripService.signUP(body);
          console.log("Response:", response);
          this.signUp_status = response;
        } catch (response) {
          console.error("Error:", response);
          this.signUp_status = response;
        }    
      } else {
        this.signUp_status = "Incomplete information!!!";
      }
      
    }

    go_sign_in(){
        this.router.navigateByUrl('');
    }

  email : string = ''; 
  username : string = ''; 
  password : string = ''; 
  type : string = ''; 
  types : types[] = [
    {value : 1 ,name : 'Admin'},
    {value : 2 ,name : 'User'}
  ]
}
interface types {
  value : number,
  name : string
}
