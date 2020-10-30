---
title: Message Registry Service - Consultation Profile
sidebar_label: Consultation Profile
---

In order to be a Document Provider one MUST implement a Message Registry Service and Register that service on the Provider Registry Service. This service MUST follow the [e-Box Message Registry open API Spec](../spec/specifications.md)

## Introspect of an e-Box Enterprise Oauth Token

The DP methods are secured by Oauth2 tokens. Introspecting these token can be tricky since the introspect endpoint security is quite high using oauth itself to secure the call to the ``/introspect`` endpoint.
The introspect endpoint return several information, the most important being the organization CBE which is the unique identifier of an organization and of it's e-Box.
Among the endpoints below, the back channel is the authentication endpoint that gives you your token.

<table>
<tr><td></td><td><strong>ACC</strong></td></tr>
<tr><td>Back channel</td> <td>https://services-acpt.socialsecurity.be/REST/oauth/v3/token</td></tr>
<tr><td>Introspect</td> <td>https://services-acpt.socialsecurity.be/REST/oauth/v3/introspect</td></tr>
<tr><td>Audience</td> <td>https://oauthacc.socialsecurity.be</td></tr>
<tr><td></td><td><strong>PROD</strong></td></tr>
<tr><td>Back channel</td> <td>https://services.socialsecurity.be/REST/oauth/v3/token</td></tr>
<tr><td>Introspect</td> <td>https://services.socialsecurity.be/REST/oauth/v3/introspect</td></tr>
<tr><td>Audience</td> <td>https://oauth.socialsecurity.be</td></tr>
</table>

Here is an example introspect payload.

```json
{
    "active": true,
    "client_id": "my:ebox:enterprise:dp:client",
    "token_type": "access_token",
    "sub": "79072300048",
    "aud": "oauth:sanitycheck:public:client",
    "iss": "oauth-acpt.socialsecurity.be",
    "jti": "i1v18l327gktaad04vuetqnrso",
    "principalAttributes": {
        ...
        "urn:be:fgov:kbo-bce:organization:cbe-number": [
                        "0406798006"
                        ],
        ...

    },
    "iat": 1563882772,
    "exp": 1571658772,
    "nbf": 1563882712,
    "scope": "openid profile"
}
```

Proper Oauth2 treatment of the token will not be described here as it is done out of the box by most Oauth client and is documented in the Oauth Specification. However here are some pointers

- ``active`` needs to be checked, if false the token is not acceptable
- ``scope`` need to be checked based on the endpoint 
- ``principalAttributes[‘urn:be:fgov:kbo-bce:organization:cbe-number’][0]`` contains the CBE number which identifies the e-Box of the user.
That CBE number is not necessarily in 10 digits format and so you may need to add a prefix with as many 0 as needed to obtain the 10 digits format.
In the e-Box services, CBE numbers must be encoded in 10 digits.

The following resources expand a bit on the subject:

