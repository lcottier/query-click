import { VisualisationApiService } from "./visualisations-api.service";
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpApiService } from '../../http-service/http-api.service';
import { AppConfigService } from '../../app-config/app-config.service';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

describe('VisualisationApiService', () => {
    let injector: TestBed;
    let service: VisualisationApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                VisualisationApiService,
                { provide: HttpApiService, useValue: { get: () => { } } },
                { provide: AppConfigService, useValue: { getConfig: () => ({ apiKey: 'test' }) } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(VisualisationApiService);
    });

    it('should', () => {
        expect(service).toBeTruthy();
    });

    it('getLocalCity should', inject([HttpApiService], (httpApiService: HttpApiService) => {
        spyOn(httpApiService, 'get');
        service.getLocalCity('test');
        expect(httpApiService.get).toHaveBeenCalled();
    }));

    it('getLocalCity should default to a blank location', inject([HttpApiService], (httpApiService: HttpApiService) => {
        spyOn(httpApiService, 'get');
        service.getLocalCity();
        expect(httpApiService.get).toHaveBeenCalled();
    }));
});
