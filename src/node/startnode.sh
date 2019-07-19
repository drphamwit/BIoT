#!/bin/bash

geth --identity "node1" --networkid 42 --datadir /home/pi/biot/node --nodiscover --rpc --rpcport "8042" --port "30303" --unlock 0 --password "/home/pi/biot/node/password.sec" --ipcpath /home/pi/.ethereum/geth.ipc