- [Java Example of an Introspect](https://github.com/e-Box-Enterprise-Belgium/examples/tree/master/ouath-introspect)

### Scopes and endpoints mapping

The e-Box Enterprise Document Providers endpoints are secured by the following scopes:

- ``scope:document:management:consult:ws-eboxrestentreprise:summaryownebox``: Give access to the  ``/ebox`` resource of identified user 
- ``scope:document:management:consult:ws-eboxrestentreprise:summaryallebox``: Give access to the  ``/ebox`` resource of any user. 
- ``scope:document:management:consult:ws-eboxrestentreprise:messagesfull``: Give access to the  ``/ebox/message`` and ``/ebox/message/**`` resource of identified user.
- ``scope:document:management:consult:ws-eboxrestentreprise:referencedata``: Give access to the  ``/referenceData/**`` resources.
 

## Integration with the Portal

The [e-Box Enterprise Portal](https://www.eboxenterprise.be) will be the primary consumer of the Document Provider. Usage by the portal has some particularities that are worth nothing.

### Resources used by the Portal

From all of the API endpoints, only a few are actually used by the portal.

- ``/ebox/messages``: This is the main method being used by the Portal. It provides all the information provided by all of it's sub resources making direct calls to sub resources useless or rare.
- ``/ebox/messages/<id>/attachments/<attachmentId>/content``: This method is used to get the attached documents
- ``/ebox/messages/<id>``: This method is used when displaying a message details and is therefore not used allot
- ``/referenceData/senderApplication/<id>``: This method is called for every single message displayed in e-Box.
- ``/referenceData/senderOrganization/<id>``: This method is called for every single message displayed in e-Box.
- ``/referenceData/messageType/<id>``: This method is called for every single message displayed in e-Box.

**Note:** Integration to portal in ACC is allowed when this minimal set of resources has been implemented.

### Required fields

The fields ``items`` and ``totalItems`` are required in the following Json Schemas described in the [API](../spec/specifications.md):

- ``Attachments``
- ``BusinessDataList``
- ``MessageTypes``
- ``Messages``
- ``MessagesToUpdate``
- ``SenderApplications``
- ``SenderOrganizations``

If there is no item, do not put null as value for the item property but a void list.

### HTTP Cache headers guidelines

In order to offer the best possible user experience cache control headers MUST be used on some the ``/referenceData/**`` endpoints. These endpoints are heavily used by the e-Box Enterprise UI which itself does not use caching so to not impose latency in data updates on the DP. 

The following endpoints are MUST have significant cache control headers. 

- ``/referenceData/messageTypes/*``
- ``/referenceData/senderOrganization/*``
- ``/referenceData/senderApplication/*``

We recommend a 2 day fixed cache with non-blocking background refresh, but more advanced options can be chosen.

e.g: ``Cache-Control: public, no-transform, proxy-revalidate, max-age=86400``


### TranslatedString

TranslatedString OpenApi contract allows for 0 to 3 language to be specified: nl,fr,de.

However for proper integration with the portal, all 3 values must be provided. If some values are not available they need to be default by the DP, preferably with another language value.

## Message List endpoint

The Message List endpoint is the single most important endpoint of e-Box.
It gives access to all information of all Messages with the notable exception,of the attachments binary content.

The resource also offers several search capabilities which are all documented in the specification. 
All search criteria are to be applied in conjunction, meaning all messages returned MUST match all criteria provided.

Criteria which match no message should return a 200 HTTP status with an empty list of messages. This even if the case when 
incoherent criteria are provided (like a receivedAfter=2060-03-05). 400 status code MUST and only can be returned with syntactically
incorrect criteria or if ``q`` is provided without ``qlang``.  


### Text search feature

The Text search feature allows substring search in all visible textual information related to a message in the language of the user. 
Search excludes research in the document or body content themselves.

The text search is driven by the ``q`` and ``qlang`` fields, which must both be provided for the text search to work. 
Possible ``qlang`` values are: ``fr``,``nl``, ``de``

**Note:**  Current API specification at the time of writing do not contain the enum of values, 
this will be addressed in subsequent versions at which point the list provided here will be removed 

The ``q`` parameter represent a portion of text to be found in all "visible textual information". The following API fields are searched 
based on ``q`` and ``qlang``.

- Message: subject
    items of businessDataList: items of values
    forTheAttentionOf:  id, name 
- Application: name, description
- Organization: name, description
- MessageType: name, description

Note: All of the searchable fields are TranslatedString, this is why ``qlang`` has to be specified, 
to know to which language of TransateldString it the ``q`` parameter is to be applied

The values searched by ``q`` have the following extra properties
- Case is to be ignored
- Accents are to be ignored
 
**Example:**

Given the following value present in one of the aforementioned fields (the title for instance), the following searches will detect the message:
- Value in searchable field: ``This is some random with Special cases like épinards and François, ok?``
- ``some``: found
- ``me rando``: found
- ``ok?``: found
- ``François``: found
- ``Francois``: found
- ``epinards``: found
- ``ép``: found
- ``SOME RAND``: found
- ``ok?This is``: not found
- ``This some random``: not found
