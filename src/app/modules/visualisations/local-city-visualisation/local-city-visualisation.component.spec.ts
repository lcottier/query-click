import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LocalCityVisualisationComponent } from './local-city-visualisation.component';
import { MatCardModule, MatGridListModule, MatDividerModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VisualisationApiService } from 'src/app/shared/services/api/visualisations-api/visualisations-api.service';
import { of } from 'rxjs';
import { LocalCityData, LocalCityDataResult, LocalCityDataClimateAverages, MonthData } from 'src/app/shared/models/local-city-data.model';

describe('LocalCityVisualisationComponent', () => {
  let component: LocalCityVisualisationComponent;
  let fixture: ComponentFixture<LocalCityVisualisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocalCityVisualisationComponent],
      imports: [
        MatCardModule,
        MatGridListModule,
        MatDividerModule,
        HttpClientTestingModule
      ],
      providers: [
        VisualisationApiService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCityVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set localCityData and setupClimateAverages', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const testData = {} as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'setupClimateAverages');
      component.ngOnInit();
      expect(component.localCityData).toBe(testData);
      expect(component['setupClimateAverages']).toHaveBeenCalled();
    }));

  it('setupClimateAverages does', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const testData = { ClimateAverages: [{} as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      spyOn<any>(component, 'getSeasonAverages');
      spyOn<any>(component, 'setSeasons');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();
      expect(component['getSeasonAverages']).toHaveBeenCalled();
      expect(component['setSeasons']).toHaveBeenCalled();
    }));

  it('getExtremes does', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [
        { avgMinTemp: '-1', absMaxTemp: '0', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '0', absMaxTemp: '2', avgDailyRainfall: '0' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '2' } as MonthData
      ];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getSeasonAverages');
      spyOn<any>(component, 'setSeasons');
      component.ngOnInit();
      expect(component['getSeasonAverages']).toHaveBeenCalled();
      expect(component['setSeasons']).toHaveBeenCalled();
      expect(component.localCityData.ClimateAverages[0].month.length).toBe(3);
      expect(component.localCityData.ClimateAverages[0].month[0].coldest).toBeTruthy();
      expect(component.localCityData.ClimateAverages[0].month[1].hottest).toBeTruthy();
      expect(component.localCityData.ClimateAverages[0].month[2].wettest).toBeTruthy();
    }));

  it('getExtremes does not if not averages', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const testData = { ClimateAverages: void 0 } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getSeasonAverages');
      spyOn<any>(component, 'setSeasons');
      spyOn(Number, 'parseFloat');
      component.ngOnInit();
      expect(component['getSeasonAverages']).toHaveBeenCalled();
      expect(component['setSeasons']).toHaveBeenCalled();
      expect(Number.parseFloat).not.toHaveBeenCalled();
    }));

  it('getSeasonAverages does', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData
      ];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      spyOn<any>(component, 'setSeasons');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();
      expect(component['setSeasons']).toHaveBeenCalled();
      expect(component.yearAverages).toBeDefined();

      expect(component.yearAverages.spring).toBeDefined();
      expect(component.yearAverages.spring.minTempAvg).toBe(2);
      expect(component.yearAverages.spring.maxTempAvg).toBe(2);
      expect(component.yearAverages.spring.rainfallAvg).toBe(2);

      expect(component.yearAverages.summer).toBeDefined();
      expect(component.yearAverages.summer.minTempAvg).toBe(3);
      expect(component.yearAverages.summer.maxTempAvg).toBe(3);
      expect(component.yearAverages.summer.rainfallAvg).toBe(3);

      expect(component.yearAverages.autumn).toBeDefined();
      expect(component.yearAverages.autumn.minTempAvg).toBe(4);
      expect(component.yearAverages.autumn.maxTempAvg).toBe(4);
      expect(component.yearAverages.autumn.rainfallAvg).toBe(4);

      expect(component.yearAverages.winter).toBeDefined();
      expect(component.yearAverages.winter.minTempAvg).toBe(1);
      expect(component.yearAverages.winter.maxTempAvg).toBe(1);
      expect(component.yearAverages.winter.rainfallAvg).toBe(1);
    }));

  it('getSeasonAverages does not se yearAverages when not enough data for a year', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      spyOn<any>(component, 'setSeasons');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();
      expect(component['setSeasons']).toHaveBeenCalled();
      expect(component.yearAverages).toBeUndefined();
    }));

  it('setSeasons does', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData
      ];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      spyOn<any>(component, 'getSeasonAverages');
      spyOn<any>(component, 'compareSeason');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();
      expect(component['getSeasonAverages']).toHaveBeenCalled();
      expect(component['compareSeason']).toHaveBeenCalledTimes(12);

      expect(component.localCityData.ClimateAverages[0].month[0].season).toBe('winter');
      expect(component.localCityData.ClimateAverages[0].month[2].season).toBe('spring');
      expect(component.localCityData.ClimateAverages[0].month[5].season).toBe('summer');
      expect(component.localCityData.ClimateAverages[0].month[8].season).toBe('autumn');
    }));

  it('setSeasons defaults averages to empty array', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const testData = { ClimateAverages: void 0 } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      spyOn<any>(component, 'getSeasonAverages');
      spyOn<any>(component, 'compareSeason');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();
      expect(component['getSeasonAverages']).toHaveBeenCalled();
      expect(component['compareSeason']).not.toHaveBeenCalled();
    }));

  it('compareSeasons does', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '4', absMaxTemp: '4', avgDailyRainfall: '4' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData
      ];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();

      expect(component.localCityData.ClimateAverages[0].month[8].season).toBe('winter');
    }));

  it('compareSeasons does when no matching overriding season', inject([VisualisationApiService],
    (visualisationApiService: VisualisationApiService) => {
      const monthData = [
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '2', absMaxTemp: '2', avgDailyRainfall: '2' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '3', absMaxTemp: '3', avgDailyRainfall: '3' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '3', avgDailyRainfall: '8' } as MonthData,
        { avgMinTemp: '8', absMaxTemp: '8', avgDailyRainfall: '8' } as MonthData,
        { avgMinTemp: '8', absMaxTemp: '8', avgDailyRainfall: '8' } as MonthData,
        { avgMinTemp: '1', absMaxTemp: '1', avgDailyRainfall: '1' } as MonthData
      ];
      const testData = { ClimateAverages: [{ month: monthData } as LocalCityDataClimateAverages] } as LocalCityData;
      spyOn(visualisationApiService, 'getLocalCity').and.returnValue(of({ data: testData } as LocalCityDataResult));
      spyOn<any>(component, 'getExtremes');
      component.ngOnInit();
      expect(component['getExtremes']).toHaveBeenCalled();

      expect(component.localCityData.ClimateAverages[0].month[8].season).toBe('autumn');
    }));
});
