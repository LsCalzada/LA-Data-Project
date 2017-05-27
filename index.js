// automatically loads data on page without having to click a button
window.onload = function() {
    getLADataFromAPI();
};

function getLADataFromAPI(){
    var endpoint ='https://data.lacity.org/resource/ghu5-z54x.json';
    
    fetch(endpoint)
    .then(function(data){
        return data.json();
    })
    .then(function(json){
        console.log(json);
        var list = "";
       // resultDiv.innerHTML= JSON.stringify(json, undefined, 2)
        //var wantedData = 
        json.forEach(function(item){
            // there were some dates that had an "undefined" value
            // in order for the .split() method to work, you must change the value of that date into a string
            if (item.date_of_event === undefined) {
                item.date_of_event = "";
            } 
            
            // 2015-07-18T00:00:00.000
            var dateArray = item.date_of_event.split("T"); // ["2015-07-18", "00:00.000"]
            var newDateArray = dateArray[0].split("-"); // ["2015", "07", "18"]
            var year = newDateArray[0]; // 2015
            var day = newDateArray[2]; // 18
            var month = newDateArray[1]; // 07
            var date = month + "/" + day + "/" + year; // 07/18/2015
            
           // console.log(date);
            
            item.date_of_event = date;
            
            var dateOfEvent = item.date_of_event;
            var sTime = item.start_time;
            var eTime = item.end_time;
            var address = item.location_address;
            var locationCity =item.location_city;
            var locationZip = item.location_zip;
            var description = item.notes;
            var lang = item.language;
            var phoneNumber = item.contact;
            var organization = item.organization;
            //return 'Come join the ' + organization + ' at '+ dateOfEvent + ' starting from ' +sTime +' to '+ eTime + ' at ' + address +' ' + locationZip + ' ' + locationCity + ', California. Available in ' + lang +'. Call ' + phoneNumber +' for more information.' + item.notes;
            
            var table = `
            <tr>
                <td>${item.organization}</td>
                <td>${item.date_of_event}</td>
                <td>${item.location_address + " " + item.location_city + " " + item.locationZip}</td>
                <td>${item.start_time + " to " + item.end_time}</td>
                <td>${item.language}</td>
                <td>${item.notes}</td>
            </tr>
            `;
            
            list += table;
            
        });
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = list;
        /*
        var htmlForWantedData = wantedData.map(function(item){
            return '<li>' + string + '</li>';
        });
       var finalHTML = '';
        htmlForWantedData.forEach(function(listItem){
            finalHTML += listItem;
        });
        resultDiv.innerHTML = finalHTML;
        */
    })
    .catch(function(error){
        console.log(error);
    });
} 
//var i = listItem
// for (i =0; i < 26; i++)
// return wantedData[i]
//where do i put this?
//(i = 0; i < 40; i++ )
//Goal
//- put down cards for each of the list <li> items. 
//- when put into a card, seperate the items so that it the date, time, are shown rather than a list
//- attempt to include a varible description.
//- (optional) fix dateOfEvent so that the month, year, and day are displayed 
/* 
Copy of code
function getLADataFromAPI(){
    var endpoint ='https://data.lacity.org/resource/ghu5-z54x.json'
    
    fetch(endpoint)
    .then(function(data){
        return data.json()
    })
    .then(function(json){
        console.log(json)
        var resultDiv = document.getElementById('result')
       // resultDiv.innerHTML= JSON.stringify(json, undefined, 2)
        var wantedData = json.map(function(item){
            var dateOfEvent = item.date_of_event
            var sTime = item.start_time
            var eTime = item.end_time
            var address = item.location_address
            var locationCity =item.location_city
            var locationZip = item.location_zip
            //var description = item.notes
            var lang = item.language
            var phoneNumber = item.contact
            return 'Come join us in '+ dateOfEvent + ' starting from ' +sTime +' to '+ eTime + ' at ' + address +' ' + locationZip + ' ' + locationCity + ', California  workshop. Available in ' + lang +'. Call ' + phoneNumber +' for more information.'
        })
        var htmlForWantedData = wantedData.map(function(string){
            return '<li>' + string + '</li>'
        })
        var finalHTML = ''
        htmlForWantedData.forEach(function(listItem){
            finalHTML += listItem
        })
        resultDiv.innerHTML = finalHTML
    })
    .catch(function(error){
        console.log(error)
    })
} 
*/