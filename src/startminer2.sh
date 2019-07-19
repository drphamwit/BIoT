#!/bin/bash

geth --identity "miner2" --networkid 42 --datadir "./miner2" --nodiscover --mine --rpc --rpcport "8043" --rpcapi "db,eth,net,web3,admin,miner" --port "30304" --unlock 0 --password ./miner2/password.sec --ipcdisable