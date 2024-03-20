import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MainComponent } from './pages/main/main.component';
import { MainAdComponent } from './pages/main-ad/main-ad.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainNoLoginComponent } from './pages/main-no-login/main-no-login.component';
import { TopTenComponent } from './pages/top-ten/top-ten.component';
import { GraphComponent } from './pages/graph/graph.component';
import { GraphShowComponent } from './pages/graph-show/graph-show.component';

export const routes: Routes = [
    // {path: '', component: AsyncDemoComponent },
    // {path: 'callapi', component: CallApiComponent },
    // {path: 'postput', component: PostputComponent },
    // {path: 'upload', component: UploadComponent }
    {path: '', component: MainNoLoginComponent },
    {path: 'sign-in', component: SignInComponent },
    {path: 'sign-up', component: SignUpComponent},
    {path: 'main', component: MainComponent },
    {path: 'main-ad', component: MainAdComponent },
    {path: 'user-info', component: UserInfoComponent },
    {path: 'upload-image', component: UploadImageComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'top-ten', component: TopTenComponent},
    {path: 'graph', component: GraphComponent},
    {path: 'graph-show', component: GraphShowComponent},
];