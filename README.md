# phemex-node

Automated Trading Bot for Phemex API using Node.js and RESTful API calls. This repository provides a basic framework for developing trading bots that can automatically make trades on the Phemex platform. The bot utilizes the Phemex API to retrieve market data, manage orders, and execute trades based on pre-configured strategies. The code is written in Node.js and uses RESTful API calls to interact with the Phemex API. The project is intended for educational purposes only and should not be used for live trading without proper testing and risk assessment.

# Get Starting

- Install dependencies

```shell script
npm install
```

- Set your apiKey and secret in .env file

- Run

```shell script
npm start
```

# Reference

https://github.com/phemex/phemex-api-docs

# Phemex Node API Documentation

## General Information
- **Name:** Phemex Node

## Endpoints

### Account Info
**Method:** `GET`  
**URL:** `{{REQUEST_URL}}/account?currency=USDT`  

#### Query Parameters
- `currency`: `USDT`

### Active Orders
**Method:** `GET`  
**URL:** `{{REQUEST_URL}}/active-orders?symbol=BTCUSDT`  

#### Query Parameters
- `symbol`: `BTCUSDT`

**Descripción:**  
They are not open positions, they are Active Limit Orders that are waiting to be opened.

### Place Order
**Method:** `POST`  
**URL:** `{{REQUEST_URL}}/place-order`  

#### Request Body
```json
{
  "symbol": "BTCUSDT",
  "side": "Buy",
  "posSide": "Long",
  "orderQtyRq": "0.001",
  "ordType": "Limit",
  "priceRp": 64000
}
```

### Cancel Order
**Method:** DELETE
**URL:** {{REQUEST_URL}}/cancel-order

#### Request Body

```json
{
  "symbol": "BTCUSDT",
  "orderID": "3ea9cbac-af8b-4edb-b482-64b06dcbe586",
  "posSide": "Long"
}
```