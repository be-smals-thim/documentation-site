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