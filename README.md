# Information about this project

## Main Components:

-   Websockets
-   Database

### Websockets

This backend opens websockets to bitstamp.com in order to listen on current trades for the 5 cryptocurrencies that can be traded there:
BTC, BCH, ETH, LTC and XRP.

Everytime a trade was made, the course of that transaction data will be stored to a database.

### Database

MongoDB Atlas is used for this project.
The Database keeps track of historical data (as far as it did take note of those prices aka was "online" at this moment in time).

# Docker

To use this project with docker, simply do something like:

```bash
docker build -t crypto-cource-crawler:0.1 .
```

```bash
docker run crypto-cource-crawler:0.1
```
