let lat, lon;

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air, temp;
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.querySelector('.latitude').textContent = lat.toFixed(2);
            document.querySelector('.longitude').textContent = lon.toFixed(2);
            const api_url = `/weather/${lat},${lon}`;
            const response = await fetch(api_url);
            const json = await response.json();
            weather = json.weather.current.weather[0].description;
            temp = json.weather.current.temp;
            air = json.air_quality.results[0].measurements[0];
            document.getElementById('summary').textContent = weather;
            document.getElementById('temperature').textContent = temp;
            document.getElementById('aq_parameter').textContent = `(${air.parameter})`;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.units;
            document.getElementById('aq_date').textContent = air.lastUpdated;
       
            

        }   catch (error) {
            console.log(error);
            air = { value: -1 };
            document.getElementById('summary').textContent = weather;
            document.getElementById('temperature').textContent = temp;
            document.getElementById('aq_value').textContent = 'YET TO BE RECORDED';
            document.getElementById('aq_date').textContent = "";
        }

        const data = { lat, lon, weather, air, temp };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', options)
            const db_json = await db_response.json();
            console.log(db_json);
    });
} else {
    console.log('geolocation not available')
}


                