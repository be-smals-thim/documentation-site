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
 


