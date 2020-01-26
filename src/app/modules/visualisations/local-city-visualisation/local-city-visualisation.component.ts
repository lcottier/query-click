import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { VisualisationApiService } from 'src/app/shared/services/api/visualisations-api/visualisations-api.service';
import { LocalCityData, LocalCityDataClimateAverages, MonthData } from 'src/app/shared/models/local-city-data.model';
import { SeasonAverages, YearAverages } from 'src/app/shared/models/season-averages.model';


@Component({
  selector: 'app-local-city-visualisation',
  templateUrl: './local-city-visualisation.component.html',
  styleUrls: ['./local-city-visualisation.component.scss']
})
export class LocalCityVisualisationComponent implements OnInit, OnDestroy {

  localCityData: LocalCityData;
  subscriptions = new Subscription();
  yearAverages: YearAverages;

  constructor(private visualisationApiService: VisualisationApiService) { }

  ngOnInit() {
    this.getLocalData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  private getLocalData() {
    this.subscriptions.add(this.visualisationApiService.getLocalCity('EH66QA').subscribe((localCityData) => {
      this.localCityData = localCityData.data;
      this.setupClimateAverages(this.localCityData.ClimateAverages);
    }));
  }

  private setupClimateAverages(climateAverages: Array<LocalCityDataClimateAverages>): void {
    this.getExtremes(climateAverages);
    this.getSeasonAverages(climateAverages);
    this.setSeasons(climateAverages);
  }

  private getExtremes(averages: Array<LocalCityDataClimateAverages>) {
    if (averages) {
      for (let i = 0; i < averages.length; i++) {
        let coldest = 100000;
        let coldestIndex = -1;
        let hottest = -100000;
        let hottestIndex = -1;
        let wettest = -100000;
        let wettestIndex = -1;
        for (let j = 0; j < averages[i].month.length; j++) {
          if (Number.parseFloat(averages[i].month[j].avgMinTemp) < coldest) {
            coldest = Number.parseFloat(averages[i].month[j].avgMinTemp);
            coldestIndex = j;
          }
          if (Number.parseFloat(averages[i].month[j].absMaxTemp) > hottest) {
            hottest = Number.parseFloat(averages[i].month[j].absMaxTemp);
            hottestIndex = j;
          }
          if (Number.parseFloat(averages[i].month[j].avgDailyRainfall) > wettest) {
            wettest = Number.parseFloat(averages[i].month[j].avgDailyRainfall);
            wettestIndex = j;
          }

        }
        averages[i].month[coldestIndex].coldest = true;
        averages[i].month[hottestIndex].hottest = true;
        averages[i].month[wettestIndex].wettest = true;
      }
    }
  }

  private getSeasonAverages(averages: Array<LocalCityDataClimateAverages>): void {

    if (averages[0].month.length === 12) {

      const yearAverages = new YearAverages();

      yearAverages.winter = {
        minTempAvg: (Number.parseFloat(averages[0].month[0].avgMinTemp)
          + Number.parseFloat(averages[0].month[1].avgMinTemp) + Number.parseFloat(averages[0].month[11].avgMinTemp)) / 3,
        maxTempAvg: (Number.parseFloat(averages[0].month[0].absMaxTemp)
          + Number.parseFloat(averages[0].month[1].absMaxTemp) + Number.parseFloat(averages[0].month[11].absMaxTemp)) / 3,
        rainfallAvg: (Number.parseFloat(averages[0].month[0].avgDailyRainfall)
          + Number.parseFloat(averages[0].month[1].avgDailyRainfall) + Number.parseFloat(averages[0].month[11].avgDailyRainfall)) / 3,
      } as SeasonAverages;

      yearAverages.spring = {
        minTempAvg: (Number.parseFloat(averages[0].month[2].avgMinTemp)
          + Number.parseFloat(averages[0].month[3].avgMinTemp) + Number.parseFloat(averages[0].month[4].avgMinTemp)) / 3,
        maxTempAvg: (Number.parseFloat(averages[0].month[2].absMaxTemp)
          + Number.parseFloat(averages[0].month[3].absMaxTemp) + Number.parseFloat(averages[0].month[4].absMaxTemp)) / 3,
        rainfallAvg: (Number.parseFloat(averages[0].month[2].avgDailyRainfall)
          + Number.parseFloat(averages[0].month[3].avgDailyRainfall) + Number.parseFloat(averages[0].month[4].avgDailyRainfall)) / 3,
      } as SeasonAverages;

      yearAverages.summer = {
        minTempAvg: (Number.parseFloat(averages[0].month[5].avgMinTemp)
          + Number.parseFloat(averages[0].month[6].avgMinTemp) + Number.parseFloat(averages[0].month[7].avgMinTemp)) / 3,
        maxTempAvg: (Number.parseFloat(averages[0].month[5].absMaxTemp)
          + Number.parseFloat(averages[0].month[6].absMaxTemp) + Number.parseFloat(averages[0].month[7].absMaxTemp)) / 3,
        rainfallAvg: (Number.parseFloat(averages[0].month[5].avgDailyRainfall)
          + Number.parseFloat(averages[0].month[6].avgDailyRainfall) + Number.parseFloat(averages[0].month[7].avgDailyRainfall)) / 3,
      } as SeasonAverages;

      yearAverages.autumn = {
        minTempAvg: (Number.parseFloat(averages[0].month[8].avgMinTemp)
          + Number.parseFloat(averages[0].month[9].avgMinTemp) + Number.parseFloat(averages[0].month[10].avgMinTemp)) / 3,
        maxTempAvg: (Number.parseFloat(averages[0].month[8].absMaxTemp)
          + Number.parseFloat(averages[0].month[9].absMaxTemp) + Number.parseFloat(averages[0].month[10].absMaxTemp)) / 3,
        rainfallAvg: (Number.parseFloat(averages[0].month[8].avgDailyRainfall)
          + Number.parseFloat(averages[0].month[9].avgDailyRainfall) + Number.parseFloat(averages[0].month[10].avgDailyRainfall)) / 3,
      } as SeasonAverages;

      this.yearAverages = yearAverages;
    }
  }

  private setSeasons(averages: Array<LocalCityDataClimateAverages> = []) {
    for (let i = 0; i < averages.length; i++) {
      for (let j = 0; j < averages[i].month.length; j++) {
        if (j === 0 || j === 1 || j === 11) {
          averages[i].month[j].season = 'winter';
        }
        if (j === 2 || j === 3 || j === 4) {
          averages[i].month[j].season = 'spring';
        }
        if (j === 5 || j === 6 || j === 7) {
          averages[i].month[j].season = 'summer';
        }
        if (j === 8 || j === 9 || j === 10) {
          averages[i].month[j].season = 'autumn';
        }

        this.compareSeason(averages[i].month[j]);
      }
    }
  }

  private compareSeason(monthData: MonthData) {

    let minTempDif = this.yearAverages.winter.minTempAvg - Number.parseFloat(monthData.avgMinTemp);
    let maxTempDif = this.yearAverages.winter.maxTempAvg - Number.parseFloat(monthData.absMaxTemp);
    let rainfallDif = this.yearAverages.winter.rainfallAvg - Number.parseFloat(monthData.avgDailyRainfall);

    const differences = {
      minTempDif: { season: 'winter', difference: minTempDif < 0 ? minTempDif * -1 : minTempDif },
      maxTempDif: { season: 'winter', difference: maxTempDif < 0 ? maxTempDif * -1 : maxTempDif },
      rainfallDif: { season: 'winter', difference: rainfallDif < 0 ? rainfallDif * -1 : rainfallDif }
    };

    const keys = Object.keys(this.yearAverages);
    for (let i = 1; i < keys.length; i++) {
      minTempDif = this.yearAverages[keys[i]].minTempAvg - Number.parseFloat(monthData.avgMinTemp);
      maxTempDif = this.yearAverages[keys[i]].minTempAvg - Number.parseFloat(monthData.absMaxTemp);
      rainfallDif = this.yearAverages[keys[i]].minTempAvg - Number.parseFloat(monthData.avgDailyRainfall);

      minTempDif = minTempDif < 0 ? minTempDif * -1 : minTempDif;
      maxTempDif = maxTempDif < 0 ? maxTempDif * -1 : maxTempDif;
      rainfallDif = rainfallDif < 0 ? rainfallDif * -1 : rainfallDif;

      if (minTempDif < differences.minTempDif.difference) {
        differences.minTempDif = { season: keys[i], difference: minTempDif };
      }
      if (maxTempDif < differences.maxTempDif.difference) {
        differences.maxTempDif = { season: keys[i], difference: maxTempDif };
      }
      if (rainfallDif < differences.rainfallDif.difference) {
        differences.rainfallDif = { season: keys[i], difference: rainfallDif };
      }
    }

    if (differences.minTempDif.season === differences.maxTempDif.season ||
      differences.minTempDif.season === differences.rainfallDif.season) {
      monthData.season = differences.minTempDif.season;
    } else if (differences.maxTempDif.season === differences.rainfallDif.season) {
      monthData.season = differences.maxTempDif.season;
    }
  }
}
