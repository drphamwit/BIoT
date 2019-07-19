// Interraction with serial
var serialPort = require('serialport')

// Interaction with GPIO
var Gpio = require('onoff').Gpio

// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

// The contract that we are going to interact with
var contractAddress = '0xFB73DC6D77b446ce590A3deB98077692f1C800A0'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event","signature":"0x65dce515c55eb8d94c3ec733006907bb1a555ef5fb2ab7227019830d4f90a259"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x338b5dea"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x9e281a98"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x450efe21"}]')

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress)

var port = new serialPort('/dev/ttyACM0', {baudRate: 9600})
const Readline = serialPort.parsers.Readline
const parser = new Readline()
port.pipe(parser)
parser.on('data', onData)

function onData(data){
    console.log(data)
    contract.depositToken('0x55127a273db3c80f783fb0ebf741cec0c6e7a36a', 1)
}

// components connected to the RPi
var greenLed = new Gpio(4, 'out')
var redLed = new Gpio(14, 'out')

// display initial state
showStatus()

// watch event on the button
button.watch(function (err, value) {
 if (err) {
 throw err
 }

showStatus()
})

// wait for an event triggered on the Smart Contract
var onValueChanged = contract.OnValueChanged({_from: web3.eth.coinbase});

onValueChanged.watch(function(error, result) {
 if (!error) {
 showStatus()
 }
})

// power the LED according the value of the token
function showStatus() { 
 // retrieve the value of the token
 var token = contract.getTokens(web3.eth.coinbase)

// display the LED according the value of the token
 if (token > 0) {
 } else {
}
}

// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})