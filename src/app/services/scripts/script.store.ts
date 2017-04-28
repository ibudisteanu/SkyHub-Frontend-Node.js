interface Scripts {
    name: string;
    scriptTag: string;
    scriptType: string;
    src: string;
}

export const ScriptStore: Scripts[] = [
    {name: 'filepicker', scriptTag : 'script',  scriptType : 'text/javascript' , src: 'https://api.filestackapi.com/filestack.js'},
    {name: 'rangeSlider', scriptTag : 'script', scriptType : 'text/javascript' , src: '../../../assets/js/ion.rangeSlider.min.js'},


    {name: 'countrySelectRegistrationInitialization', scriptTag : 'script', scriptType : 'text/javascript',
        src: 'src/app/pages/authentication/register/register-country-select-initialization.js' },

    {name: 'countrySelect', scriptTag : 'script', scriptType : 'text/javascript',
        src: 'https://cdn.rawgit.com/mrmarkfrench/country-select-js/master/build/js/countrySelect.min.js', },

    {name: 'countrySelectCSS', scriptTag : 'link', scriptType : 'text/css',
        src: 'https://cdn.rawgit.com/mrmarkfrench/country-select-js/master/build/css/countrySelect.css'},

    {name: 'countrySelectPersonalCSS', scriptTag : 'link', scriptType : 'text/css',
        src: 'src/app/pages/authentication/register/register-country-select-initialization.css'},
];

// src: '../../../pages/authentication/register/register-country-select-initialization.js' },

