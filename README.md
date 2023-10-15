# Contact Book Node.js Express REST API
## Main Tools Used
* JWT - to generate access tokens for a Bearer Authorization Head
* Passport JS -  to generate API Keys to be used for accessing api endpoints given that api keys are linked to user account.
* ACCESS THE POSTMAN COLLECTIONS HERE: [https://www.postman.com/mission-engineer-80439197/workspace/contactbookworkspace/overview](https://www.postman.com/mission-engineer-80439197/workspace/contactbookworkspace/overview)
## What can this REST API do ?

* base64 encoding is used to seal public data that requires users to be registered and have an API Key first.

Documentation

[Access postman Documentation on this](https://documenter.getpostman.com/view/26692514/2s9YR6ZZMX)
ContactBook REST API


### REST API for making calls for contacts
* getContacts - one must register and get and generate their API KEY using addAPI-KEY endpoint after getting tokens, from the ContactBookAccounts Collection.
* addContact - to add a contact one must be have an account and use token.
* patch, put and del requests also require the same token.
* Note: with and API Key you can access data even without having to login.

### ContactBook Accounts Endpoints
[Access postman Documentation on this](https://documenter.getpostman.com/view/26692514/2s9YR6ZZRs)
The contact book accounts allows one to:
* create a user - POST createUser
* authenticate a user using jwt tokens
* generate and API Key
* access account data after authentication hence protection of the endpoint





