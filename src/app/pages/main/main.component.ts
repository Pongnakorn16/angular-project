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
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatToolbarModule,CommonModule, MatButtonModule, HttpClientModule,MatFormFieldModule,MatInputModule,FormsModule,RouterModule,MatIconModule,MatCardModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  images : GetImage2[] =[]
  img_url : any;
  user_info_o : GetUser[] = []
  user_info : any
  m_uid : any;
  img1_uid : any;
  img2_uid  : any;
  img1_pid : any;
  img2_pid  : any;
  img1_score : any;
  img2_score  : any;
  E_img1 : any;
  E_img2 : any;
  Elo_K : any;
  Elo_s_img1 : any;
  Elo_s_img2 : any;
  R_score_img1 : any;
  R_score_img2 : any;
  Change_chk : any;
  Winner_score :any;
  Image_info_for_1 : any
  Winner_uid : any;
  increase_score : any;
  decrease_score : any;
  SED_score : any;
  SED_pid : any;
  SED_date : any;
  SED_day : any;
  SED_month : any;
  SED_year : any;
  SED_hour : any;
  SED_minute : any;
  vote_chk : any;
  images_score1 : any;
  result_score1 : any;
  increase_score1 : any;
  decrease_score1 : any;
  images_score2 : any;
  result_score2 : any;
  increase_score2 : any;
  decrease_score2 : any;
  X_time : any;
  sec : any;

     async ngOnInit() {
      if(this.S_params.s_Xtime == null){
        this.X_time = 10;
        console.log(this.X_time);
        
      }else{
        this.X_time = this.S_params.s_Xtime;
        console.log(this.X_time);
        
      }
      
      console.log(this.S_params.s_uid);
      this.images =[];
      this.images =  await this.tripService.getImage();
      console.log(this.images);
      this.S_params.s_image_score = this.images

      this.SED_date = await this.tripService.getSEDdate();
      const currentDate = new Date(); 
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentYear = currentDate.getFullYear();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      this.SED_day = this.SED_date[0].date.split("-")[2];
      this.SED_month = new Date(this.SED_date[0].date).getMonth() + 1;
      this.SED_year = new Date(this.SED_date[0].date).getFullYear();




      console.log(this.SED_date);
      console.log(this.SED_day);
      console.log(this.SED_month);
      console.log(this.SED_year);
      console.log(this.SED_hour);
      console.log(this.SED_minute);
      
      
      console.log(currentDay);
      console.log(currentMonth);
      console.log(currentYear);
      console.log(currentHour);
      console.log(currentMinute);

           this.img_url = this.getRandomImages(this.images, 2 ,this.X_time);
           this.vote_chk = null;
      console.log(this.img_url);
      if(this.img_url.length == 1){
        this.ngOnInit();
      }else{
      this.img1_pid = this.img_url[0].pid;
      this.img1_uid = this.img_url[0].uid;
      this.img1_score = this.img_url[0].score;
      this.img2_pid = this.img_url[1].pid;
      this.img2_uid = this.img_url[0].uid;
      this.img2_score = this.img_url[1].score;
      }

      console.log(this.img1_pid);
      console.log(this.img2_pid);

      console.log(this.img1_score);
      console.log(this.img2_score);
      
      this.user_info =[];
      for(let i = 0; i < this.img_url.length; i++){
        let lm = this.img_url[i].uid;
        this.m_uid = lm;
        this.user_info_o =  await this.tripService.get_user(this.m_uid);
        this.user_info.push(this.user_info_o[0]) 
        console.log(this.user_info);
        console.log(this.user_info_o);
        
      }   
      
      
      this.Elo_K = 32;////////////////////////////////// KKK

      this.E_img1 = 1 / (1 + Math.pow(10, (this.img2_score - this.img1_score) / 400))
      this.E_img2 = 1 / (1 + Math.pow(10, (this.img1_score - this.img2_score) / 400))
      console.log(this.E_img1);
      console.log(this.E_img2);
    }

    go_profile(uid : any){
      this.S_params.s_profile_uid = uid;
      this.router.navigateByUrl('/profile');
    }
    
    User_info(){
      this.router.navigateByUrl('/user-info');
    }

    Upload(){
      this.router.navigateByUrl('/upload-image');
    }

    graph(){
      this.router.navigateByUrl('/graph');
    }

    topten(){
      this.router.navigateByUrl('/top-ten');
    }

    sign_out(){
      this.router.navigateByUrl('');
    }

    async vote(input_pid : any){
      if(this.S_params.s_Delay_chk == 1 && input_pid == this.S_params.s_vote_pid_chk){
         this.vote_chk = 3
      }else{
        if(input_pid == this.img1_pid && this.vote_chk == null){
          this.S_params.s_vote_pid = input_pid;
          console.log(this.S_params.s_vote_pid);
          
        }else if(input_pid == this.img2_pid && this.vote_chk == null){
          this.S_params.s_vote_pid = input_pid;
          console.log(this.S_params.s_vote_pid);
        }

      console.log(this.S_params.s_vote_pid);
      console.log(this.S_params.s_uid);
      
      if(input_pid == this.img1_pid && this.vote_chk != 2){ ////////// img1 win

        this.vote_chk = 1

        this.Change_chk  = 1

        this.Elo_s_img1 = 1
        this.Elo_s_img2 = 0

        this.R_score_img1 = Math.ceil(this.img1_score + this.Elo_K * (this.Elo_s_img1 - this.E_img1));
        this.R_score_img2 = Math.floor(this.img2_score + this.Elo_K * (this.Elo_s_img2 - this.E_img2));

        this.increase_score = this.R_score_img1 - this.img1_score;
        this.decrease_score = this.img2_score - this.R_score_img2;

        this.images_score1 = this.img1_score
        this.result_score1 = this.R_score_img1
        this.increase_score1 = this.increase_score

        this.images_score2 = this.img2_score
        this.result_score2 = this.R_score_img2
        this.decrease_score2 = this.decrease_score

        const body = {
          lose_pid : this.img2_pid,
          R_score_win: this.R_score_img1,
          R_score_lose: this.R_score_img2
        };

        console.log(this.img1_pid);
        console.log(this.img2_pid);
        console.log(this.R_score_img1);
        console.log(this.R_score_img2);

        console.log(this.increase_score);
        console.log(this.decrease_score);
        
        await this.tripService.updateScore(this.img1_pid,body);
        await this.tripService.updateSED(input_pid,body);


        const body1 = {
          vote_uid: this.S_params.s_uid,
          loser_pid: this.img2_pid,
          increase_score: this.increase_score,
          decrease_score: this.decrease_score,
        };
        await this.tripService.vote(this.S_params.s_vote_pid,body1);

      }else if(input_pid == this.img2_pid && this.vote_chk != 1){ ////////// img2 win

        this.vote_chk = 2

        this.Change_chk  = 2

        this.Elo_s_img1 = 0
        this.Elo_s_img2 = 1

        this.R_score_img1 = Math.ceil(this.img1_score + this.Elo_K * (this.Elo_s_img1 - this.E_img1));
        this.R_score_img2 = Math.floor(this.img2_score + this.Elo_K * (this.Elo_s_img2 - this.E_img2));

        this.increase_score = this.R_score_img2 - this.img2_score;
        this.decrease_score = this.img1_score - this.R_score_img1;

        this.images_score2 = this.img2_score
        this.result_score2 = this.R_score_img2
        this.increase_score2 = this.increase_score

        this.images_score1 = this.img1_score
        this.result_score1 = this.R_score_img1
        this.decrease_score1 = this.decrease_score

        const body = {
          lose_pid : this.img1_pid,
          R_score_win: this.R_score_img2,
          R_score_lose: this.R_score_img1
        };

        console.log(this.img1_pid);
        console.log(this.img2_pid);
        console.log(this.R_score_img1);
        console.log(this.R_score_img2);

        await this.tripService.updateScore(this.img2_pid,body);
        await this.tripService.updateSED(input_pid,body);


        const body2 = {
          vote_uid: this.S_params.s_uid,
          loser_pid: this.img1_pid,
          increase_score: this.increase_score,
          decrease_score: this.decrease_score,
        };
        await this.tripService.vote(this.S_params.s_vote_pid,body2);
      }
      setTimeout(() => {
        this.ngOnInit(); 
      }, 2000);
    }
  }


  constructor(private http: HttpClient, private tripService : TripService,private constants : Constants,private router: Router,private S_params : ServiceParams) {}
  getRandomImages(images: any[], count: number, X_time: number): any[] {
    const shuffled = images.sort(() => 0.5 - Math.random());
    const selectedImages = [];
    let sameVoteLogged = false;

    for (let i = 0; i < shuffled.length; i++) {
        const currentImage = shuffled[i];
        let isValid = true;

        for (const selectedImage of selectedImages) {
            if (Math.abs(currentImage.score - selectedImage.score) > 150 || currentImage.uid === selectedImage.uid) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            selectedImages.push(currentImage);
            if (currentImage.pid === this.S_params.s_vote_pid && !sameVoteLogged) {
                this.S_params.s_vote_pid_chk = this.S_params.s_vote_pid
                this.S_params.s_Delay_chk = 1
                console.log("Same Image");
                this.countdown(X_time);
            }
        }

        if (selectedImages.length === count) {
            break;
        }
    }

    return selectedImages;
}

countdown = (seconds: number) => {
    const interval = setInterval(() => {
        console.log(seconds);
        this.sec = seconds;
        seconds--;

        if (seconds < 0) {
            clearInterval(interval);
            console.log("You can vote now");
            this.S_params.s_Delay_chk = 2
            if(this.vote_chk == 3){
              this.vote_chk = 4
            }
        }
    }, 1000);
}
}

