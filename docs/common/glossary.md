---
title: Glossary
---

# Enterprise
An enterprise is identied by the CBE numer and the quality.
To use e-Box Enterprise product, the quality is equal to 'ENTERPRISE'.
The CBE number is registered at Crossroads Bank for Enterprises. 
Upon registration in the CBE each entity receives a company registration number. The use of this number is required by law. The company registration number is a unique identification number consisting of 10 digits, starting with 0 or 1.
In our e-Box product, the CBE number has to imperatively start with '0' or '1' (especially '0', it is important to mention it), a check is performed.

## Sender
The organisation, the application and the message types are part of the reference data and are relative to the sender organisation that can publish messages

## What does the cookbook say?
### Principles
The ebox/enterprise RESTful API proposes 3 types of referenceData: messageType, senderOrganization, and senderApplication.
+ A senderOrganizationId MUST be the CBE (BCE/KBO) number of the related organization.
+ A senderOrganizationShortName and LongName SHOULD match the official names, except in case of valid business reason.
+ For a senderApplication it is good practice to refer to data known to the end user (for example, online service names and descriptions).
+ A MessageType is required to categorize a message in the form of a well-known business category for several documents.
Each referenceDataId used as property of a message MUST correspond to a well-defined referenceData.

## More Details

+ Institution is also the common name used in our e-box vocabulary for organization. 

+ Mandatory definitions are Id and short name of the organisation, application or message types.

+ In the details of a referenceData organisation and message type, it is planned to list the identifiers of the other referenceData related to the current one. 
There is no mandatory rule to define the relation. 
As an example, the "natural" way to see the relations between the reference data is that we work in a structure of 3 levels: level 1 - Organisation, level 2 - Application and level 3 - Message Type

+ Organisation and Application are defined in the 3 national languages (fr, nl, de), in the description of those parameters

+ Multiple message types can be defined, for the same couple of organization and application
The messageType identifies the type of the message. 
In addition that each message type is linked with an institution and a sender application, it is associated with a validity period, some security checks, and possible business data, format of business data included.
A message type is defined with [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be) when an institution wants to publish a new sort of message to e-Box (by means of an identification form). 

+ There is also the logo support of the organisation or application
A logo MUST be a PNG, GIF, JPG or JPEG image on a transparent background. The small size proposed for the images (<100 pixels height = width) MUST be respected.
Each logo of a senderOrganization or senderApplication SHOULD match the official one of respectively your organisation and your application.
You can provide a different logo for each supported language.

+ Each trio configured will target either the ebox enterprise or the ebox citizen

## Example 
*_Organisation:_ 
  `ONVA` - Office national des Vacances annuelles, 
  `RJV` - Rijksdienst voor Jaarlijkse Vakantie,
  `LJU` - Landesamt für den Jahresurlaub

*_Application:_
  `rjv-onva:workerholidayrights:cova2`
  This corresponds to Secteur des Vacances Annuelles, Sector Jaarlijkse Vakantie, Sektor des Jahresurlaubs

*_Messagetype:_
  `YearlyVacationAccountExtract` (in FR: *Disponibilité de l’extrait de compte*)
  `YearlyVacationFiscalCertificate` (in FR: *Disponibilité fiche fiscale*)


## Recipient
In a bidrectional scenario, we define a sender and a recipient e-box.
The description above was done for a first message when an institution sends a message to an enterprise.
When the enterprise replies, the sender is an enterprise and the recipient is also an entreprise representing the institution.
