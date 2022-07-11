// jshint esversion:6



fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => {
        return response.json();
    }).then((result) => {
        console.log(result);

        var confirmedCases = result.cases;
        var deathCases = result.deaths;
        var totalRecovered = result.recovered;
        var totalCountries = document.getElementById("total-countries");
        var totalConfirmed = document.getElementById("total-confirmed");
        var totalDeaths = document.getElementById("total-deaths");
        var recoveredCases = document.getElementById("recovered-cases");

        totalCountries.innerHTML = result.affectedCountries;
        totalConfirmed.innerHTML = confirmedCases;
        totalDeaths.innerHTML = deathCases;
        recoveredCases.innerHTML = totalRecovered;
    });

var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var displayDate = document.getElementById("date");
displayDate.innerHTML = date + ":" + month + ":" + year;

var countries;
document.addEventListener('DOMContentLoaded', () => {
    var dropDown = document.querySelector("#drop-countries");

    fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);
            countries = result;
            var countriesDrop = document.getElementById("drop-countries");

            for (var i = 0; i <= countries.length; i++) {
                var options = document.createElement('option');
                options.innerHTML = countries[i]['country'];
                countriesDrop.append(options);

            }

        });

});

document.getElementById("drop-countries").addEventListener('change', (e) => {
    var country = e.target.value;

    var url = `https://disease.sh/v3/covid-19/countries/${country}?strict=true`;
    fetch(url)
        .then((response) => {

            return response.json();

        }).then((result) => {
            console.log(result);
            var activeCases = document.getElementById("active-cases");
            var a = document.createElement('h5');
            a.innerHTML = result.cases;
            a.classList.add("example");
            activeCases.append(a);

            var deathCases = document.getElementById("deaths");
            var d = document.createElement('h5');
            d.innerHTML = result.deaths;
            d.classList.add("example");
            deathCases.append(d);


            var recoveredCases = document.getElementById("recovered");
            var r = document.createElement('h5');
            r.innerHTML = result.recovered;
            r.classList.add("example");
            recoveredCases.append(r);

            var totalTests = document.getElementById("total-test");
            var t = document.createElement('h5');
            t.innerHTML = result.tests;
            t.classList.add("example");
            totalTests.append(t);

            var actives = document.getElementById("actives");
            var ac = document.createElement('h5');
            ac.innerHTML = result.active;
            ac.classList.add("example");
            actives.append(ac);

            var todayCases = document.getElementById("today-cases");
            var tc = document.createElement('h5');
            tc.innerHTML = result.todayCases;
            tc.classList.add("example");
            todayCases.append(tc);

            var todayDeaths = document.getElementById("today-deaths");
            var td = document.createElement('h5');
            td.innerHTML = result.todayDeaths;
            td.classList.add("example");
            todayDeaths.append(td);

            var todayRecovered = document.getElementById("today-recovered");
            var tr = document.createElement('h5');
            tr.innerHTML = result.todayRecovered;
            tr.classList.add("example");
            todayRecovered.append(tr);

            var details = [];
            var chartLabels = ["Total cases", "Total deaths", "Total recovered", "Active cases", "Today Cases", "Today deaths", "Today recovered"];
            var chart = document.getElementById("myChart");
            details.push(result.cases);
            details.push(result.deaths);
            details.push(result.recovered);
            details.push(result.active);
            details.push(result.todayCases);
            details.push(result.todayDeaths);
            details.push(result.todayRecovered);



            var chartData = {
                labels: chartLabels,
                datasets: [{
                    backgroundColor: ["red", "blue", "green", "darkturquoise", "crimson", "orangered", "maroon"],
                    data: details
                }]
            };
            var graph = new Chart(chart, {
                type: 'pie',
                data: chartData
            });


            var barDetails = [];
            var barChartLabels = ["Total cases", "Total deaths", "Total recovered", "Active cases", "Today Cases", "Today deaths", "Today recovered"];

            var barChart = document.getElementById("myBarChart");
            barDetails.push(result.cases);
            barDetails.push(result.deaths);
            barDetails.push(result.recovered);
            barDetails.push(result.active);
            barDetails.push(result.todayCases);
            barDetails.push(result.todayDeaths);
            barDetails.push(result.todayRecovered);



            var barChartData = {
                labels: barChartLabels,
                datasets: [{
                    backgroundColor: ["red", "blue", "green", "darkturquoise", "crimson", "orangered", "maroon"],
                    label: "Count",

                    data: barDetails
                }]

            };

            var barGraph = new Chart(barChart, {
                type: 'bar',

                data: barChartData,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });


            var lineDetails = [];
            var lineChartLabels = ["Total cases", "Total deaths", "Total recovered", "Active cases", "Today Cases", "Today deaths", "Today recovered"];

            var lineChart = document.getElementById("myLineChart");
            lineDetails.push(result.cases);
            lineDetails.push(result.deaths);
            lineDetails.push(result.recovered);
            lineDetails.push(result.active);
            lineDetails.push(result.todayCases);
            lineDetails.push(result.todayDeaths);
            lineDetails.push(result.todayRecovered);



            var lineChartData = {
                labels: lineChartLabels,
                datasets: [{
                    backgroundColor: ["red", "blue", "green", "darkturquoise", "crimson", "orangered", "maroon"],
                    label: "Count",

                    data: lineDetails
                }]

            };

            var lineGraph = new Chart(lineChart, {
                type: 'line',

                data: lineChartData,
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

        });

    var yearUrl = `https://api.covid19api.com/country/${country}/status/confirmed`;

    fetch(yearUrl)
        .then((data) => {

            return data.json();
        }).then((result) => {

            var yearMonth = [];
            result.forEach(element => {

                var todayDate = new Date(element.Date);
                // console.log(todayDate);
                var format = todayDate.toDateString();
                format = format.split(" ");
                // console.log(format);

                var dateFormat = format[1] + " " + format[3];
                yearMonth.push(dateFormat);
                element.Date = dateFormat;

            });
            // console.log(result);

            var jan20Count = 0;
            var jun20Count = 0;
            var dec20Count = 0;
            var jan21Count = 0;
            var jun21Count = 0;
            var dec21Count = 0;
            var jan22Count = 0;
            result.forEach((element) => {


                if (element.Date == "Jan 2020") {
                    jan20Count = element.Cases;
                }
                if (element.Date == "Jun 2020") {
                    jun20Count = element.Cases;
                }
                if (element.Date == "Dec 2020") {
                    dec20Count = element.Cases;
                }
                if (element.Date == "Jan 2021") {
                    jan21Count = element.Cases;
                }
                if (element.Date == "Jun 2021") {
                    jun21Count = element.Cases;
                }
                if (element.Date == "Dec 2021") {
                    dec21Count = element.Cases;
                }
                if (element.Date == "Jan 2022") {
                    jan22Count = element.Cases;
                }
            });
            console.log("2020 January count: " + jan20Count);
            console.log("2020 June count: " + jun20Count);
            console.log("2020 December count: " + dec20Count);
            console.log("2021 January count: " + jan21Count);
            console.log("2021 June count: " + jun21Count);
            console.log("2021 December count: " + dec21Count);
            console.log("2022 January count: " + jan22Count);

            var yearBarDetails = [];
            var yearBarChartLabels = ["Jan 2020", "June 2020", "Dec 2020", "Jan 2021", "June 2021", "Dec 2021", "Jan 2022"];

            var yearBarChart = document.getElementById("myYearBarChart");
            yearBarDetails.push(jan20Count);
            yearBarDetails.push(jun20Count);
            yearBarDetails.push(dec20Count);
            yearBarDetails.push(jan21Count);
            yearBarDetails.push(jun21Count);
            yearBarDetails.push(dec21Count);
            yearBarDetails.push(jan22Count);



            var yearBarChartData = {
                labels: yearBarChartLabels,
                datasets: [{
                    backgroundColor: ["red", "blue", "green", "darkturquoise", "crimson", "orangered", "maroon"],
                    label: "Count",

                    data: yearBarDetails
                }]

            };

            var yearBarGraph = new Chart(yearBarChart, {
                type: 'bar',

                data: yearBarChartData,
                options: {

                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });

        });

});