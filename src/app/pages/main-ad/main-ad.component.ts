import { Component,OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';;
import { CommonModule } from '@angular/common';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { GetImage2, GetUser, TestGetResponse, UserSignUp } from '../../model/Get_res';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TripService } from '../../services/api/call_api.service';
import { Constants } from '../../config/constants';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Router,RouterModule } from '@angular/router';
import { ServiceParams } from '../../services/service_params';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-main-ad',
  standalone: true,
  imports: [MatToolbarModule,CommonModule, MatButtonModule, HttpClientModule,MatFormFieldModule,MatInputModule,FormsModule,RouterModule,MatIconModule,MatCardModule],
  templateUrl: './main-ad.component.html',
  styleUrl: './main-ad.component.css'
})
export class MainAdComponent implements OnInit{
  user_info_ad : GetUser[] = [];
  Ad_type : any;
  Ad_username : any;

  constructor(private http: HttpClient, private tripService : TripService,private router: Router,private S_params : ServiceParams) {}
  async ngOnInit() {
    this.user_info_ad =[];
    console.log(this.S_params.s_uid);
    console.log(this.S_params.s_type);

    this.Ad_type = this.S_params.s_type
    this.Ad_username = this.S_params.s_username

    this.user_info_ad =  await this.tripService.Get_admin(this.Ad_type);
    
    console.log(this.user_info_ad);
    }

    insert_X(time: HTMLInputElement) {
        console.log(time.value);
        this.S_params.s_Xtime = time.value;
        console.log(this.S_params.s_Xtime);
      }

    full_topten(){
      this.router.navigateByUrl('/full-top-ten');
    }
    sign_out(){
      this.router.navigateByUrl('');
    }
}
