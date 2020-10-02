---
title: FAQ
---

## Errors on service

- Issue with the digest, I get the following error
```json
{
  "code":"DIGEST_DO_NOT_MATCH", 
  "id":"eccf0d50-20b1-48ae-ab8f-28a3adc87038",
  "message":"Issue with Digest"
}
```
This usually mean that you have wrongly encoded the digest. A typical error is to use HEX encoding or Base64 encoding.
But as the specification states, the encoding to be used is Base64URI
 


