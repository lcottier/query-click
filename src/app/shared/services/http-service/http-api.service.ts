import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpApiService {
    constructor(private http: HttpClient) {
    }

    get<T>(url: string, params: HttpParams = void 0): any {
        return this.http.get<T>(url, { params });
    }
}
