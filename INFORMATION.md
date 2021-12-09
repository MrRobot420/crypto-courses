# Documentation for this Crypto Courses Websocket Client (CCWSSC):

# Live Courses:

### Best Option:

wss://ws.bitstamp.net

USE WEBSOCKETS!!

---

### Alternative: HTTP Calls to bitstamp.net - API

#### WARNING:

REQUEST LIMITS:
Do not make more than 8000 requests per 10 minutes or they will ban your IP address. For real time data [please] refer to the websocket API.

#### EUR

```
# Ripple
https://www.bitstamp.net/api/v2/ticker/xrpeur
```

```
# Bitcoin
https://www.bitstamp.net/api/v2/ticker/btceur
```

```
# Litecoin
https://www.bitstamp.net/api/v2/ticker/ltceur
```

```
# Ethereum
https://www.bitstamp.net/api/v2/ticker/etheur
```

```
# BTC-Cash
https://www.bitstamp.net/api/v2/ticker/bcheur
```

#### USD

urlXRP_dollar = "https://www.bitstamp.net/api/v2/ticker/xrpusd" # Ripple
urlBTC_dollar = "https://www.bitstamp.net/api/v2/ticker/btcusd" # Bitcoin
urlLTC_dollar = "https://www.bitstamp.net/api/v2/ticker/ltcusd" # Litecoin
urlETH_dollar = "https://www.bitstamp.net/api/v2/ticker/ethusd" # Ethereum
urlBCH_dollar = "https://www.bitstamp.net/api/v2/ticker/bchusd" # BTC-Cash

---
## Other possible resources to use:

### 1. Coin Market Cap (API)

https://pro.coinmarketcap.com/account
and
https://coinmarketcap.com/api/documentation/v1/

Endpoints:

```
"COIN_CAP_BASE_URL": "https://pro-api.coinmarketcap.com/v1"
```

### 2. Etherscan.io

https://api.etherscan.io/api

some example addresses:

```
0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b
Result: 2245289561857968669
```

```
0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359
Result: 4595456374254502385669
```

```
0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
Result: 459838634268989921207998
```

##### This translates to:

```
1000000000000000000      =       1.00000... ETH
2245289561857968669      =       2.24589... ETH
4595456374254502385669   =   4,595.46374... ETH
459838634268989921207998 = 459,838.63426... ETH
```

---
