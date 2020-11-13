---
title: FAQ
---

### I get a DIGEST_DO_NOT_MATCH code when publishing with a Digest

```json
{
  "code":"DIGEST_DO_NOT_MATCH", 
  "id":"eccf0d50-20b1-48ae-ab8f-28a3adc87038",
  "message":"Issue with Digest"
}
```
This usually mean that you have wrongly encoded the digest. A typical error is to use HEX encoding or Base64 encoding.
But as the specification states, the encoding to be used is *Base64url*. Here is what the spec says about the digest value.
`Digest value returned by the cryptographic hash function encoded in base64url as defined in RFC 4648 §5 (https://tools.ietf.org/html/rfc4648#section-5)`. See [specification page for more info](../spec/specifications.md)

### I attempt to publish and I get a message saying that Multiple languages provided when only one expected
```json
{
  "code": "NOT_IMPLEMENTED",
  "id": "eb689209-6000-4c57-94c7-11e24bdaa1b6",
  "message": "Multiple languages provided when only one expected"
}
```
You attempted to put a title or a message body or a business data value in several different languages.
For example, you put ``"subject":{"nl":"Test bericht publicatie", "fr":"Test de publication"}``.
The multiple languages in one publication is not supported due to a legal advice.
See section about [our implementation choices](document_sender.md#our-implementation-choices)

### I get an error saying that the CBE number is not a valid company but it exists
```json
{
  "code": "INVALID_INPUT",
  "id": "ac6885e0-f318-4da4-8f12-6586cd381254",
  "message": "0852093432 is not a valid company"
}
```
Not only the CBE number has to exist but the recipient organization has to have the Active status.
You can check both by using the [CBE number public search](https://kbopub.economie.fgov.be/kbopub/zoeknummerform.html).

### I published and I get the response code NO_DIGITAL_USER
This is not an error. See the [section about NO_DIGITAL_USER](document_sender.md#no_digital_user-response-code).

### I get a 400 Bad Request with the message "No main content attachment. Exactly one is expected"
```json
{
    "code": "INVALID_INPUT",
    "id": "455f8201-9abb-4130-95b9-47e7f445593a",
    "message": "No main content attachment. Exactly one is expected"
}
```
One document or the body has to be marked as the main content.
That is to say either one of the ``mainContent`` has to be set to true or the ``bodyMainContent`` has to be set to true but not both.
The message in considered as read if the document marked as main content is open.

### I get a 400 Bad Request with the message "Too many main content. Exactly one is expected"
```json
{
    "code": "INVALID_INPUT",
    "id": "b22ab931-d6ad-4b26-b766-d142362ac883",
    "message": "Too many main content. Exactly one is expected"
}
```
One document or the body has to be marked as the main content.
That is to say either one of the ``mainContent`` has to be set to true or the ``bodyMainContent`` has to be set to true but not both.
Perhaps you let the ``mainContent`` of one document to true after putting the ``bodyMainContent`` to true.

### I get a 400 Bad Request with the message "Invalid message configuration"
```json
{
    "code": "INVALID_SENDER",
    "id": "637409a1-2065-40b3-933c-0c13e1512add",
    "message": "Invalid message configuration"
}
```
There is an error about the sender Application ID or the theMessage Type ID of the business sector (enterprise or citizen).
Perhaps the Application ID or Message Type ID has a typo or your organization is not authorized to use what you configured in your request.
- Did you completed the [Onboarding for Document Sender](onboarding_process.md) ?
- Did it worked in Acceptance environment and now you are testing the Production environment without telling it to [eBoxIntegration](mailto:eBoxIntegration@smals.be) ?
- Did you checked if there is any typographical error ?
- Are you trying to publish for a citizen but on the onboarding, you specified only the enterprises as recipient business sector ?
- There is perhaps a configuration missing at eBoxIntegration side. Ask to [eBoxIntegration](mailto:eBoxIntegration@smals.be) to check the authorization configuration and tell them the endpoint you use or the environment, the Organization ID (the CBE number) the Application ID, the Message Type ID and if the recipient is an enterprise or a citizen.
