import { HttpApiService } from '../../http-service/http-api.service';
import { AppConfigService } from '../../app-config/app-config.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/shared/models/app-config.model';
import { LocalCityDataResult, LocalCityData } from 'src/app/shared/models/local-city-data.model';

@Injectable({
    providedIn: 'root',
})
export class VisualisationApiService {

    appConfig: AppConfig;

    constructor(private httpApiService: HttpApiService, private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    getLocalCity(location: string = ''): Observable<LocalCityDataResult> {
        let params = new HttpParams();
        params = params.append('q', location);
        params = params.append('format', 'json');
        params = params.append('key', this.appConfig.apiKey);
        params = params.append('date', 'today');
        return this.httpApiService.get<LocalCityDataResult>(this.appConfig.localCityUrl, params);
    }
}
