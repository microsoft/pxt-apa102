namespace apa102 {
    function sendFrame(data: DigitalPin, clk: DigitalPin, value: number) {
        // first frame of zeroes
        pins.digitalWritePin(data, value);
        for (let i = 0; i < 32; ++i) {
            pins.digitalWritePin(clk, 1);
            pins.digitalWritePin(clk, 0);
        }
    }

    function sendByte(data: DigitalPin, clk: DigitalPin, x: number) {
        for (let j = 0x80; j != 0; j >>= 1) {
            pins.digitalWritePin(data, x & j ? 1 : 0);
            pins.digitalWritePin(clk, 1);
            pins.digitalWritePin(clk, 0);
        }
    }

    function sendRGB(data: DigitalPin, clk: DigitalPin, buf: Buffer, i: number) {
        sendByte(data, clk, 0xe0 | 0x1f);
        sendByte(data, clk, buf[i + 2]);
        sendByte(data, clk, buf[i + 1]);
        sendByte(data, clk, buf[i]);
    }

    /**
     * Sends a APA102 color buffer (full spec)
     * @param buf 
     * @param data 
     * @param clk 
     */
    export function sendBuffer(buf: Buffer, data: DigitalPin, clk: DigitalPin) {
        // first frame of zeroes
        sendFrame(data, clk, 0);
        // data stream
        const length = buf.length;
        for (let i = 0; i < length; ++i) {
            sendByte(data, clk, buf[i]);
        }
        // final frame
        sendFrame(data, clk, 1);
    }

    /**
     * Sends a APA102 color buffer from RGB data
     * @param buf 
     * @param data 
     * @param clk 
     */
    export function sendRGBBuffer(buf: Buffer, data: DigitalPin, clk: DigitalPin) {
        // first frame of zeroes
        sendFrame(data, clk, 0);
        // data stream
        const length = buf.length;
        for (let i = 0; i < length; i += 3)
            sendRGB(data, clk, buf, i);
        // final frame
        sendFrame(data, clk, 1);
    }

    /**
     * Sends a APA102 color buffer from paletized colors 
     * @param buf 
     * @param data 
     * @param clk 
     */
    export function sendPaletteBuffer(buf: Buffer, palette: Buffer, data: DigitalPin, clk: DigitalPin) {
        // first frame of zeroes
        sendFrame(data, clk, 0);
        // data stream
        const length = buf.length;
        for (let i = 0; i < length; i++) {
            const pc = buf[i];
            sendRGB(data, clk, palette, (pc & 0xf0) >> 4);
            sendRGB(data, clk, palette, pc & 0x0f);
        }
        // final frame
        sendFrame(data, clk, 1);
    }

    export const arcadePalette = hex
        `000000
    ffffff
    ff2121
    ff93c4
    ff8135
    fff609
    249ca3
    78dc52
    003fad
    87f2ff
    8e2ec4
    a4839f
    5c406c
    e5cdc4
    91463d
    000000`;
}