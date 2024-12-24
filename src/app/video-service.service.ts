import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private baseUrl = 'http://localhost:8010/api';

  constructor(private http: HttpClient) {}

  // Save video metadata
  saveVideo(video: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, video);
  }

  // Upload video file for a specific video
  uploadVideo(id: number, videoFile: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload/${id}`, videoFile);
  }

  // Play video by ID
  playVideo(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/play/${id}`, { responseType: 'blob' });
  }

  // Fetch all videos
  getAllVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }
}
