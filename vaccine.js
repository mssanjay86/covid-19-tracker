// jshint esversion:6

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;

}
if (mm < 10) {
    mm = '0' + mm;

}
var fullDate = dd + "-" + mm + "-" + yyyy;


var districts;

document.addEventListener('DOMContentLoaded', () => {
    var dropDown = document.querySelector("#drop-districts");

    fetch("districtid.json")
        .then((data) => {
            return data.json();
        }).then((result) => {
            console.log(result);
            districts = result;
            var districtsDrop = document.getElementById("drop-districts");

            for (var i = 0; i <= districts.length; i++) {
                var options = document.createElement('option');


                options.innerHTML = districts[i]['district name'] + "-" + districts[i]['district id'];
                districtsDrop.append(options);

            }


        });

});
var districtId;

document.getElementById("drop-districts").addEventListener('change', (e) => {

    districtId = e.target.value.split("-")[1];
    console.log(districtId);
    var vaccineImg = document.querySelector(".vaccine-img");
    var vaccinePara = document.querySelector(".vaccine-para");
    var centreName = document.querySelector("#centre-name");
    var centreAddress = document.querySelector("#centre-address");
    var vaccineName = document.querySelector("#vaccine-name");
    var vaccineDate = document.querySelector("#vaccine-date");
    var fees = document.querySelector("#fees");
    var stateName = document.querySelector("#state-name");
    var districtName = document.querySelector("#district-name");
    var availableSlot = document.querySelector("#available-slot");

    vaccineImg.style.display = "None";
    vaccinePara.style.display = "None";
    document.querySelector(".details-container").style.marginTop = "30px";


    var vaccineCentreUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${fullDate}`;


    fetch(vaccineCentreUrl)
        .then((data) => {
            return data.json();
        }).then((result) => {
            console.log(result);
            if (result.sessions.length == 0) {
                alert("No vaccination centers found ");
            } else {

                centreName.innerHTML = result.sessions[0].name;
                centreAddress.innerHTML = result.sessions[0].address;
                vaccineName.innerHTML = result.sessions[0].vaccine;
                vaccineDate.innerHTML = result.sessions[0].date;
                if (result.sessions[0].fee > 0) {
                    fees.innerHTML = result.sessions[0].fee;
                } else {
                    fees.innerHTML = "Free of cost";
                }
                stateName.innerHTML = result.sessions[0].state_name;
                districtName.innerHTML = result.sessions[0].district_name;
                availableSlot.innerHTML = result.sessions[0].slots[0].time + ", " + result.sessions[0].slots[1].time + ", " + result.sessions[0].slots[2].time;
            }


        });
});