import { Injectable } from '@angular/core';
import { Constants } from '../../config/constants';
import { HttpClient } from '@angular/common/http';
import { UserImage, TestGetResponse, GetImage2, GetUser, GetSEDdate, GetTopten, GetUserName, GraphScore, GetCompareTopten } from '../../model/Get_res';
import { lastValueFrom } from 'rxjs';
import { ServiceParams } from '../service_params';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private constants : Constants,private http : HttpClient,private S_params : ServiceParams) { }

  public async signUP(body: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let url = this.constants.API_ENDPOINT + '/db';

      this.http.post(url, body).subscribe((response: any) => {
        if (response.error === "Email already exists") {
          this.S_params.s_signUp_check = response.error;
          console.log(this.S_params.s_signUp_check);
          console.log("Email already exists");
          reject(response.error);
        } else {
          this.S_params.s_signUp_check = "Sign up successful";
          console.log(this.S_params.s_signUp_check);
          console.log("Sign up successful");
          resolve(this.S_params.s_signUp_check);
        }
      });
    });
  }
  
  public async Get_admin(type : any){
    let url = this.constants.API_ENDPOINT + '/db';
    url += '/admin'+ '/' + type
    const response = await lastValueFrom(this.http.get(url));
    return response as GetUser[];
}
  

  public async signIn(email : any,password : any){
      let url = this.constants.API_ENDPOINT + '/db';
      console.log(email);
      console.log(password);
      url += '/' + email + '/' + password;

      const response = await lastValueFrom(this.http.get(url));
      return response as TestGetResponse[];
  }

  public async update(uid : any,body : any){
    let url = this.constants.API_ENDPOINT + '/db';
    console.log(uid); 
    url += '/' + uid;
    const response = await lastValueFrom(this.http.put(url, body));
    return response 
}

public async uplod_ava_image_fb(username : any,formData : any){
  let url = this.constants.API_ENDPOINT + '/upload';
  url += '/' + username;
  const response = await lastValueFrom(this.http.post(url,formData));
  return response
}

public async uplod_image_fb(formData : any){
  let url = this.constants.API_ENDPOINT + '/upload';
  url += '/' ;
  const response = await lastValueFrom(this.http.post(url,formData));
  return response
}

public async upload(uid : any,body : any){
  let url = this.constants.API_ENDPOINT + '/db';
  console.log(uid); 
  url += '/upload/' + uid;
  const response = await lastValueFrom(this.http.post(url, body));
  return response 
}

public async update2(pid : any,body : any){
  let url = this.constants.API_ENDPOINT + '/db';
  console.log(pid); 
  url += '/update/' + pid
  const response = await lastValueFrom(this.http.put(url, body));
  return response 
}

public async getImage(){
  let url = this.constants.API_ENDPOINT+'/db';
  url += '/image';
  const response =  await lastValueFrom(this.http.get(url));
  return response as GetImage2[];
}

  public async getImage2(uid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/image'+ uid;
    const response =  await lastValueFrom(this.http.get(url));
    return response as GetImage2[];
  }

  public async getGraphScore(pid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/graphScore'+ pid;
    const response =  await lastValueFrom(this.http.get(url));
    return response as GraphScore[];
  }

  public async getGraphCurrentScore(pid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/graphCurrentScore'+ pid;
    const response =  await lastValueFrom(this.http.get(url));
    return response as GraphScore[];
  }

  public async get_user(uid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/userall' + uid;
    const response =  await lastValueFrom(this.http.get(url));
    return response as GetUser[];
  }

  public async get_username(uid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/username' + uid;
    const response =  await lastValueFrom(this.http.get(url));
    return response as GetUserName[];
  }

  public async getSEDdate(){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/getSEDdate';
    const response =  await lastValueFrom(this.http.get(url));
    return response as GetSEDdate[];
  }

  public async getRankTopten(){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/getRankTopten';
    const response =  await lastValueFrom(this.http.get(url));
    return response ;
  }

  public async getTopten(){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/getTopten';
    const response =  await lastValueFrom(this.http.get(url));
    return response as GetTopten[];
  }


  public async delete(pid : any){
    let url = this.constants.API_ENDPOINT+'/db';
    url += '/delete'+ pid;
     await lastValueFrom(this.http.delete(url));
  }

  public async vote(v_pid : any,body : any){
    let url = this.constants.API_ENDPOINT + '/db';
    console.log(v_pid); 
    url += '/vote' + '/' + v_pid;
    const response = await lastValueFrom(this.http.post(url,body));
    return response 
  }

  public async insertSED(pid : any,body : any){
    let url = this.constants.API_ENDPOINT + '/db';
    console.log(pid); 
    url += '/SED' + '/' + pid;
    const response = await lastValueFrom(this.http.post(url,body));
    return response 
  }

  public async updateSED(pid : any,body : any){
    let url = this.constants.API_ENDPOINT + '/db';
    url += '/up/up'+ pid;
    const response = await lastValueFrom(this.http.put(url,body));
    return response 
  }

  public async updateScore(pid : any,body :any){
    let url = this.constants.API_ENDPOINT + '/db'; 
    url += '/updateScore/' + pid
    const response = await lastValueFrom(this.http.put(url,body));
    return response 
  }
}