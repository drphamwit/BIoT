// Interraction with serial
var serialPort = require('serialport')

// Interaction with GPIO
var Gpio = require('onoff').Gpio

// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8043'))

// The contract that we are going to interact with
var contractAddress = '0xD641A6d08d5A09Ba5BEC16995Db107539b48eBC2'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event","signature":"0x65dce515c55eb8d94c3ec733006907bb1a555ef5fb2ab7227019830d4f90a259"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x338b5dea"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositTokenFromTo","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x00fc179e"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x9e281a98"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x450efe21"}]')
web3.eth.defaultAccount = web3.eth.accounts[0]
web3.personal.unlockAccount(web3.eth.defaultAccount, "node1")
// contract object
var contract = web3.eth.contract(ABI).at(contractAddress)

var port = new serialPort('/dev/ttyACM0', {baudRate: 9600})
const Readline = serialPort.parsers.Readline
const parser = new Readline()
port.pipe(parser)
parser.on('data', onData)
count = 0

function onData(data){
    contract.depositTokenFromTo('0x66c3043bb282eadbea9bb4ab4ab1c23513bcf3b0', web3.eth.defaultAccount, 1)
}

// components connected to the RPi
var greenLED = new Gpio(4, 'out')
var redLED = new Gpio(14, 'out')


function blinkGreenLED() { //function to start blinking
  if (greenLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    greenLED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    greenLED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function blinkRedLED() { //function to start blinking
    if (redLED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        redLED.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
        redLED.writeSync(0); //set pin state to 0 (turn LED off)
    }
  }
  
// display initial state
showStatus()

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
    var blinkInterval = setInterval(blinkGreenLED, 250); //run the blinkLED function every 250ms
    setTimeout(()=>{
        clearInterval(blinkInterval); // Stop blink intervals
        greenLED.writeSync(0); // Turn LED off      
    }, 5000); //stop blinking after 5 seconds

 } else {
    var blinkInterval = setInterval(blinkRedLED, 250); //run the blinkLED function every 250ms
    setTimeout(()=>{
        clearInterval(blinkInterval); // Stop blink intervals
        redLED.writeSync(0); // Turn LED off      
    }, 5000); //stop blinking after 5 seconds
}
}

// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
})