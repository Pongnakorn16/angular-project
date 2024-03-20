export interface UserSignUp {
    email:   string;
    username: string;
    password:   string;
    type: string;
}

export interface TestGetResponse {
    uid : number;
    email:   string;
    username: string;
    password:   string;
    type: string;
    bio: string;
    user_image: string;
}


export interface GetImage2 {
    pid : number;
    uid : number;
    image : string;
    score : number;
    rating : number;
}

export interface GraphScore {
    score : number;
    date : Date;
}

export interface GetUser {
    uid : number;
    user_image : string;
    username : string;
    bio : string;
    email : string;
    password : string;
    type : string;
}

export interface GetUserName {
    username : string;
}

export interface GetSEDdate {
    date : Date;
}

export interface GetTopten {
    pid : number;
    rank : number;
    uid : number;
    image : string;
    score : number;
    username : string;
    photo_No : number;
    resultRank: number;
}

export interface GetCompareTopten {
    pid : number;
    today_rank : number;
    yesterday_rank : number;
}

export interface UserImage {
    url: string;
}

export interface Image {
    rating: number;
  }
  