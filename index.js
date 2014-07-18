'use strict';

var request = require('request');
var parser = require('xml2json');
var _ = require('lodash');

module.exports = TriangleCRM;

TriangleCRM.ENDPOINT_CREATE_PROSPECT =
  '/api/2.0/billing_ws.asmx/CreateProspect';
TriangleCRM.ENDPOINT_CREATE_SUBSCRIPTION =
  '/api/2.0/billing_ws.asmx/CreateSubscription';

function TriangleCRM(options) {
  this.host = options.host;
  this.username = options.username;
  this.password = options.password;
  this.productTypeId = options.productTypeId;
  this.campaignId = options.campaignId;
  this.description = options.description;
  this.chargeForTrial = options.chargeForTrial;
  this.sendEmail = options.sendEmail;
  this.sendConfirmationEmail = options.sendConfirmationEmail;
  return this;
}

TriangleCRM.prototype.signRequest = function(request) {
  return _.extend(request, {
    username: this.username,
    password: this.password,
    productTypeID: this.productTypeId,
    productTypeIDSpecified: (this.productTypeId) ? 'TRUE' : 'FALSE',
    campaignID: this.campaignId,
    campaignIDSpecified: (this.campaignId) ? 'TRUE' : 'FALSE',
    chargeForTrial: this.chargeForTrial,
    sendEmail: this.sendEmail,
    description: this.description,
    sendConfirmationEmail: this.sendConfirmationEmail
  });
};

TriangleCRM.prototype.processRequest = function(endpoint, data, callback) {
  request.post(this.host + endpoint, {
    form: this.signRequest(data)
  }, function(error, response, body) {
    if (error)
      return callback(error);
    console.log(body);
    try { var result = parser.toJson(body, {object: true}); }
    catch (e) { return callback(body); }
    return callback(null, result);
  });
};

TriangleCRM.prototype.createProspect = function(prospect, callback) {
  this.processRequest(
    TriangleCRM.ENDPOINT_CREATE_PROSPECT,
    prospect,
    function(error, result) {
      if (result.BusinessErrorOfProspect.State === 'Error')
        return callback(result.BusinessErrorOfProspect.ErrorMessage);
      return callback(null, result.BusinessErrorOfProspect.ReturnValue);
    }
  );
};

TriangleCRM.prototype.createSubscription = function(subscription, prospect, callback) {
  prospect.prospectIDSpecified = (prospect.prospectID) ? 'TRUE' : 'FALSE';
  subscription.paymentTypeSpecified = (subscription.paymentType) ? 'TRUE' : 'FALSE';
  this.processRequest(
    TriangleCRM.ENDPOINT_CREATE_SUBSCRIPTION,
    _.extend(subscription, prospect),
    function(error, result) {
      if (result.BusinessErrorOfPlanResult.State === 'Error')
        return callback(result.BusinessErrorOfPlanResult.ErrorMessage);
      return callback(null, result.BusinessErrorOfPlanResult.ReturnValue);
    }
  );
};
