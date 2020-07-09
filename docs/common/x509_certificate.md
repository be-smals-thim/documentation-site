---
title: X.509 certificate
---

- Attention, you need a distinct certificate for each work environment (Acceptance, Production).
- The type of certificate requested must be a non-public trust (applicative) certificate.
  * Trusted CA: QuoVadis Trust Anchor Issuing CA G2;
- The order for a new certificate must be made via info.be@quovadisglobal.com 
  * The mail must be sent in Dutch or English.
- The certificate format MUST respect the following structure:

<table>
    <thead>
        <tr>
            <td>Field</td><td>Value</td><td>Comment/example</td>
        </tr>
    </thead>
    <tr><td><strong>C</strong></td><td>BE</td><td><strong>C</strong> = BE  </td></tr>
    <tr><td><strong>O</strong></td><td>ORGANIZATIONNAME</td><td>The legal name of your organization. Example: <br/><strong>O</strong> = SMALS</td></tr>
    <tr><td><strong>OU</strong></td><td>Belgian Federal Government</td><td><strong>OU</strong> = Belgian Federal Government</td></tr>
    <tr><td><strong>OU</strong></td><td>urn:be:fgov:kbo-bce:organization:cbe-number:xxxxxxxxxx</td><td>Example: for institution with CBE 01234567689 this OU must be: <br/><strong>OU</strong> = urn:be:fgov:kbo-bce:organization:cbe-number:0123456789</td></tr>
    <tr><td><strong>OU</strong></td><td>ACC</td><td>Possible values: PRD, ACC, INT. Example: <br/><strong>OU</strong> = ACC</td></tr>
    <tr><td><strong>CN</strong></td><td>ApplicationID-URN-from-request-document</td><td>Example: for application *werkkaart*/*carte de travail* (RVA/Onem), CN must be: <br/>**CN** = employment:job-attest:werkkaart</td></tr>
    <tr><td><strong>L</strong></td><td>Brussels</td><td>The city where your organization is located. Example: <br/><strong>L</strong> = Sint-Gillis</td></tr>
    <tr><td><strong>S</strong></td><td>Brussel-Hoofdstad</td><td>The state/region where your organization is located. This shouldn't be abbreviated. Example: <br/><strong>S</strong> = Brussel-Hoofdstad</td></tr>
</table>
| Field | Value                                                  | Comment/example                                                                                                                    |
|:-----:|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **C** | BE                                                     | **C** = BE                                                                                                                         |
| **O** | ORGANIZATIONNAME                                       | The legal name of your organization. Example: <br/>**O** = SMALS                                                                    |
| **OU**| Belgian Federal Government                             | **OU** = Belgian Federal Government                                                                                                |
| **OU**| urn:be:fgov:kbo-bce:organization:cbe-number:xxxxxxxxxx | Example: for institution with CBE 01234567689 this OU must be: <br/>**OU** = urn:be:fgov:kbo-bce:organization:cbe-number:0123456789 |
| **OU**| ACC                                                    | Possible values: PRD, ACC, INT. Example: <br/>**OU** = ACC                                                                          |
| **CN**| ApplicationID-URN-from-request-document                | Example: for application *werkkaart*/*carte de travail* (RVA/Onem), CN must be: <br/>**CN** = employment:job-attest:werkkaart       |
| **L** | Brussels                                               | The city where your organization is located. Example: <br/>**L** = Sint-Gillis                                                      |
| **S** | Brussel-Hoofdstad                                      | The state/region where your organization is located. This shouldn't be abbreviated. Example: <br/>**S** = Brussel-Hoofdstad         |

- If necessary, the CSR can be sent to us for validation before the application at QuoVadis.

Do not forget to have your “e-Box DocProvider onboarding form” validated (by [eBoxIntegration@smals.be](mailto:eBoxIntegration@smals.be)) before ordering your certificates to QuoVadis. 