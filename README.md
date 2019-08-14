# Transactive Energy in Microgrid Solar Network using Blockchain Technologies

## Introduction

We are investigating the possibilities of enabling a transactive energy scenario on a small scale microgrid solar network leveraging blockchain technologies, specifically Ethereum platform and smart contract. In this work, we propose a system model where nodes can share energy surplus among each other and use smart contracts to execute the transactions. We built a working prototype to demonstrate the model.

## Background

**Transactive energy** (TE) is a two-way grid management approach that ensures the proper functioning of power networks with large amounts of distributed energy resource (DER) and allows DER owners to earn a commensurate return on their investments.

A Microgrid is a localized group of electricity sources and loads that operate connected to and synchronous with the traditional centralized grid but can disconnect and maintain operation autonomously as physical and/or economic conditions dictate.

The Blockchain is an incorruptible digital ledger of economic transactions that can be programmed to record not just financial transactions but virtually everything of value. Ethereum is built on blockchain technologies that run smart contracts, which are applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference. 

## Scenario

There are energy suppliers who produce energy surplus and energy consumers who want to buy energy. The microgrid is used to transfer energy from suppliers to consumers while blockchain network is used to transfer cryptocurrency from consumers to supplier without using third party services.

![Scenario](https://github.com/drphamwit/BIoT/blob/master/images/scenario.png)

## System Design
![System Design](https://github.com/drphamwit/BIoT/blob/master/images/system_design.png)

## Tools
### Hardware
- 2 Raspberry PIs 3
- 1 Arduino Uno
- 1 Light Sensor
- 1 Laptop Lenovo P51

### Software
- Raspberian Lite
- Go Ethereum
- Meta Mask
- NodeJS
- Solidity

## Demo Setup
![Demo Setup](https://github.com/drphamwit/BIoT/blob/master/images/demo_setup.png)

### House 1: 

Energy consumer who wants to buy energy. This house only has the Raspberry PI attached.

### House 2: 

Energy supplier who produces energy surplus. For simulation, a light sensor is used to detect light intensity and use it to indicate whether there is energy surplus. Arduino is attached and plays the role as smart meter/outlet to detect "energy surplus" produced by the light sensor. 

The Raspberry PI runs Raspberian Lite OS and has Go Ethereum installed to join the private Ethereum network of houses and mining nodes.

### Laptop 

The Lenovo P51 has more processing power and is used as mining node to mine transactions. Go Ethereum is installed on the laptop with Meta Mask to manage Wallet.

## Demo Video

https://youtu.be/K_CNOwcuPao

In this video, house 1 is the energy consumer, house 2 is the energy supplier. When energy surplus is detected by "smart meter", house 2 will "transfer" energy to house 1 and house 1 will transfer "money" back to house 2. The transactions are captured by MetaMask where the initial fund of house 1 is 100 tokens and decreased and house 2 is 0 and increased whenever energy surplus is detected and transferred.



## Acknowledgements

This project is part of the Blockchain-based Internet of Things initiative funded by WIT EPIC grant. We would like to thank the Department of Computer Science and Networking at WIT and our partners, Dr. Duc Tran from University of Massachusetts Boston and Ms. Roxy Simpson from IoT World Labs for your support.
