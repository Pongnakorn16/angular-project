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
import { GetImage2} from '../../model/Get_res';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule,MatSelectModule,FormsModule,CommonModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent implements OnInit{
  pid : any;
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
  getImage : GetImage2[] = [];
  count :any
  count2 : any
  user_img_url : any;
  upload_chk : any;
  delete_chk : any;

   async ngOnInit()  {
    console.log("ASDASDASDASDaSDasd");
    this.uid = this.S_params.s_uid;
    this.password = this.S_params.s_password;
    this.getImage =[];
    this.getImage = await this.tripService.getImage2(this.uid);
    console.log(this.getImage);
    if(this.getImage.length == 5){
      this.upload_chk = null;
      this.delete_chk = 1;
    }else if (this.getImage.length == 0){
      this.upload_chk  = 1;
      this.delete_chk = null;
    }else{
      this.upload_chk  = 1;
      this.delete_chk = 1;
    }

    
    
    this.uid = this.S_params.s_uid;
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
    this.user_img_url = await this.tripService.uplod_image_fb(formData);
    this.S_params.s_user_image = this.user_img_url.filename;
    console.log(this.user_img_url.filename); 
    console.log(this.S_params.s_user_image);

    const body = {
      image_url : this.S_params.s_user_image,
    };   

    await this.tripService.upload(this.S_params.s_uid,body);
    this.ngOnInit()
  }
}

getPid(input: any){
  this.S_params.s_pid = input;
  console.log(this.S_params.s_pid);  
}

async update() {
  if(this.file){
    const formData = new FormData();
    formData.append('file',this.file);
    this.user_img_url = await this.tripService.uplod_image_fb(formData);
    this.S_params.s_user_image = this.user_img_url.filename;
    const body = {
      image_url : this.S_params.s_user_image
    }; 

    await this.tripService.update2(this.S_params.s_pid,body);
    this.ngOnInit()
  }
}

async delete() {
    await this.tripService.delete(this.S_params.s_pid);
    this.ngOnInit()
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
}

