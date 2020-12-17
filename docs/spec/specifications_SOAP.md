---
title: Ebox Enterprise Services Specifications  - SOAP
sidebar_label: Specifications - SOAP
---

This page is about SOAP e-Box web services such as *[EboxMessage](#eboxmessage)*, *[CitizenProfile](#citizenprofile)* or *[ePost (RegisteredMail)](#epost)*.
They are legacy e-Box web service.
The REST integration is the new and privileged way but we keep the SOAP specifications available on this page.

## EBoxMessage
EBoxMessage is the legacy publication web service.
If you received an error message after an attempt to send a SOAP publication request, perhaps an explanation of the error is on the [EBoxMessage troubleshooting page](../ds/troubleshooting_SOAP.md).

### Technical specifications of the publication web service
- [EBoxMessage - Specification Guide](/openapi/SOAP/EBoxMessage_SpecificationGuide.pdf)

### EBoxMessage contract (WSDL-XSD)
- [EboxMessage WSDL-XSD](/openapi/SOAP/EboxMessage_WSDL-XSD.zip)

### Usefull links
- [How to sign a SOAP message with a x509 certificate](https://www.socialsecurity.be/site_fr/general/helpcentre/soa/security_ws_x509.htm).
Pay attention that not all the pages on that website are true for the case of e-Box web services.
- [How to generate a P12 or JKS keystore](https://www.socialsecurity.be/site_fr/general/helpcentre/soa/developer_create_keystore.htm)


## CitizenProfile
CitizenProfile is used to know if a citizen accepted the terms and conditions of the citizen eBox.
There is no need of this service for publication to organizations.
Please note that the language code returned by the service is not the language to use for publication.

### Technical specifications of the citizen profile service
- [CitizenProfile - Speficiation Guide](https://www.ksz-bcss.fgov.be/sites/default/files/assets/services_et_support/specification_guide_ws_citizenprofile.pdf)

### CitizenProfile contract (WSDL-XSD)
- [CitizenProfile contract 1.3.2](/openapi/SOAP/serviceclient-citizenprofile-1.3.2-contract.zip)


## ePost
ePost, also named RegisteredMail, is the web service to use in order to send registered mails in the eBox of your recipient.
This service is in the Social Security legal framework. It is only available for institutions that are in the Social Security network.
More info on the [smals RegisteredMail reuse page](https://reuse.smals.be/fr/service/registeredmail).

### Technical specifications of the registered mail service
- [RegisteredMail - Specification Guide](/openapi/SOAP/RegisteredMail_WS_Specif_Guide.pdf)

### ePost contract (WSDL-XSD)
- [epost-sei-1.5.4](/openapi/SOAP/epost-sei-1.5.4.jar)