function getCountryAndInitializeCountrySelect()
{
    try {
        $.getJSON("http://freegeoip.net/json/", function (data) {

            var sCountry = data.country_name;
            var sCountryCode = data.country_code;
            var sCity = data.city;
            var sLatitude = data.latitude;
            var sLongitude = data.longitude;

            var ip = data.ip;

            console.log(sCountry);
            console.log(sCountryCode.toLowerCase());


            $("#countryInput").countrySelect({
                defaultCountry : sCountryCode.toLowerCase(),
                preferredCountries: ['ca', 'gb', 'us',  sCountryCode.toLowerCase()]
            });

            $("#cityInput").val(sCity);

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