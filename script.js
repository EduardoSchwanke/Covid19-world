'use stritc';

let banco = [

];

const showData = (banco) => {
    const container = document.createElement('div');
    if(banco.country == undefined){
        banco.country = "World"
    }
    container.innerHTML = `
        <div class="name-county">
            ${banco.country}
        </div>
        <div class="card casos">
            <p>Casos</p>
            <p>${banco.cases}</p>
        </div>
        <hr>
        <div class="card mortes">
            <p>Mortes</p>
            <p>${banco.deaths}</p>
        </div>
    `;
    const info = document.querySelector('#info');
    info.removeChild(info.firstChild);
    info.appendChild(container);
}

const getCovidWorld = async () =>{
    const url = "https://disease.sh/v3/covid-19/all";
    const getApi = await fetch(url);
    const json = await getApi.json();
    showData(json)
}

const getCovidCountry = async (event) => {
    let country = event.target.parentNode.id;
    if(country == ''){
        country = event.target.id;
    }
    if(country == 'world-map'){
        getCovidWorld();
    }else{
        const url = `https://disease.sh/v3/covid-19/countries/${country}`;
        const getApi = await fetch(url);
        const json = await getApi.json();
        showData(json)
    }
}

getCovidWorld();
document.querySelector('svg').addEventListener('click', getCovidCountry)