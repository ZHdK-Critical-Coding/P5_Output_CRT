# P5.js: CRT

[Deutsch](README_DE.md)

Streams the canvas of a p5 sketch as JPEG frames over a WebSocket to a
Raspberry Pi, which shows them on a CRT TV (composite video, PAL). The demo
draws the webcam image with three moving circles in red, green and blue on
top. A starting point for using an old TV as an output for a sketch.

## Installation

Requirements: a webcam and a browser on the same network as the Pi (see
Server).

Libraries (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (included, not used).

License: MIT

## Server

Needs `crt-websocket` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
running on a Raspberry Pi with a CRT TV on its composite output (PAL),
port 8100. Start it first with `bash run.sh` in the folder on the Pi; it
shows the Pi's IP on the TV. It takes JPEG frames of exactly 720 × 576 and
answers `ok` after each one. Put its address in `connection` at the top of
`sketch.js`.

## How to Run

1. Start the server on the Pi (see Server). It shows its IP address on the TV.
2. Enter that address in `connection` at the top of `sketch.js`, e.g.
   `ws://10.21.14.32:8100`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. Allow camera access. The frames are sent as soon as the connection is
   open.

## Coding Help

- **`sketch.js` → `connection`, `crt`**: server address and the PAL size
  720 × 576. The server writes each frame directly into a 720 × 576
  framebuffer, so the frames it receives must have exactly that size.
- **`setup()`**: sets `pixelDensity(1)`, creates a window-sized canvas and
  a buffer `camCanvas1` of exactly 720 × 576 pixels (also with
  `pixelDensity(1)`, so retina screens don't change its size), starts the
  webcam, sets 25 fps and opens the WebSocket (`binaryType = "arraybuffer"`). `onopen` sends the first frame, and every
  `ok` from the server triggers the next one — so the sketch never sends
  faster than the TV can show.
- **`sendFrame()`**: copies the top-left 720 × 576 pixels of the canvas
  into `camCanvas1`, encodes it as JPEG (quality 0.9) and sends the bytes.
  Only this area appears on the TV; if the browser window is smaller, the
  rest stays black.
- **`draw()`**: draws the webcam image at 720 × 576 and three circles that
  move at different speeds. Replace this with your own drawing.
