# P5.js: CRT

[Deutsch](README_DE.md)

Streams the canvas of a p5 sketch as JPEG frames over a WebSocket to a
Raspberry Pi, which shows them on a CRT TV (composite video, PAL). The demo
draws the webcam image with three moving circles in red, green and blue on
top. A starting point for using an old TV as an output for a sketch.

## Installation

Requirements: a Raspberry Pi with a CRT on its composite output running
`crt-websocket` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(port 8100), a webcam and a browser on the same network.

1. Start the server on the Pi. It shows its IP address on the TV.
2. Enter that address in `connection` at the top of `sketch.js`, e.g.
   `ws://10.21.14.32:8100`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. Allow camera access. The frames are sent as soon as the connection is
   open.

Libraries (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (included, not used).

License: MIT

## Coding Help

- **`sketch.js` → `connection`, `crt`**: server address and the PAL size
  720 × 576. The server writes each frame directly into a 720 × 576
  framebuffer, so the frames it receives must have exactly that size.
- **`setup()`**: creates a window-sized canvas and a half-size buffer
  `camCanvas1`, starts the webcam, sets 25 fps and opens the WebSocket
  (`binaryType = "arraybuffer"`). `onopen` sends the first frame, and every
  `ok` from the server triggers the next one — so the sketch never sends
  faster than the TV can show.
- **`sendFrame()`**: copies the top-left part of the canvas into
  `camCanvas1`, encodes it as JPEG (quality 0.9) and sends the bytes.
  Because `pixelDensity(1)` is only set after the buffer is created, the
  real pixel size of the buffer depends on the screen's pixel density —
  check it if the TV stays dark.
- **`draw()`**: draws the webcam image at 360 × 288 and three circles that
  move at different speeds. Replace this with your own drawing.
