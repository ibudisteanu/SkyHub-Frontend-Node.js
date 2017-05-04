var timerInitializationInterval;
var countryData = {};

function getCountryAndInitializeCountrySelect()
{
    try {
        $.getJSON("http://freegeoip.net/json/", function (data) {

            countryData.sCountry = data.country_name;
            countryData.sCountryCode = data.country_code;
            countryData.sCity = data.city;
            countryData.sLatitude = data.latitude;
            countryData.sLongitude = data.longitude;

            var ip = data.ip;

            console.log(countryData);

            timerInitializationInterval = setInterval(function (){

                if (($("#countryInput").length)&&($("#cityInput").length)){

                    $("#countryInput").countrySelect({
                        defaultCountry : countryData.sCountryCode.toLowerCase(),
                        preferredCountries: ['ca', 'gb', 'us',  countryData.sCountryCode.toLowerCase()]
                    });

                    $("#cityInput").val(countryData.sCity);

                    clearInterval(timerInitializationInterval);
                }

            }, 500);

        });
    }
    catch (Exception)
    {
        $("#countryInput").countrySelect({
            defaultCountry : 'us',
            preferredCountries: ['ca', 'gb', 'us']
        });
    }
}

getCountryAndInitializeCountrySelect();

console.log('country selected initialized');