#!/bin/bash

geth --identity "node2" --networkid 42 --datadir /home/pi/biot/node --nodiscover --rpc --rpcport "8043" --port "30304" --rpcapi "db,eth,net,web3,admin,miner,personal"  --unlock 0 --password "/home/pi/biot/node/password.sec" --ipcpath /home/pi/.ethereum/geth.ipc