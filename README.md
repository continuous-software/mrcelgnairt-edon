![node-trianglecrm](http://s28.postimg.org/sw3uwx8bx/triangle_logo.png)

## Installation ##

    npm install -s trianglecrm

## Usage ##

    var TriangleCRM = require('trianglecrm');
    var trianglecrm = new TriangleCRM({
      host: 'https://mydomain.trianglecrm.com',
      username: 'johndoe',
      password: 'p@$sw0ro|'
    }, function(error, clientSoap) {
      console.log(trianglecrm, clientSoap)
    });

## API

* [**`trianglecrm()`**]()
* [**`trianglecrm#CreateProspect()`**]()
* [**`trianglecrm#CreateSubscription()`**]()
* [**`trianglecrm#CreateNewSubscriptionExistingCustomer()`**]()

--------------------------------------------------------
### trianglecrm#CreateProspect(parameters, callback)

#### `options`

#### Example

    clientExtended.CreateProspect({
      productTypeID: 1,
      firstName: 'John',
      lastName: 'Doe',
      address1: '123, Main Street',
      address2: '',
      city: 'Anytown',
      state: 'Everystate',
      zip: 1000,
      country: 'United States',
      phone: '123,
      email: 'john@doe.us',
      ip: '127.0.0.1',
      affiliate: '',
      subAffiliate: '',
      internalID: 24,
      customField1: '',
      customField2: '',
      customField3: '',
      customField4: '',
      customField5: ''
    }, function(error, result) {
      console.log(error, result);
    });

### trianglecrm#CreateSubscription(parameters, callback) ###

#### `options`

#### Example

    clientExtended.CreateSubscription({
      planID: 168,
      trialPackageID: 84,
      chargeForTrial: true,
      campaignID: 42,
      firstName: 'John',
      lastName: 'Doe',
      address1: '123, Main Street',
      address2: '',
      city: 'Anytown',
      state: 'Everystate',
      zip: 1000,
      country: 'United States',
      phone: '123,
      email: 'john@doe.us',
      sendConfirmationEmail: true,
      ip: '127.0.0.1',
      affiliate: '',
      subAffiliate: '',
      internalID: 24,
      prospectID: 12,
      paymentType: '',
      creditCard: '4300-0000-0000-0000',
      cvv: 123,
      expMonth: 04,
      expYear: 2014,
      description: 'Lorem ipsum dolores sit amet',
    }, function(error, result) {
      console.log(error, result);
    });

### trianglecrm#CreateNewSubscriptionExistingCustomer ###

#### `options`

#### Example

    clientExtended.CreateNewSubscriptionExistingCustomer({
      prospectID: 12,
      billingID: 276,
      planID: 552,
      trialPackageID: 1004,
      chargeForTrial: true,
      sendConfirmationEmail: true
    }, function(error, result) {
      console.log(error, result);
    });
