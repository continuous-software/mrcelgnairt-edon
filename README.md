node-trianglecrm
================

SDK for storefronts to process sales and communicate with TriangleCRM.

## Installation ##

    npm install -s trianglecrm

## Usage ##

    var TriangleCRM = require('trianglecrm');
    var clientExtended = new TriangleCRM({
      host: 'https://mydomain.trianglecrm.com',
      username: 'johndoe',
      password: 'p@$sw0ro|'
    }, function(error, clientSoap) {
       console.log(clientSoap, clientExtended)
    });

## Client Extended ##

We use an extended client to make communication with TriangleCRM SOAP service easier: avoid adding username and password to each request, avoid typing _Specified parameters and more.

### clientExtended.CreateProspect ###

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

### clientExtended.CreateSubscription ###

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

### clientExtended.CreateNewSubscriptionExistingCustomer ###

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
