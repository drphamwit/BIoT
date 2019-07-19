// Interaction with GPIO
var Gpio = require('onoff').Gpio

// Interaction with Ethereum
var Web3 = require('web3')
var web3 = new Web3()

// connect to the local node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8042'))

// The contract that we are going to interact with
var contractAddress = '0xF1D0531b8e5D7eFcCe17824E2da41166B800C4D4'

// Define the ABI (Application Binary Interface)
var ABI = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"OnValueChanged","type":"event","signature":"0x65dce515c55eb8d94c3ec733006907bb1a555ef5fb2ab7227019830d4f90a259"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"depositToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x338b5dea"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"value","type":"uint256"}],"name":"withdrawToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x9e281a98"},{"constant":true,"inputs":[{"name":"recipient","type":"address"}],"name":"getTokens","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x450efe21"}]')

// contract object
var contract = web3.eth.contract(ABI).at(contractAddress)

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

function blinkGreenLed() { //function to start blinking
    if (greenLed.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        greenLed.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
        greenLed.writeSync(0); //set pin state to 0 (turn LED off)
    }
  }
  
  function blinkRedLed() { //function to start blinking
    if (redLed.readSync() === 0) { //check the pin state, if the state is 0 (or off)
        redLed.writeSync(1); //set pin state to 1 (turn LED on)
    } else {
        redLed.writeSync(0); //set pin state to 0 (turn LED off)
    }
  }

  function endRedBlink() { //function to stop blinking
    clearInterval(blinkInterval); // Stop blink intervals
    LED.writeSync(0); // Turn LED off
    LED.unexport(); // Unexport GPIO to free resources
  }

// power the LED according the value of the token
function showStatus() { 
 // retrieve the value of the token
 var token = contract.getTokens(web3.eth.coinbase)

// display the LED according the value of the token
 if (token > 0) {
    // Green: you have enough token
    redLed.writeSync(0)
    var blinkInterval = setInterval(blinkGreenLed, 250);
    setTimeout(function(){
        clearInterval(blinkInterval); // Stop blink intervals
        greenLed.writeSync(1); // Turn green LED on
        greenLed.unexport(); // Unexport GPIO to free resources       
        }, 5000)
 } else {
    // Red: not enough token
    greenLed.writeSync(0)
    var blinkInterval = setInterval(blinkRedLed, 250);
    setTimeout(function(){
        clearInterval(blinkInterval); // Stop blink intervals
        redLed.writeSync(1); // Turn green LED on
        redLed.unexport(); // Unexport GPIO to free resources       
        }, 5000)
    }
}

// release process
process.on('SIGINT', function () {
 greenLed.unexport()
 redLed.unexport()
 button.unexport()
})