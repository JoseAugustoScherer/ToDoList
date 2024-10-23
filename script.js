/* HG Weather API */
const API_KEY = 'e35a06b6';
const BASE_URL = `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}`;

document.getElementById('city-name').innerText = 'Carregando...';

/* Função para buscar o clima por cidade */
async function getWeather(city = 'Lajeado') {
  try {
    const response = await fetch(`${BASE_URL}&city_name=${city}`);
    const data = await response.json();

    if (data.results) {
      atualizarWidget(data.results);
    } else {
      alert('Não foi possível obter os dados sobre o clima!');
    }
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    alert('Erro ao conectar com a API.');
  }
}

/* Função para buscar o clima por coordenadas */
async function getWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`${BASE_URL}&lat=${lat}&lon=${lon}`);
    const data = await response.json();

    if (data.results) {
      atualizarWidget(data.results);
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    alert('Erro ao conectar com a API.');
  }
}

/* Função para atualizar o widget com dados do clima */
function atualizarWidget(data) {
  document.getElementById('city-name').innerText = data.city;
  document.getElementById('temperature').innerText = `Temperatura: ${data.temp}°C`;
  //document.getElementById('description').innerText = `Descrição: ${data.description}`;
}

/* Função principal para inicializar a geolocalização */
function iniciarGeolocalizacao() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.warn('Erro ao obter localização:', error.message);
        getWeather();
      }
    );
  } else {
    console.warn('Geolocalização não suportada no navegador.');
    getWeather();
  }
}

iniciarGeolocalizacao();


/* Adiciona imagens na descrição do clima */
function atualizarWidget(data) {
    document.getElementById('city-name').innerText = data.city;
    document.getElementById('temperature').innerText = `Temperatura: ${data.temp}°C`;
    document.getElementById('description').innerText = `Descrição: ${data.description}`;
    
    const weatherIconsDay = {
      "Ensolarado": "Assets/Wheater/none_day.svg",
      "Tempo nublado": "Assets/Wheater/cloud.svg",
      "Parcialmente nublado": "Assets/Wheater/cloudly_day.svg",
      "Chuva": "Assets/Wheater/rain.svg",
      "Tempestade": "Assets/Wheater/storm.svg",
    };

    const weatherIconsNight = {
        "Ensolarado": "Assets/Wheater/none_night.svg",
        "Tempo nublado": "Assets/Wheater/cloud.svg",
        "Parcialmente nublado": "Assets/Wheater/cloudly_night.svg",
        "Chuva": "Assets/Wheater/rain.svg",
        "Tempestade": "Assets/Wheater/storm.svg",
    };
  
    const now     = new Date();
    const day     = now.getDate();
    const month   = now.getMonth() + 1;
    const year    = now.getFullYear();

    document.getElementById( 'current-date' ).innerText = `${day}/${month}/${year}`;
    
    let hours = now.getHours();

    // Função para atualizar o horário

    function updateHours() {
        const now     = new Date();
        hours  = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        document.getElementById('hours').innerText = `${hours}h${minutes}m${seconds}s`;
    }

    updateHours();
    setInterval(updateHours, 1000);

    // Verifica o horário para definir corretamente as imagens
    if( (hours >= 6 && hours < 18) ){
        const iconSrc = weatherIconsDay[data.description] || "imagens/default.png";
        document.getElementById('weather-icon').src = iconSrc;
    } else {
        const iconSrc = weatherIconsNight[data.description] || "imagens/default.png";
        document.getElementById('weather-icon').src = iconSrc;
    }
}

// Adicionar tarefas