export class SeasonAverages {
    minTempAvg: number;
    maxTempAvg: number;
    rainfallAvg: number;
}

export class YearAverages {
    spring: SeasonAverages;
    summer: SeasonAverages;
    autumn: SeasonAverages;
    winter: SeasonAverages;
}
