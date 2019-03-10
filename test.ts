// tests go here; this will not be compiled when this package is used as a library
{
    const buf = hex`ff0000ff ff00ff00 ffff0000`; // red, green, blue colors
    apa102.sendBuffer(buf, DigitalPin.P1, DigitalPin.P2);
    pause(1000)
}
{
    const buf = hex`ff0000 00ff00 0000ff`; // red, reen, blue colors
    apa102.sendRGBBuffer(buf, DigitalPin.P1, DigitalPin.P2);
    pause(1000)
}
{
    const palette = hex`
    00000
    ff0000
    00ff00
    0000ff
    ffffff
    `; // add up to 16 colors
    const buf = hex`01234`; // dark, red, green, blue, white
    apa102.sendPaletteBuffer(buf, palette, DigitalPin.P1, DigitalPin.P2);
}