import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-playlist',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div>
      <h1>Video Playlist</h1>
      <ul *ngIf="videos.length > 0; else noVideos">
        <li *ngFor="let video of videos" (click)="playVideo(video.id)">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
        </li>
      </ul>
      <ng-template #noVideos>
        <p>No videos available.</p>
      </ng-template>
      <div *ngIf="videoUrl">
        <h2>Now Playing</h2>
        <video [src]="videoUrl" controls autoplay></video>
      </div>
    </div>
  `,
  styles: [
    `
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        cursor: pointer;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 5px;
      }
      li:hover {
        background-color: #f0f0f0;
      }
    `,
  ],
})
export class VideoStreamComponent implements OnInit {
  videos: any[] = [];
  videoUrl: string | null = null;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadPlaylist();
  }

  loadPlaylist(): void {
    this.videoService.getAllVideos().subscribe(
      (data) => {
        this.videos = data;
      },
      (error) => {
        console.error('Error fetching playlist:', error);
      }
    );
  }

  playVideo(id: number): void {
    this.videoService.playVideo(id).subscribe(
      (response) => {
        const videoBlob = response;
        this.videoUrl = URL.createObjectURL(videoBlob);
      },
      (error) => {
        console.error('Error playing video:', error);
      }
    );
  }
}
