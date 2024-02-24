import { SerialPort } from 'serialport';

const path = '/dev/tty.usbserial-0001';
const baudRate = 9600;

const serialport = new SerialPort({ path, baudRate });

const hexString = '01a168656c6c6fffe1';
const data = Buffer.from(hexString, 'hex');

serialport.on('open', () => {
  console.log('connected to serial port: ', path);

  setInterval(() => {
    serialport.write('test', () => {
      console.log('wrote hello');
    });
  }, 5000);
});

