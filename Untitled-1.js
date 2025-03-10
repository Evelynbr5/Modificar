// Seleciona os elementos do DOM
const botaoMusica = document.getElementById('play_btn'); 
const musica = new Audio('som/song.mp3');

let nextDom = document.getElementById('next'); 
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel'); 
let sliderDom = carouselDom.querySelector('.carousel-list'); // Corrigido 'carousel list' para 'carousel-list'

// Seleciona os elementos do carrossel
let thumbnailBorderDom = document.querySelector('.carousel-thumbnail'); // Corrigido 'carousel thumbnail' para 'carousel-thumbnail'
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

let timeDom = document.querySelector('.carousel-time'); // Corrigido 'carousel time' para 'carousel-time'

// Adiciona o primeiro item do carrossel ao final da lista para criar a animação de loop
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Define o tempo de duração da animação e o tempo de espera para o próximo slide automático
let timeRunning = 3000; // Tempo da animação (em milissegundos)
let timeAutonext = 9000; // Tempo de espera para o próximo slide automático (em milissegundos)

// Adiciona um evento de clique ao botão de reprodução
botaoMusica.addEventListener("click", () => {
    // Verifica se a música está pausada
    if (musica.paused) {
        // Reproduz a música
        musica.play();
    } else {
        // Pausa a música
        musica.pause();
    }
});

// Adiciona eventos de clique aos botões "próximo" e "anterior"
nextDom.onclick = function () {
    showSlider('next');
};

prevDom.onclick = function () {
    showSlider('prev');
};

// Inicializa o temporizador para o próximo slide automático
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutonext);

// Função para mostrar o próximo ou o slide anterior
function showSlider(type) {
    // Seleciona os itens do carrossel e do slider
    let sliderItemsDom = sliderDom.querySelectorAll('.carousel-item'); // Corrigido 'carousel list .item' para 'carousel-item'
    let thumbnailItemsDom = document.querySelectorAll('.carousel-thumbnail .item'); // Corrigido 'carousel thumbnail item' para 'carousel-thumbnail .item'

    // Verifica se o tipo de slide é "próximo" 
    if (type === 'next') {
        // Move o primeiro item do slider para o final
        sliderDom.appendChild(sliderItemsDom[0]);

        // Move o primeiro item do carrossel para o final
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

        // Adiciona a classe "next" ao carrossel para iniciar a animação
        carouselDom.classList.add('next');
    } else {
        // Move o último item do slider para o início
        sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);

        // Move o último item do carrossel para o início
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);

        // Adiciona a classe "prev" ao carrossel para iniciar a animação
        carouselDom.classList.add('prev');
    }

    // Limpa o temporizador anterior
    clearTimeout(runTimeOut);

    // Define um novo temporizador para remover as classes de animação após o tempo definido
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // Limpa o temporizador do próximo slide automático
    clearTimeout(runNextAuto);

    // Define um novo temporizador para o próximo slide automático
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutonext);
}
