
** THIS IS A DRAFT DOCUMENT **

As part of the onboarding process, but also as a constant validation of the quality of your implementation the following
certification and validation processes have been put in place. 
These only apply to the consultation profile as it is the only one which has an impact on the www.eboxenterprise.be and
 other Document Consumer operations.

## Certification method

- The certification process will be done by an automated system
- Certification will do HTTP requests the certifying DP. The output of the DP will be validated against 
pre-determined test data.
- This system will first require a reset of the DP System Data using special purpose method /certication/resetDataSet 
which does not take any arguments
    - This is needed to avoid dataset drift on date based fields
- This method will be secured by a new Scope which will only be attributed to www.eboxenterprise.be certifying authority
    - The name of the scope is ...
- Once the reset is done, one test Ebox will contain exactly the data defined in test data file.
- There are two validation profiles
    - PROD: Which is a lighter mode which will not impact shared data like reference Data in a meaningful way
    - CERTIFICATION: Which is all encompassing and will lead to a reset of all API data
- PROD validation will be run continuously every two days
- CERTIFICATION will be run upon request by the Document provider and create a certification document to be stored by
the wwww.eboxenterprise.be owner and shared with the certified DP.
- A /certification/version method will have to be provided as well by the DP. Certification will be tied to the output of 
this method. This method will be unsecured.
- All data and the certification system will be the made and managed by the www.eboxenterprise.be owner
- Certification process also applies for the Citizen Part of the API
- Dataset content and test being applied based on these datasets is can be changed at the discretion of the www.eboxenterprise.be owner
- These tests can include performance and stability validations. 

## Specification and data set

... Todo 