---
title: FAQ
---

### I get a 401 Unauthorized
It means that the token in invalid or expired or missing. See [how to get a token](document_sender.md#getting-an-oauth-token-for-publication).

### I get a 403 Forbidden
It means that the token is valid but a scope is missing. To publish message by a REST request, the needed scope is ``scope:document:management:consult:ws-eboxrestentreprise:publicationsender``.
Not only the scope must be attributed to you in the *Authorization Server* but you also have to put it in the request to get a token.
You can ask [eBoxIntegration](mailto:eBoxIntegration@smals.be) to check if the scope is correctly set in the Authorization Server.
You have to include the Client-ID in the mail.

### I published and I get the response code NO_DIGITAL_USER
This is not an error. See the [section about NO_DIGITAL_USER](document_sender.md#no_digital_user-response-code).

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

### I get a 400 Bad Request with the message "Invalid message configuration"
```json
{
    "code": "INVALID_SENDER",
    "id": "637409a1-2065-40b3-933c-0c13e1512add",
    "message": "Invalid message configuration"
}
```
There is an error about the sender Application ID or the theMessage Type ID or the business sector (enterprise or citizen).
Perhaps the Application ID or the Message Type ID has a typo or your organization is not authorized to use what you configured in your request.
- Did you completed the [Onboarding for Document Sender](onboarding_process.md) ?
- Did it worked in Acceptance environment and now you are testing the Production environment without telling it to [eBoxIntegration](mailto:eBoxIntegration@smals.be) ?
- Did you checked if there is any typographical error ?
- Are you trying to publish for a citizen but on the onboarding, you specified only the enterprises as recipient business sector ?
- There is perhaps a configuration missing at eBoxIntegration side. Ask to [eBoxIntegration](mailto:eBoxIntegration@smals.be) to check the authorization configuration and tell them the endpoint you use or the environment, your Organization ID (the CBE number), the Application ID, the Message Type ID and if the recipient is an enterprise or a citizen.


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

### I get a 400 Bad Request with the message "Attachment mime type is not valid. See spec for list of available mime types" but I really put one of the list
```json
{
    "code":"INVALID_INPUT",
    "id":"36c21955-84ea-45c4-a59e-189d84907d08",
    "message":"Attachment mime type is not valid. See spec for list of available mime types"
}
```
The list of available [MIME types](https://tools.ietf.org/html/rfc2046) is in the [specifications of the Message Registry Service](../spec/specifications.md#message-registry-service).
The MIME type that is effectively sent can be found in the HTTP request you sent.
You should see something like:
```http
Content-Disposition: form-data; name="upfile2"; filename="PDFTestFile.pdf"
Content-Type: application/pdf

(data)
```
There you can see the MIME type sent.
Pay attention that depending on the tool or the library you are using to generate the HTTP request, the MIME type set can change from a tool to another even if the file is the same.
For example, some tools put ``text/xml`` as MIME type for a XML file while other tools put ``application/xml``.
If the tool or library you are using puts an alternative of an available mime types in the list from the specifications and that alternative is an [existing MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml), let us know [by e-mail](mailto:eBoxIntegration@smals.be).

### I get a 400 Bad Request with the message "Invalid sender: user credentials does not match payload"
```json
{
    "code": "INVALID_SENDER",
    "id": "9e0f39cd-e32d-43b5-9e23-612f9a98758e",
    "message": "Invalid sender: user credentials does not match payload"
}
```
You receive this message if you attempt to publish with an ``senderOrganizationId`` that is not the same CBE number than the one we can retrieve from the certificate you used to request the token and you are not a mandatary.
If you are not a mandatary, check if the CBE number you entered is correctly your organization CBE number and check the CBE number in your certificate.
In the certificate, the CBE number can be found in one of the **OU** field. See the [x509 certificate page](../common/x509_certificate.md).
If you are a mandatary, ask support to [eBoxIntegration](mailto:eBoxIntegration@smals.be).

### I get a 400 Bad Request with a message starting by "Invalid Schema" and with required keys not found but they are in my request
I can happen if the request is not correctly formatted.
For example, perhaps a bracket wrongly placed ends your request before the required keys not found.

### I get a 400 Bad Request with the message "Json Attachments number is inconsistent with number of parts"
```json
{
    "code": "INVALID_INPUT",
    "id": "cedcd3f9-d6cf-48a2-8a48-3da294d1ed8e",
    "message": "Json Attachments number is inconsistent with number of parts"
}
```
That error occurs when there are not as many file parts in the HTTP request than the number of attachments in the request.

### I get a 400 Bad Request with the message "Some json attachment info do not match any file upload part"
```json
{
    "code": "INVALID_INPUT",
    "id": "debb5d53-cd58-4483-a4f5-d0074c4b0a68",
    "message": "Some json attachment info do not match any file upload part"
}
```
It means that in the request, in the ``attachment`` list, there is a ``httpPartName`` with a value that is not found in the file parts in the HTTP request.
The file parts in the HTTP request are something like:
```http
Content-Disposition: form-data; name="upfile1"; filename="PDFTestFile.pdf"
Content-Type: application/pdf

(data)
```
There you can see ``name="upfile1"``. This is what name is expected in a ``httpPartName`` value.

### I get a 400 Bad Request with the message "Missing mediaType or fileName in part"
```json
{
    "code": "INVALID_INPUT",
    "id": "a5058f70-a63e-4c5b-9e6b-905e7375cfde",
    "message": "Missing mediaType or fileName in part"
}
```
It means that there is something missing in one of the file parts in the HTTP request.
The file parts in the HTTP request are something like:
```http
Content-Disposition: form-data; name="upfile1"; filename="PDFTestFile.pdf"
Content-Type: application/pdf

(data)
```