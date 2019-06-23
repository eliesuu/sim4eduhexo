var WeatherStateEL = new eNUMERATION( "WeatherStateEL",
    ["sunny", "partly cloudy", "cloudy", "rainy"] );

var LemonadeMarket = new cLASS({
  Name: "LemonadeMarket",
  supertypeName: "DailyDemandMarket",
  properties: {
    // *** non-persistent variables ***
    "dailyDemandQuantity": {range: "Decimal", historySize: 5},
    "weatherState": {range: WeatherStateEL, label: "Weather conditions",
      shortLabel: "cond", historySize: 5},
    "temperature": {range: "Decimal", label: "Temperature", shortLabel: "temp",
      decimalPlaces: 1, historySize: 5},
    "forecastWeatherState": {range: WeatherStateEL, label: "Forecasted weather state"},
    "forecastTemperature": {range: "Decimal", label: "Forecasted temperature"}
  },
  methods: {
    "getDailyDemandQuantity": function() {
      var demandRB = this.history.dailyDemandQuantity,  // a ring buffer
          N = demandRB.nmrOfItems(), demQty=0;
      // first update (and forecast) the "weather"
      this.updateWeather();
      this.forecastWeather();
      if (N < 2) {  // buffer still too empty
        demQty = rand.normal( sim.model.v.demandMean, sim.model.v.demandStdDev);
      } else  {
        demQty = demandRB.getSMA( 3);  // simple moving average over 3 values
      }
      switch (this.forecastWeatherState) {
        case WeatherStateEL.SUNNY:
          demQty *= 1.1;  // 10% increase
          break;
        case WeatherStateEL.PARTLY_CLOUDY:
          demQty *= 1.05;  // 5% increase
          break;
        case WeatherStateEL.CLOUDY:
          demQty *= 0.95;  // 5% decrease
          break;
        case WeatherStateEL.RAINY:
          demQty *= 0.9;  // 10% decrease
          break;
      }
      this.dailyDemandQuantity = Math.round( demQty);
      return this.dailyDemandQuantity;  // positive integer
    },
    "updateWeather": function() {
      var r = rand.uniformInt( 0, 99),
          newWeatherState = this.weatherState,
          newTemperature = this.temperature;
      // update weather
      switch (this.weatherState) {
        case WeatherStateEL.SUNNY:
          if (r < 50) newWeatherState = WeatherStateEL.SUNNY;
          else newWeatherState = WeatherStateEL.PARTLY_CLOUDY;
          break;
        case WeatherStateEL.PARTLY_CLOUDY:
          if (r < 25) newWeatherState =  WeatherStateEL.SUNNY;
          else if (r < 75) newWeatherState = WeatherStateEL.PARTLY_CLOUDY;
          else newWeatherState = WeatherStateEL.CLOUDY;
          break;
        case WeatherStateEL.CLOUDY:
          if (r < 25) newWeatherState = WeatherStateEL.PARTLY_CLOUDY;
          else if (r < 75) newWeatherState = WeatherStateEL.CLOUDY;
          else newWeatherState = WeatherStateEL.RAINY;
          break;
        case WeatherStateEL.RAINY:
          if (r < 50) newWeatherState = WeatherStateEL.CLOUDY;
          else newWeatherState = WeatherStateEL.RAINY;
          break;
      }
      this.history.weatherState.add( this.weatherState);
      this.weatherState = newWeatherState;
      // update temperature
      switch (this.weatherState) {
        case WeatherStateEL.SUNNY:
          newTemperature += rand.uniformInt( 1, 2);
          break;
        case WeatherStateEL.PARTLY_CLOUDY:
          newTemperature += rand.uniformInt( -1, 1);
          break;
        case WeatherStateEL.CLOUDY:
          if (newTemperature > 15) newTemperature -= 1;
          break;
        case WeatherStateEL.RAINY:
          if (newTemperature > 16) newTemperature -= 2;
          else if (newTemperature > 15) newTemperature -= 1;
          break;
      }
      newTemperature = Math.max( 20, newTemperature);
      newTemperature = Math.min( newTemperature, 35);
      this.history.temperature.add( this.temperature);
      this.temperature = newTemperature;
    },
    // forecast weather state and temperature for the demand period
    "forecastWeather": function () {
      var r = rand.uniformInt( 0, 99),
          forecastState=0, forecastTemp=0;
      // forecast weather state
      switch (this.weatherState) {
        case WeatherStateEL.SUNNY:
          if (r < 68) forecastState = WeatherStateEL.SUNNY;
          else if (r < 92) forecastState = WeatherStateEL.PARTLY_CLOUDY;
          else forecastState = WeatherStateEL.CLOUDY;
          break;
        case WeatherStateEL.PARTLY_CLOUDY:
          if (r < 20) forecastState =  WeatherStateEL.SUNNY;
          else if (r < 75) forecastState = WeatherStateEL.PARTLY_CLOUDY;
          else if (r < 94) forecastState = WeatherStateEL.CLOUDY;
          else forecastState = WeatherStateEL.RAINY;
          break;
        case WeatherStateEL.CLOUDY:
          if (r < 3) forecastState = WeatherStateEL.SUNNY;
          else if (r < 22) forecastState = WeatherStateEL.PARTLY_CLOUDY;
          else if (r < 78) forecastState = WeatherStateEL.CLOUDY;
          else forecastState = WeatherStateEL.RAINY;
          break;
        case WeatherStateEL.RAINY:
          if (r < 68) forecastState = WeatherStateEL.RAINY;
          else if (r < 98) forecastState = WeatherStateEL.CLOUDY;
          else forecastState = WeatherStateEL.PARTLY_CLOUDY;
          break;
      }
      this.forecastWeatherState = forecastState;

      switch (forecastState) {
        case WeatherStateEL.SUNNY:
          forecastTemp = rand.uniformInt( Math.floor(this.temperature + 1),
              Math.floor(this.temperature + 2));
          break;
        case WeatherStateEL.PARTLY_CLOUDY:
          forecastTemp = rand.uniformInt( Math.floor(this.temperature - 1),
              Math.floor(this.temperature + 1));
          break;
        case WeatherStateEL.CLOUDY:
          forecastTemp = rand.uniformInt( Math.floor(this.temperature - 2),
              Math.floor(this.temperature - 1));
          break;
        case WeatherStateEL.RAINY:
          forecastTemp = rand.uniformInt( Math.floor(this.temperature - 3),
              Math.floor(this.temperature - 2));
          break;
      }
      this.forecastTemperature = forecastTemp;
    }
  }
});