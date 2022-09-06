
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NasaService {
  apiKey="5kgdhEbDsAmYPFuSpKgsg3936mlw2tEp0Y84HRMp"
  baseUrl="https://api.nasa.gov/planetary"

  constructor(private http: HttpClient) {}
  getAPOD(date: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/apod/?date=${date}&api_key=${this.apiKey}`
    );
  }
}
