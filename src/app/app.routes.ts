import { Routes } from '@angular/router';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';

export const routes: Routes = [

    { path: 'video', component: VideoUploadComponent },
    { path: 'playlist', component: VideoStreamComponent }


];

