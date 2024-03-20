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
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule,MatSelectModule,FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  uid : any;

  constructor(private http : HttpClient,private router : Router,private S_params : ServiceParams,private tripService : TripService) {}
  user_info : GetUser[] = [];
  userImage : any;
  Username : any;
  bio : any;

   async ngOnInit()  {
    console.log("Profile is readyyyy");
    this.uid = this.S_params.s_profile_uid;
    this.user_info = await this.tripService.get_user(this.uid);
    this.userImage = this.user_info[0].user_image;
    this.Username = this.user_info[0].username;
    this.bio = this.user_info[0].bio;
    console.log(this.user_info[0].username);
    
   }

  async back() {
    this.router.navigateByUrl('/main');
  }
}
