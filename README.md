# apa102

AP102 LED drivers for MakeCode for micro:bit.

## ~ hint

APA102s are compatible with Bluetooth but requires one additional cable.

Unlike WS2018 LEDs ("neo-pixels") which are very sensitive to timing, APA102s have a clock lines
that allows to drive them correctly even when Bluetooth interrupts the code.

## ~

## Send Buffer

The APA102 light strip uses 4 bytes per pixel (see [datasheet](https://cdn-shop.adafruit.com/datasheets/APA102.pdf)):
* brightness pixel (lower 6 bytes)
* blue, green, red channels

```typescript
const buf = hex`ff0000ff ff00ff00 ffff0000`; // red, green, blue colors
apa102.sendBuffer(buf, DigitalPin.P1, DigitalPin.P2);
```

## Send RGB buffer

The sendRGBBuffer assumes 3 bytes per color red, green, blue.

```typescript
const buf = hex`ff0000 00ff00 0000ff`; // red, reen, blue colors
apa102.sendRGBBuffer(buf, DigitalPin.P1, DigitalPin.P2);
```

## Send Palletized Buffer

To minimize memory usage, you can define a 16 color palette and lookup each pixel color in the palette. This packing allows to use 4bit per pixels.

```typescript
const palette = hex`
00000
ff0000
00ff00
0000ff
ffffff
`; // add up to 16 colors
const buf = hex`01234`; // dark, red, green, blue, white
apa102.sendPaletteBuffer(buf, palette, DigitalPin.P1, DigitalPin.P2);
```

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

