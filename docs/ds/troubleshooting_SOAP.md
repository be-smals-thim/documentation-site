---
title: Troubleshooting SOAP requests
---

## I received the "SOA-01002: Service call not authorized" error
We cannot unfortunately provide more information about the cause of the error but the error is about the authentication.
See the page [How to sign a SOAP message with a x509 certificate](https://www.socialsecurity.be/site_fr/general/helpcentre/soa/security_ws_x509.htm).
Is a signature present in your request ?
Does it contains the BinarySecurityToken, Timestamp and Signature elements ?
Is there any mistake in the certificate ? See [x509 certificate page](../common/x509_certificate.md) to see what format is expected for each field.
You can also ask to [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be) if the authorization is correctly set, providing the public part of your certificate.

## I received the error code 40 and a message like "No authorization for message type ... application ... institution ..."
At eBox side, a configuration must be done in order to authorize you institution and your application to publish a message with the message type you set in the request.
Perhaps a configuration is missing or there is a misspelling in the Application or Message type identifier.
The configuration must be done following the application and message types given during the [Onboarding process](onboarding_process.md).
If there is no misspelling, you can ask to [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be) to add the authorization providing the CBE number, application ID and message type ID and if the message type is for an enterprise of a professional or a citizen.

## I received the error code SOA-03006 and a message like "XSD compliance failure: string value ... does not match pattern for CBE"
The value of the ``CompanyID`` and ``Institution`` properties has to be a CBE number encoded in 10 digits.
The 9 digits encoding does not work.

## I received an error message like "UAM denied : application ... institution ... is not mandatary for application ... institution ..."
You put a SenderID object like:
```xml
<SenderID>
    <Application>myApplicationID</Application>
    <Institution>0123456789</Institution>
</SenderID>
```

You receive this error if the certificate you are using is not a certificate for a mandatary institution and the CBE number you put in the Institution property is not the same than what is in the certificate.

## I received the error code SOA-03006 and a message like "XSD compliance failure: string length ... is greater than maxLength facet (80) for FileName"
This error is about the length of the value of a ``DownloadFileName`` property. The maximum length is 80 characters.

## I received the error code 10 and a message like "Expected hash ... not matches computed hash ..."
You put a Digest object in a Document object like:
```xml
<v11:Document>
    <v11:Title>My message title</v11:Title>
    <v11:Content>cid:158153402091</v11:Content>
    <v11:Digest>
        <v11:DigestMethod>SHA-256</v11:DigestMethod>
        <v11:DigestValue>JTx10cTxkRLy8RwFatGXKi7l1liTz08wjZ3O7SesMiY=</v11:DigestValue>
    </v11:Digest>
    <v11:DownloadFileName>the_document.pdf</v11:DownloadFileName>
    <v11:MIME>application/pdf</v11:MIME>
</v11:Document>
```
The DigestValue is the checksum of the file ``the_document.pdf`` computed with the ``SHA-256`` algorithm and encoded in base64 (not base64url).
The Digest object is not mandatory.