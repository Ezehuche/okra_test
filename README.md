<h1 >Okra Test REST API</h1>


## Description
  API to scrape data from Okra Bank website

## API ENDPOINT
- [Live API Endpoint](https://okra-api.herokuapp.com) &mdash; The API was hosted on Heroku.
- [API Reference Documentation](https://okra-api.herokuapp.com/api-docs) &mdash; The API Reference Doc was generated using swagger.

## Setup Guide
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/Ezehuche/okra_test.git
run npm install 
Rename .env.example to .env and make necessary changes
the run npm start:dev
the server will be available at http://localhost:3000

go to http://localhost:3000/api-docs to view the API Reference documentation
```

- Scrape data from `DOM`<br>
**NOTE**: Before you scrape the `DOM` you must be a registered customer's `email`, `password` and `otp`
```
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password", "otp": "12345"}'http://localhost:3000/auth/getStarted

```
Response:
```
{
"status": true,
"message": "Data was successfully saved",
"data": {
    "authentication": {
        "code": "auth_cxi0a7",
        "email": "user@example.com",
        "password": "U2FsdGVkX19BBm9Sz3t79yp7/f2rHhmikFtmTN+Y2wo=",
        "otp": "12345",
        "_id": "630c97b55f0a9956d904ac88",
        "createdAt": "2022-08-29T10:40:53.053Z",
        "updatedAt": "2022-08-29T10:40:53.053Z",
        "__v": 0
    },
    "customer": {
        "code": "cus_dr4gl8",
        "auth": "630c97b55f0a9956d904ac88",
        "name": "Example User",
        "address": "1233 Peace Simpson St. Lagos, Nigeria",
        "bvn": "05312028630",
        "email": "user@example.com",
        "phone_number": "00650940542",
        "_id": "630c97b55f0a9956d904ac8a",
        "createdAt": "2022-08-29T10:40:53.074Z",
        "updatedAt": "2022-08-29T10:40:53.074Z",
        "__v": 0
    },
    "accounts": [
        {
          "code": "acc_q0mmgo",
          "auth": "630c97b55f0a9956d904ac88",
          "customer": "630c97b55f0a9956d904ac8a",
          "type": "Home Loan Account",
          "accountBalance": {
             "$numberDecimal": "510435.38"
          },
          "currency": "₦",
          "ledgerBalance": {
              "$numberDecimal": "474997.39"
          },
          "_id": "69645f65716a6a6137776832",
          "createdAt": "2022-08-29T10:40:53.086Z",
          "updatedAt": "2022-08-29T10:40:53.086Z",
          "__v": 0
        },
        ...
    ]
    "transactions": [
        {
          "code": "trans_1ogznq",
          "auth": "630c97b55f0a9956d904ac88",
          "customer": "630c97b55f0a9956d904ac8a",
          "account": "69645f65716a6a6137776832",
          "type": "credit",
          "clearedDate": "2021-11-08T21:37:08.456Z",
          "description": "payment transaction at Zulauf - Spencer using card ending with ***(...0654) for LYD 18.18 in account ***38255847",
          "amount": {
              "$numberDecimal": "702.93"
          },
          "currency": "₦",
          "beneficiary": "6389917991",
          "sender": "7871178699",
          "_id": "630c97b55f0a9956d904ac90",
          "createdAt": "2022-08-29T10:40:53.145Z",
          "updatedAt": "2022-08-29T10:40:53.145Z",
          "__v": 0
        },
        ...
    ]
}
}
```
<br><br>

- Get `customer authentication` details
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/auth/<customerId>

```
Response:
```
{
  "status": true,
  "message": "Customers authentication detail",
  "data": {
    "_id": "630c97b55f0a9956d904ac88",
    "code": "auth_cxi0a7",
    "email": "user@example.com",
    "password": "password",
    "otp": "12345",
    "createdAt": "2022-08-29T10:40:53.053Z",
    "updatedAt": "2022-08-29T10:40:53.053Z",
    "__v": 0
  }
}
```
<br><br>

- Get all `customers`
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/customers

```
Response:
```
{
  "status": true,
  "message": "Successfully fetched customer",
  "data": [
    {
      "_id": "630be1d10b194a1530dd9cff",
      "code": "cus_1fpb9z",
      "auth": "630be1d10b194a1530dd9cfd",
      "name": "User Uche",
      "address": "1233 Peace Simpson St. Lagos, Nigeria",
      "bvn": "05312028630",
      "email": "user@example.com",
      "phone_number": "00650940542",
      "createdAt": "2022-08-28T21:44:49.258Z",
      "updatedAt": "2022-08-28T21:44:49.258Z",
      "__v": 0
    },
    ...
  ]
}
```
<br><br>

- Get all `transactions` from an account
- Filter with paginations by adding `pageNo` & `pageSize` to the query params
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/transactions/acc/<accountId>?pageNo=1&pageSize=15

```
Response:
```
{
  "status": true,
  "message": "Transactions fetched successfully for 69645f65716a6a6137776832",
  "data": [
    {
      "_id": "630c97b55f0a9956d904ac90",
      "code": "trans_1ogznq",
      "auth": "630c97b55f0a9956d904ac88",
      "customer": "630c97b55f0a9956d904ac8a",
      "account": "69645f65716a6a6137776832",
      "type": "credit",
      "clearedDate": "2021-11-08T21:37:08.456Z",
      "description": "payment transaction at Zulauf - Spencer using card ending with ***(...0654) for LYD 18.18 in account ***38255847",
      "amount": {
        "$numberDecimal": "702.93"
      },
      "currency": "₦",
      "beneficiary": "6389917991",
      "sender": "7871178699",
      "createdAt": "2022-08-29T10:40:53.145Z",
      "updatedAt": "2022-08-29T10:40:53.145Z",
      "__v": 0
    },
    ...
  ]
}
```
- Get all `transactions` from a customer
- Filter with paginations by adding `pageNo` & `pageSize` to the query params
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/transactions/cus/<customerId>?pageNo=1&pageSize=15

```
Response:
```
{
  "status": true,
  "message": "Transactions fetched successfully for 630c97b55f0a9956d904ac8a",
  "data": [
    {
      "_id": "630c97b55f0a9956d904ac90",
      "code": "trans_1ogznq",
      "auth": "630c97b55f0a9956d904ac88",
      "customer": "630c97b55f0a9956d904ac8a",
      "account": "69645f65716a6a6137776832",
      "type": "credit",
      "clearedDate": "2021-11-08T21:37:08.456Z",
      "description": "payment transaction at Zulauf - Spencer using card ending with ***(...0654) for LYD 18.18 in account ***38255847",
      "amount": {
        "$numberDecimal": "702.93"
      },
      "currency": "₦",
      "beneficiary": "6389917991",
      "sender": "7871178699",
      "createdAt": "2022-08-29T10:40:53.145Z",
      "updatedAt": "2022-08-29T10:40:53.145Z",
      "__v": 0
    },
    ...
  ]
}
```
<br><br>

- Get a `transaction` by id
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/transactions/<id>

```
Response:
```
{
  "status": true,
  "message": "Successfully fetched the transactio",
  "data": {
    "_id": "630be1d10b194a1530dd9d03",
    "code": "trans_maai5u",
    "auth": "630be1d10b194a1530dd9cfd",
    "customer": "630be1d10b194a1530dd9cff",
    "account": "69645f787a70396e6d683572",
    "type": "credit",
    "clearedDate": "2021-11-08T21:37:08.456Z",
    "description": "payment transaction at Zulauf - Spencer using card ending with ***(...0654) for LYD 18.18 in account ***38255847",
    "amount": {
      "$numberDecimal": "702.93"
    },
    "currency": "₦",
    "beneficiary": "6389917991",
    "sender": "7871178699",
    "createdAt": "2022-08-28T21:44:49.332Z",
    "updatedAt": "2022-08-28T21:44:49.332Z",
    "__v": 0
  }
}
```
- Get all `transactions`
- Filter with paginations by adding `pageNo` & `pageSize` to the query params
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/transactions?pageNo=1&pageSize=15

```
Response:
```
{
  "status": true,
  "message": "Successfully fetched all transactions",
  "data": [
    {
      "_id": "630be1d10b194a1530dd9d03",
      "code": "trans_maai5u",
      "auth": "630be1d10b194a1530dd9cfd",
      "customer": "630be1d10b194a1530dd9cff",
      "account": "69645f787a70396e6d683572",
      "type": "credit",
      "clearedDate": "2021-11-08T21:37:08.456Z",
      "description": "payment transaction at Zulauf - Spencer using card ending with ***(...0654) for LYD 18.18 in account ***38255847",
      "amount": {
        "$numberDecimal": "702.93"
      },
      "currency": "₦",
      "beneficiary": "6389917991",
      "sender": "7871178699",
      "createdAt": "2022-08-28T21:44:49.332Z",
      "updatedAt": "2022-08-28T21:44:49.332Z",
      "__v": 0
    },
    ...
  ]
}
```
<br><br>

- Get all `accounts` from a customer
- Filter with paginations by adding `pageNo` & `pageSize` to the query params
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/accounts/cus/<customerId>?pageNo=1&pageSize=15

```
Response:
```
{
  "status": true,
  "message": "Customer accounts fetched successfully",
  "data": [
    {
      "_id": "69645f65716a6a6137776832",
      "code": "cus_q0mmgo",
      "auth": "630c97b55f0a9956d904ac88",
      "customer": "630c97b55f0a9956d904ac8a",
      "type": "Home Loan Account",
      "accountBalance": {
        "$numberDecimal": "510435.38"
      },
      "currency": "₦",
      "ledgerBalance": {
        "$numberDecimal": "474997.39"
      },
      "createdAt": "2022-08-29T10:40:53.086Z",
      "updatedAt": "2022-08-29T10:40:53.086Z",
      "__v": 0
    },
    ...
  ]
}
```
<br><br>

- Get a `account` by id
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/accounts/<id>

```
Response:
```
{
  "status": true,
  "message": "Successfully fetched the account",
  "data": {
    "_id": "69645f787a70396e6d683572",
    "code": "cus_dvrenj",
    "auth": "630be1d10b194a1530dd9cfd",
    "customer": "630be1d10b194a1530dd9cff",
    "type": "Home Loan Account",
    "accountBalance": {
      "$numberDecimal": "510435.38"
    },
    "currency": "₦",
    "ledgerBalance": {
      "$numberDecimal": "474997.39"
    },
    "createdAt": "2022-08-28T21:44:49.332Z",
    "updatedAt": "2022-08-28T21:44:49.332Z",
    "__v": 0
  }
}
```
- Get all `accounts`
- Filter with paginations by adding `pageNo` & `pageSize` to the query params
```
curl -X GET -H "Content-Type: application/json" http://localhost:3000/accounts?pageNo=1&pageSize=15

```
Response:
```
{
  "status": true,
  "message": "Successfully fetched all accounts",
  "data": [
    {
      "_id": "69645f787a70396e6d683572",
      "code": "cus_dvrenj",
      "auth": "630be1d10b194a1530dd9cfd",
      "customer": "630be1d10b194a1530dd9cff",
      "type": "Home Loan Account",
      "accountBalance": {
        "$numberDecimal": "510435.38"
      },
      "currency": "₦",
      "ledgerBalance": {
        "$numberDecimal": "474997.39"
      },
      "createdAt": "2022-08-28T21:44:49.332Z",
      "updatedAt": "2022-08-28T21:44:49.332Z",
      "__v": 0
    },
    ...
  ]
}
```