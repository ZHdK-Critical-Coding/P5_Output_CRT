let socket;
const connection = "ws://10.21.14.32:8100";
const crt = { width: 720, height: 576};
let camCanvas1, baseCanvas;
let cam; // webcam video capture

function sendFrame() {
  if (!camCanvas1 || !canvas) return
  // Copy from the main canvas to the buffer
  camCanvas1.copy(baseCanvas, 0, 0, crt.width, crt.height, 0, 0, crt.width, crt.height);

  camCanvas1.elt.toBlob(
    (blob) => {
      blob.arrayBuffer().then((buffer) => {
        socket.send(buffer);
      });
    },
    "image/jpeg",
    0.9
  );
}

function setup() {
  baseCanvas = createCanvas(windowWidth, windowHeight);
  camCanvas1 = createGraphics(crt.width * .5, crt.height * .5); // The secondary canvas (buffer)
  frameRate(25);
  pixelDensity(1);

  // ✅ Start webcam
  cam = createCapture(VIDEO);
  cam.size(crt.width, crt.height);
  cam.hide(); // hide raw HTML video element

  socket = new WebSocket(connection);
  socket.binaryType = "arraybuffer";

  socket.onopen = () => {
    console.log("Mit WebSocket-Server verbunden");
    requestAnimationFrame(sendFrame);
  };

  socket.onmessage = (event) => {
    if (event.data === "ok") {
      requestAnimationFrame(sendFrame);
    }
  };
}

function draw() {
  background('red')
  // ✅ Draw webcam frame as background
  image(cam, 0, 0, crt.width * .5, crt.height * .5);

  // ✅ Draw your moving dots on top
  fill(255, 0, 0);
  ellipse(frameCount % width, 40, 50, 50);

  fill(0, 255, 0);
  ellipse((frameCount * 1.9) % width, 80, 50, 50);

  fill(0, 0, 255);
  ellipse((frameCount * 3.8) % width, 120, 50, 50);
}