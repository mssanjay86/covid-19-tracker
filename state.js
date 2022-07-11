// jshint esversion:6

var tblValues = document.getElementById("tbl-values");
var tblBody = document.getElementById("tbl-body");

fetch("https://api.rootnet.in/covid19-in/stats/latest")
    .then((data) => {
        return data.json();
    }).then((result) => {
        console.log(result);
        for (i = 0; i < result['data']['regional'].length; i++) {
            var newRow = document.createElement('tr');
            var stateData = document.createElement('td');
            var totalCases = document.createElement('td');
            var recoveredCases = document.createElement('td');
            var deaths = document.createElement('td');

            stateData.innerHTML = result['data']['regional'][i]['loc'];
            totalCases.innerHTML = result['data']['regional'][i]['totalConfirmed'];
            recoveredCases.innerHTML = result['data']['regional'][i]['discharged'];
            deaths.innerHTML = result['data']['regional'][i]['deaths'];

            tblBody.append(newRow.appendChild(stateData));
            tblBody.append(newRow.appendChild(totalCases));
            tblBody.append(newRow.appendChild(recoveredCases));
            tblBody.append(newRow.appendChild(deaths));

            console.log(tblBody);
            // newRow.remove();
        }
    });