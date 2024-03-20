import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router,RouterModule } from '@angular/router';
import { ServiceParams } from '../../services/service_params';
import { TripService } from '../../services/api/call_api.service';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  UserImage, TestGetResponse, GetUser} from '../../model/Get_res';


@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule,MatSelectModule,FormsModule,CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  uid : any;
  type : any;
  username : any;
  email : any;
  password : any;
  bio : any;
  user_image : any;
  save_check : any;
  save_check2 : any;

  constructor(private http : HttpClient,private router : Router,private S_params : ServiceParams,private tripService : TripService) {}
  signIn : GetUser[] = [];
  userInfo_uid : any;
  user_img_url : any;

   async ngOnInit()  {
    console.log("ASDASDASDASDaSDasd");
    this.userInfo_uid= this.S_params.s_uid;
    this.signIn  =  await this.tripService.get_user(this.userInfo_uid);;
    console.log(this.signIn);


    this.S_params.s_username = this.signIn[0].username;
    this.S_params.s_email = this.signIn[0].email;
    this.S_params.s_password = this.signIn[0].password;
    this.S_params.s_bio = this.signIn[0].bio;
    this.S_params.s_user_image = this.signIn[0].user_image;

    this.email = this.S_params.s_email;

    this.password = this.S_params.s_password;
    this.n_email = ''
    this.n_username = ''
    this.n_password = ''
    this.n_bio = ''
    this.n_Newpassword = ''

    

    this.type =  this.S_params.s_type;
    this.username = this.S_params.s_username;
    this.bio = this.S_params.s_bio;
    this.user_image = this.S_params.s_user_image;
  }
async upload() {
  this.save_check = null;
  this.save_check2 = null;
  if(this.file){
    const formData = new FormData();
    formData.append('file',this.file);
    this.user_img_url = await this.tripService.uplod_ava_image_fb(this.S_params.s_username,formData);
    this.S_params.s_url_userImage = this.user_img_url.filename;
    console.log(this.user_img_url.filename); 
    console.log(this.S_params.s_url_userImage);

  }

  if(this.n_email == ''){
    this.n_email = this.S_params.s_email;
  }
  else{
    this.S_params.s_email = this.n_email;
  }
  if(this.n_username == ''){
    this.n_username = this.S_params.s_username;
  }
  else{
    this.S_params.s_username = this.n_username;
  }
  if(this.n_password == ''){
    console.log(this.S_params.s_password);
    
    this.n_password = this.S_params.s_password;
  }
  else if(this.n_password == this.S_params.s_password){
    this.S_params.s_password = this.n_password;
  } else{
        console.log("WRONG!!! CURRENT PASSWORD");
        this.save_check2 = 1;
      }
 
  if(this.n_bio == ''){
    this.n_bio = this.S_params.s_bio;
  }
  else{
    this.S_params.s_bio = this.n_bio;
  }
  const body = {
    email : this.n_email,
    username : this.n_username,
    password : this.n_password,
    Newpassword : this.n_Newpassword,
    bio : this.n_bio,
    user_image : this.S_params.s_url_userImage
  };   
       await this.tripService.update(this.S_params.s_uid,body);
       this.ngOnInit()
       if(this.save_check2 == 1){
        this.save_check = null;
       }else{
        this.save_check = 1;
       }
  }
  

  async back() {
    this.router.navigateByUrl('/main');
  }
    file? : File;
  onFileSelected(event : Event){
    const target = event.target as HTMLInputElement;
    if(target.files){
      // ! => Comfirm that files is not NULL
      this.file = target.files![0];
    }
  }
  n_email : string = ''; 
  n_username : string = ''; 
  n_password : string = '';  
  n_Newpassword : string = '';
  n_bio : string = '';
}
