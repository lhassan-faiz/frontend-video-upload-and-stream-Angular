import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { VideoService } from '../video-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule],
  templateUrl: './video-upload.component.html',
  styleUrl: './video-upload.component.css'
})
export class VideoUploadComponent {
  videoFile: File | null = null;
  videoId: number | null = null;
  videoMetadata = {
    title: '',
    description: '',
  };
  uploadedVideo: any = null;
  videoUrl: string | null = null;

  constructor(private videoService: VideoService) {}

  onFileSelect(event: any): void {
    this.videoFile = event.target.files[0];
  }

  onMetadataSubmit(): void {
    if (this.videoMetadata.title && this.videoMetadata.description) {
      this.videoService.saveVideo(this.videoMetadata).subscribe(
        (response) => {
          this.videoId = response.id; // Assuming the response has an ID for the video
          console.log('Video metadata saved:', response);
        },
        (error) => {
          console.error('Error saving video metadata:', error);
        }
      );
    } else {
      alert('Please fill in the title and description.');
    }
  }

  onFileUpload(): void {
    if (this.videoFile && this.videoId) {
      const formData = new FormData();
      formData.append('video', this.videoFile, this.videoFile.name);

      this.videoService.uploadVideo(this.videoId, formData).subscribe(
        (response) => {
          console.log('Video uploaded successfully:', response);
          this.playVideo(this.videoId!); // Play the video after uploading
        },
        (error) => {
          console.error('Error uploading video:', error);
        }
      );
    } else {
      alert('Please upload a video file.');
    }
  }

  playVideo(id: number): void {
    this.videoService.playVideo(id).subscribe(
      (response) => {
        const videoBlob = response;
        const videoUrl = URL.createObjectURL(videoBlob);
        this.videoUrl = videoUrl;
        console.log('Video ready to play');
      },
      (error) => {
        console.error('Error fetching video:', error);
      }
    );
  }
}