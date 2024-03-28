import { Component,OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';;
import { CommonModule } from '@angular/common';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import {GetCompareTopten, GetImage2, GetTopten, GetUser, GetUserName, TestGetResponse, UserSignUp } from '../../model/Get_res';
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
  selector: 'app-full-top-ten',
  standalone: true,
  imports: [MatToolbarModule,CommonModule, MatButtonModule, HttpClientModule,MatFormFieldModule,MatInputModule,FormsModule,RouterModule,MatIconModule,MatCardModule],
  templateUrl: './full-top-ten.component.html',
  styleUrl: './full-top-ten.component.css'
})
export class FullTopTenComponent implements OnInit{
  user_info_ad : GetUser[] = [];
  old_top_ten : any;
  top_ten : GetTopten[] = [];
  top_ten_uid : any;
  top_ten_userInfo : GetUserName[] = [];
  top_ten_username : any [] =[];
  combinedData: any[] | undefined;
  old_No : any[] = [];
  new_No : any[] = [];

  rank_pid : any;
  Today_rank : any;
  Yesterday_rank : any;
  CalRank : any;
  dok : any[] = [];


  constructor(private http: HttpClient, private tripService : TripService,private router: Router,private S_params : ServiceParams) {}
  async ngOnInit() {
    this.user_info_ad =[];
    console.log(this.S_params.s_uid);
    console.log(this.S_params.s_type);

    this.top_ten =  await this.tripService.getTopten();
    this.old_top_ten = await this.tripService.getRankTopten();

    this.top_ten_username = [];
    console.log(this.top_ten);
    console.log(this.old_top_ten);
  

    for(let i=0;i<this.old_top_ten.length;i++){

      this.rank_pid = this.old_top_ten[i].pid
      console.log(this.rank_pid);
      

      this.Today_rank = this.old_top_ten[i].Today_photo_No
      console.log(this.Today_rank);
      
      this.Yesterday_rank = this.old_top_ten[i].Yesterday_photo_No
      console.log(this.Yesterday_rank);

      if(this.Yesterday_rank == null){
        this.CalRank = 0;
      }else{
        this.CalRank = this.Yesterday_rank - this.Today_rank
      }
      console.log(this.CalRank);


      this.dok.push({ pid: this.rank_pid, resultRank: this.CalRank })
      console.log(this.dok);
    }
    
    
      for(let i=0;i<this.top_ten.length;i++){

        this.top_ten_uid = this.top_ten[i].uid
        this.top_ten_userInfo = await this.tripService.get_username(this.top_ten_uid);
        
        this.top_ten_username.push(this.top_ten_userInfo[0])
      }
      

      this.top_ten = this.top_ten.map((item, index) => {
        return { 
          ...item, 
          username: this.top_ten_username[index].username,
          resultRank: this.dok[index].resultRank
        };
      });
      

      console.log(this.top_ten);
      
    }


    back_to_main(){
      this.router.navigateByUrl('/main-ad');
    }
}
