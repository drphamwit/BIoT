#!/bin/bash

geth --identity "miner1" --networkid 42 --datadir "./miner1" --nodiscover --mine --rpc --rpcport "8042" --port "30303" --rpcapi "db,eth,net,web3,admin,miner,personal" --unlock 0 --password ./miner1/password.sec