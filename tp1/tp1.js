//Link de Youtube: https://youtu.be/zWyilLeE2no

// VARIABLES
let imagenDeCirculos; 

let cantidad = 29; // cantidad de círculos
let dx = 0; // desplazamiento mouseX
let dy = 0; // desplazamiento mouseY
let xFinal; // nuevas coordenadas desplazadas
let yFinal; // nuevas coordenadas desplazadas
let rRandom = 255;
let gRandom = 0;
let bRandom = 0;


function preload() {
  // Carga la imagen antes de setup
  imagenDeCirculos = loadImage("assets/Figura-circulos.jpg");
}

// SETUP 
function setup() {
  createCanvas(800, 400);
  noFill();
}

// DRAW 
function draw() {
  background(161, 227, 142); // VERDE CLARO
  dibujoDeCirculos(); // FUNCIÓN que NO retorna un valor

  // FUNCIÓN que RETORNA un valor
  let coordenadas = mostrarCoordenadas(mouseX, mouseY);
  push();
  fill(0);               // texto en negro
  noStroke();
  textSize(16);
  text("Coordenadas: " + coordenadas, 10, 20);
  pop();
}

// FUNCIONES

// FUNCIÓN que NO retorna un valor
function dibujoDeCirculos() {
  // FOR: de los círculos rojos con degradado
  for (let i = 0; i < cantidad; i++) {
    let diametro = (i + 1) * 10;

    let rojo = map(i, 0, cantidad - 1, 255, 40);
    stroke(rRandom, gRandom, bRandom, rojo); // Rojo con transparencia y RGB

    let grosor = map(i, 0, cantidad - 1, 4, 1.2); // Más grueso en el centro
    strokeWeight(grosor);
    ellipse(600, 200, diametro, diametro);
  }

  push(); // Guarda la posición original
  translate(width / 2, 0); // mitad derecha

  stroke(random(mouseX)); // Color random si el mouse se mueve
  strokeWeight(2.5); // Grosor de los puntos

  // FOR ANIDADO
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      xFinal = x + dx;
      yFinal = y + dy;

      // Condicional: para que se vean los puntos solo si están dentro de la mitad derecha
      if (xFinal >= 0 && xFinal < width / 2 && yFinal >= 0 && yFinal < height) {
        point(xFinal, yFinal);
      }
    }
  }

  pop(); // Vuelve a posición original

  image(imagenDeCirculos, 0, 50, 400, 300); // Muestra la imagen
}

// FUNCIÓN que RETORNA un valor
// Recibe dos valores y retorna un String con las coordenadas
function mostrarCoordenadas(x, y) {
  return x + " / " + y;
}

// EVENTOS 

function mouseMoved() {
  // Mueve los puntos con el movimiento del mouse
  if (mouseX > width / 2) {
    dx = mouseX - 600;
    dy = mouseY - 200;
  }
}

function mousePressed() {
  // Agregá más círculos, haciendo click con el mouse
  if ((cantidad + 1) * 10 <= 400) {
    // solo si el próximo diámetro no supera el límite
    cantidad++;
  }
}

function keyPressed() {
  if (key === ' ') {
    // Reiniciar a valores originales
    rRandom = 255;
    gRandom = 0;
    bRandom = 0;
    cantidad = 29;
    dx = 0;
    dy = 0;
  } else {
    // Cambia a un color aleatorio
    rRandom = random(255);
    gRandom = random(255);
    bRandom = random(255);
  }
}
