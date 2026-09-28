# P5.js: CRT

[English](readme.md)

Streamt die Zeichenfläche eines p5-Sketches als JPEG-Frames über einen
WebSocket an einen Raspberry Pi, der sie auf einem Röhrenfernseher zeigt
(Composite-Video, PAL). Die Demo zeichnet das Webcam-Bild und darüber drei
bewegte Kreise in Rot, Grün und Blau. Ein Ausgangspunkt, um einen alten
Fernseher als Ausgabe für einen Sketch zu verwenden.

## Installation

Voraussetzungen: ein Raspberry Pi mit einem CRT am Composite-Ausgang, auf
dem `crt-websocket` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
läuft (Port 8100), eine Webcam und ein Browser im selben Netzwerk.

1. Den Server auf dem Pi starten. Er zeigt seine IP-Adresse auf dem
   Fernseher.
2. Diese Adresse oben in `sketch.js` bei `connection` eintragen, z. B.
   `ws://10.21.14.32:8100`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
4. Den Kamerazugriff erlauben. Die Frames werden gesendet, sobald die
   Verbindung steht.

Bibliotheken (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Coding-Hilfe

- **`sketch.js` → `connection`, `crt`**: Server-Adresse und die PAL-Grösse
  720 × 576. Der Server schreibt jeden Frame direkt in einen
  720 × 576-Framebuffer, die empfangenen Frames müssen also genau so gross
  sein.
- **`setup()`**: erstellt eine fenstergrosse Zeichenfläche und einen halb so
  grossen Buffer `camCanvas1`, startet die Webcam, setzt 25 fps und öffnet
  den WebSocket (`binaryType = "arraybuffer"`). `onopen` schickt den ersten
  Frame, und jedes `ok` vom Server löst den nächsten aus – so sendet der
  Sketch nie schneller, als der Fernseher anzeigen kann.
- **`sendFrame()`**: kopiert den oberen linken Teil der Zeichenfläche in
  `camCanvas1`, kodiert ihn als JPEG (Qualität 0.9) und schickt die Bytes.
  Weil `pixelDensity(1)` erst nach dem Buffer gesetzt wird, hängt die
  echte Pixelgrösse des Buffers von der Pixeldichte des Bildschirms ab –
  das prüfen, wenn der Fernseher dunkel bleibt.
- **`draw()`**: zeichnet das Webcam-Bild in 360 × 288 und drei Kreise, die
  sich unterschiedlich schnell bewegen. Hier die eigene Zeichnung einsetzen.
