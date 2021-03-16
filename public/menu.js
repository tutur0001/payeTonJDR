let body = document.querySelector('body');
let style = document.querySelector('style');

let linkCss = '';
let elements = '';

// ajout du css minifier
function addCss() {
    linkCss = `@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap");body{background-image:linear-gradient(to top, rgba(230,230,230,0.26) 0%, rgba(230,230,230,0.137) 100%),url("asset/img/krystian-piatek-DO9LH7eJXPg-unsplash.jpg");background-position:center;background-attachment:fixed;background-size:cover}body header{width:100vw;text-align:center}body header h1{padding-top:5vh;font-size:8vw;font-family:'Cinzel Decorative', cursive}body main{width:80vw;display:flex;flex-wrap:wrap;justify-content:space-around;margin:0 auto}body main div{cursor:pointer;display:flex;justify-content:center;align-items:center;width:35vw;height:25vh;background-image:linear-gradient(to bottom, rgba(255,255,255,0.171) 0%, rgba(255,255,255,0.363) 50%, rgba(255,255,255,0.171) 100%);border-radius:50px;box-shadow:5px 5px 10px black}body main div p{font-size:40px;font-weight:bold}body main div:nth-child(1),body main div:nth-child(2){margin-bottom:50px;margin-top:50px}body main div.press{box-shadow:inset 5px 5px 10px black}`;
    style.innerHTML = linkCss;
    addHtml();
};


// ajout du corps de la page
function addHtml() {
    elements = '<header><h1>Payes ton JDR</h1></header>';
    elements += '<main><div id="d1" onclick="press(1)"><p>Créer une partie</p></div><div id="d2" onclick="press(2);window.location.href=`game.html`"><p>Rejoindre une partie</p></div><div id="d3" onclick="press(3)"><p>Modifier/Créer un Personnage</p></div><div id="d4" onclick="press(4)"><p>Paramètres</p></div></main>';
    body.innerHTML = elements;
}
addCss();

function press(number) {
    document.getElementById(`d${number}`).classList.add('press');
};


const audioContext = new (window.AudioContext || window.webkitAudioContext)();

navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
        const source = audioContext.createBufferSource();
        source.addEventListener('ended', () => {
            source.stop();
            audioContext.close();
        });

        const request = new XMLHttpRequest();

        request.open('GET', 'asset/sounds/soothing-medieval-music-medieval-villages-relaxing-beautiful-16.mp3', true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            audioContext.decodeAudioData(
                request.response,
                (buffer) => {
                    source.buffer = buffer;
                    source.connect(audioContext.destination);
                    source.start();
                },
                (e) => {
                    console.log('Error with decoding audio data' + e.message);
                });
        }

        request.send();
    })
    .catch(reason => console.error(`Audio permissions denied: ${reason}`));