# Information about this project

## Main Components:

-   Websockets
-   Database
-   API

### Websockets

This backend opens websockets to bitstamp.com in order to listen on current trades for the 5 cryptocurrencies that can be traded there:
BTC, BCH, ETH, LTC and XRP.

Everytime a trade was made, the course of that transaction data will be stored to a database.

### Database

MongoDB Atlas is used for this project.
The Database keeps track of historical data (as far as it did take note of those prices aka was "online" at this moment in time).

### API

The API is a second server that listens on incoming requests on port 5000.
Via this interface, it is possible to "trade" a selected currency at its current price (newest price in the database).
You can also retrieve data about a specific account ID like:

-   the balance of a specific crypto currency + all of the transactions of that currency
-   the total account balance with all transactions
-   the current crypto listings of coinbase?
-   the amount that is stored on an actual (provided) address for ETH, BTC & LTC (using etherScan and soChain in the background)
-   the price of a provided currency (using coinbase in the background) _NOTE: XRP is currently not traded on coinbase._
