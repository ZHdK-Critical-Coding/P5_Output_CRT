# P5.js: CRT

[English](readme.md)

Streamt die Zeichenfläche eines p5-Sketches als JPEG-Frames über einen
WebSocket an einen Raspberry Pi, der sie auf einem Röhrenfernseher zeigt
(Composite-Video, PAL). Die Demo zeichnet das Webcam-Bild und darüber drei
bewegte Kreise in Rot, Grün und Blau. Ein Ausgangspunkt, um einen alten
Fernseher als Ausgabe für einen Sketch zu verwenden.

## Installation

Voraussetzungen: eine Webcam und ein Browser im selben Netzwerk wie der Pi
(siehe Server).

Bibliotheken (in `libraries/`): p5.js 1.11.10, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Server

Braucht `crt-websocket` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
auf einem Raspberry Pi mit einem Röhrenfernseher am Composite-Ausgang
(PAL), Port 8100. Zuerst mit `bash run.sh` im Ordner auf dem Pi starten;
er zeigt die IP des Pi auf dem Fernseher. Er nimmt JPEG-Frames von genau
720 × 576 an und antwortet nach jedem mit `ok`. Seine Adresse oben in
`sketch.js` bei `connection` eintragen.

## Ausführen

1. Den Server auf dem Pi starten (siehe Server). Er zeigt seine IP-Adresse auf dem
   Fernseher.
2. Diese Adresse oben in `sketch.js` bei `connection` eintragen, z. B.
   `ws://10.21.14.32:8100`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
4. Den Kamerazugriff erlauben. Die Frames werden gesendet, sobald die
   Verbindung steht.

## Coding-Hilfe

- **`sketch.js` → `connection`, `crt`**: Server-Adresse und die PAL-Grösse
  720 × 576. Der Server schreibt jeden Frame direkt in einen
  720 × 576-Framebuffer, die empfangenen Frames müssen also genau so gross
  sein.
- **`setup()`**: setzt `pixelDensity(1)`, erstellt eine fenstergrosse
  Zeichenfläche und einen Buffer `camCanvas1` von genau 720 × 576 Pixeln
  (ebenfalls mit `pixelDensity(1)`, damit Retina-Bildschirme seine Grösse
  nicht verändern), startet die Webcam, setzt 25 fps und öffnet
  den WebSocket (`binaryType = "arraybuffer"`). `onopen` schickt den ersten
  Frame, und jedes `ok` vom Server löst den nächsten aus – so sendet der
  Sketch nie schneller, als der Fernseher anzeigen kann.
- **`sendFrame()`**: kopiert die oberen linken 720 × 576 Pixel der
  Zeichenfläche in `camCanvas1`, kodiert sie als JPEG (Qualität 0.9) und
  schickt die Bytes. Nur dieser Bereich erscheint auf dem Fernseher; ist
  das Browserfenster kleiner, bleibt der Rest schwarz.
- **`draw()`**: zeichnet das Webcam-Bild in 720 × 576 und drei Kreise, die
  sich unterschiedlich schnell bewegen. Hier die eigene Zeichnung einsetzen.
