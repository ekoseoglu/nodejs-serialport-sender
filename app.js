import { SerialPort } from 'serialport';

const path = '/dev/ttyUSB1';
const baudRate = 9600;

const serialport = new SerialPort({ path, baudRate });

const myString = 'Hello, My name is john. What is your name?';
const buffer = Buffer.from(myString);
const hexString = buffer.toString('hex');

const startDelimiter = '01a1';
const stopDelimiter = 'ffe1';

const concatHexString = `${startDelimiter}${hexString}${stopDelimiter}`;
const data = Buffer.from(concatHexString, 'hex');

serialport.on('open', () => {
  console.log('connected to serial port: ', path);

  setInterval(() => {
    serialport.write(data, () => {
      console.log('send packet: ', data.toString('hex'));
    });
  }, 5000);
});
