const section = document.getElementById("element_section")  
const tamponi = document.getElementById("tamponi")  
const totale_casi = document.getElementById("totale_casi")  
const data_pubblicazione = document.getElementById("data_pubblicazione")  
const ricoverati_con_sintomi = document.getElementById("ricoverati_con_sintomi")  
const terapia_intensiva = document.getElementById("terapia_intensiva")  
const totale_ospedalizzati = document.getElementById("totale_ospedalizzati")  
const isolamento_domiciliare = document.getElementById("isolamento_domiciliare")  
const totale_attualmente_positivi = document.getElementById("totale_attualmente_positivi")  
const nuovi_attualmente_positivi = document.getElementById("nuovi_attualmente_positivi")  
const dimessi_guariti = document.getElementById("dimessi_guariti")  
const deceduti = document.getElementById("deceduti")  

const giorni_array = []

// grafico
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');

const Arr_tamponi = ["229","650","1694","3089","5883","10149","17660" ]
const Arr_ospedalizzati = ["127","304","779","1641","3218","5915","8754" ]
const Arr_isolamento_domiciliare = ["94","284","798","1065","1843","2599","6201" ]


const Arr_guariti = ["1","45","83","276","589","1004","1439" ]
const Arr_deceduti = ["7","17","34","107","233","631","1266" ]
                 
 
// VALORI GLOBALI OGNI TERZO GIORNO
const GIORNI = ["FEB 24","FEB 27", "MAR 01","MAR 04","MAR 07","MAR 10", "MAR 13"]


var today = new Date();
var dd = String(today.getDate()-1).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd + " ";
  

const getJSON = () => { 
    fetch("./andamentoNazionale.js")
    .then(res => res.json())
    .then(data => {  
        var counter = 0
        const todayData = data.map(x => {     
            var data = x.data.slice(0,10);
            var ora = x.data.slice(11);  
            giorni_array[counter]  = data
            tamponi.innerHTML  = x.tamponi
            totale_casi.innerHTML = x.totale_casi
            data_pubblicazione.innerHTML  = x.data
            ricoverati_con_sintomi.innerHTML  = x.ricoverati_con_sintomi
            totale_ospedalizzati.innerHTML  = x.totale_ospedalizzati
            isolamento_domiciliare.innerHTML  = x.isolamento_domiciliare
            terapia_intensiva.innerHTML  = x.terapia_intensiva
            totale_attualmente_positivi.innerHTML  = x.totale_attualmente_positivi
            dimessi_guariti.innerHTML  = x.dimessi_guariti
            nuovi_attualmente_positivi.innerHTML  = x.nuovi_attualmente_positivi
            deceduti.innerHTML  = x.deceduti
            counter++
        })
             
     })
}
 

// Grafico 
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: GIORNI,
        datasets: [{
            label: "TOTALE CASI",  
            data: Arr_tamponi,
            borderWidth: 2,
            borderColor:  "rgb(241, 19, 230)", 
            fill: false,
         },  
         {
            label: "TOTALE OSPEDALIZZATI",  
            data: Arr_ospedalizzati,
            borderWidth: 2,
            borderColor:  "rgb(29, 82, 255)", 
            fill: false,
         }, 
         {
            label: "TOTALE ISOLAMENTO DOMICILIARE",  
            data: Arr_isolamento_domiciliare,
            borderWidth: 2,
            borderColor:  "rgb(0, 206, 45)", 
            fill: false,
         },]
    }, 
    options: { 
        tooltips: {
            mode: 'point'
        }, 
    },
});
var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: GIORNI,
        datasets: [ {
            label: "DECEDUTI",  
            data: Arr_deceduti , 
            borderColor:  "rgb(255, 29, 97)", 
            borderWidth: 2,
            fill: false,
        },{
            label: "GUARITI",  
            data:Arr_guariti ,
            borderWidth: 2,
            borderColor:  "rgb(29, 82, 255)", 
            fill: false,
         }]
    }, 
    options: { 
        tooltips: {
            mode: 'point'
        }, 
    },
});



getJSON();