#!/bin/bash

geth --identity "node1" --networkid 42 --datadir /home/pi/ChainSkills/node --nodiscover --rpc --rpcport "8042" --port "30303" --unlock 0 --password "/home/pi/ChainSkills/node/password.sec" --ipcpath /home/pi/.ethereum/geth.ipc