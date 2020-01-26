export class LocalCityData {
    request: Array<LocalCityDataRequest>;
    current_condition: Array<LocalCityDataCurrentCondition>;
    weather: Array<LocalCityDataWeather>;
    ClimateAverages: Array<LocalCityDataClimateAverages>;
}

export class LocalCityDataResult {
    data: LocalCityData;
}

export class LocalCityDataRequest {
    type: string;
    query: string;
}

export class LocalCityDataCurrentCondition {
    observation_time: string;
    temp_C: string;
    temp_F: string;
    weatherCode: string;
    weatherIconUrl: Array<ValueObject>;
    weatherDesc: Array<ValueObject>;
    windspeedMiles: string;
    windspeedKmph: string;
    winddirDegree: string;
    winddir16Point: string;
    precipMM: string;
    precipInches: string;
    humidity: string;
    visibility: string;
    visibilityMiles: string;
    pressure: string;
    pressureInches: string;
    cloudcover: string;
    FeelsLikeC: string;
    FeelsLikeF: string;
    uvIndex: number;
}

export class LocalCityDataWeather {
    date: string;
    astronomy: Array<AstronomyData>;
    maxtempC: string;
    maxtempF: string;
    mintempC: string;
    mintempF: string;
    avgtempC: string;
    avgtempF: string;
    totalSnow_cm: string;
    sunHour: string;
    uvIndex: string;
    hourly: Array<HourlyData>;
}

export class LocalCityDataClimateAverages {
    month: Array<MonthData>
}

export class ValueObject {
    value: string;
}

export class AstronomyData {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
}

export class HourlyData {
    time: string;
    tempC: string;
    tempF: string;
    windspeedMiles: string;
    windspeedKmph: string;
    winddirDegree: string;
    winddir16Point: string;
    weatherCode: string;
    weatherIconUrl: Array<ValueObject>;
    weatherDesc: Array<ValueObject>;
    precipMM: string;
    precipInches: string;
    humidity: string;
    visibility: string;
    visibilityMiles: string;
    pressure: string;
    pressureInches: string;
    cloudcover: string;
    HeatIndexC: string;
    HeatIndexF: string;
    DewPointC: string;
    DewPointF: string;
    WindChillC: string;
    WindChillF: string;
    WindGustMiles: string;
    WindGustKmph: string;
    FeelsLikeC: string;
    FeelsLikeF: string;
    chanceofrain: string;
    chanceofremdry: string;
    chanceofwindy: string;
    chanceofovercast: string;
    chanceofsunshine: string;
    chanceoffrost: string;
    chanceofhightemp: string;
    chanceoffog: string;
    chanceofsnow: string;
    chanceofthunder: string;
    uvIndex: string;
}

export class MonthData {
    index: string;
    name: string;
    avgMinTemp: string;
    avgMinTemp_F: string;
    absMaxTemp: string;
    absMaxTemp_F: string;
    avgDailyRainfall: string;
    season?: string;
    coldest?: boolean;
    hottest?: boolean;
    wettest?: boolean;
}