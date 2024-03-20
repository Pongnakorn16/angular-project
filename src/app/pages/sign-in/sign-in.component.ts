import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { TestGetResponse, UserSignUp } from '../../model/Get_res';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TripService } from '../../services/api/call_api.service';
import { Constants } from '../../config/constants';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Router,RouterModule } from '@angular/router';
import { ServiceParams } from '../../services/service_params';
import {MatCardModule} from '@angular/material/card';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HttpClientModule,MatFormFieldModule,MatInputModule,FormsModule,RouterModule,MatCardModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})


export class SignInComponent {

  constructor(private http: HttpClient, private tripService : TripService,private constants : Constants,private router: Router,private S_params : ServiceParams) {}
  signIn : TestGetResponse[] = [];
  signIn_check : any;

    async sign_in() {  
      console.log(this.email);
      console.log(this.password);
      this.signIn = [];
      this.signIn = await this.tripService.signIn(this.email,this.password);
      if(this.signIn.length == 0){
        this.signIn_check = "Invalid Email or Password"
      }
      else{
        this.signIn_check = null;
      }
      console.log(this.signIn);
      this.S_params.s_uid = this.signIn[0].uid;
      this.S_params.s_type = this.signIn[0].type;
      this.S_params.s_username = this.signIn[0].username;
      this.S_params.s_email = this.signIn[0].email;
      this.S_params.s_password = this.signIn[0].password;
      this.S_params.s_bio = this.signIn[0].bio;
      this.S_params.s_user_image = this.signIn[0].user_image;
      console.log(this.S_params.s_uid);
      console.log(this.S_params.s_username);
      console.log(this.S_params.s_type);
      console.log(this.S_params.s_password);
      console.log(this.S_params.s_bio);
      console.log(this.S_params.s_user_image);
      console.log(this.S_params.s_email);
      
      if(this.signIn.length != 0){    
        if (this.signIn[0].type == 'Admin') {
          this.router.navigateByUrl('/main-ad');
        }else{
          this.router.navigateByUrl('/main');
        }
    }
  }
  
  sign_up(){
    this.router.navigateByUrl('/sign-up');
  }

  go_main_noLog(){
    this.router.navigateByUrl('');
  }

  email : string = ''; 
  password : string = ''; 

  
}
