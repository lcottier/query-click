import { Injectable } from '@angular/core';
import { AppConfig } from '../../models/app-config.model';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private appConfig: AppConfig;

    constructor() {
        this.mockAppConfig();
    }

    getConfig() {
        return this.appConfig;
    }

    private mockAppConfig() {
        this.appConfig = {
            apiKey: '867d32eb0085419cb36201914202101',
            localCityUrl: 'http://api.worldweatheronline.com/premium/v1/weather.ashx'
        };
    }
}
