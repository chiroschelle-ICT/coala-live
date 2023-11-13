# CoalaBeta

Tijdelijke coala voor leden beheer Chiro Schelle

## Informatie Docent

### Github link:
- https://github.com/chiroschelle-ICT/coala-live

### Firebase URL:
- https://coala-df864.web.app

### Login's
- Admin:
  - email: killian.serluppens@chiroschelle.be
  - pw: Killian123!
- Normal user:
  - Email: normal.user@chiroschelle.be
  - pw: SuperWachtwoord123!

## Testing 
### Plan
#### Positive tests
1. Testing the email regex pattern
  - I tested if the email pattern will actually work by giving it a correct email
  - Expected result: Passed
    - the test passed
  - Link to test: [Link to line 52](src\app\authentication\signup\signup.component.spec.ts#52)
2. Testing the password pattern
  - in this test I tested if the password regex pattern works giving it a correct password
  - Expected result: Passed
    - the test passed
  - link to test: [Link to line 57](src\app\authentication\signup\signup.component.spec.ts#57)
3. Testing the singup process
  - Here we test the whole signup process giving it valid emails and passwords (expect the navigation to login --> had problems testing this part with resulted in the test failing).
  - Expected result: Passed
    - the test passed
  - link to test: [Link to line 62](src\app\authentication\signup\signup.component.spec.ts#62)
### Negative tests
1. Testing HTML response on wrong input
  - Here we test if the HTML changes correctly if the input of email is wrong
  - Expectet result: passed
    - the test passed
  - link to test: [Link to line 83](src\app\authentication\signup\signup.component.spec.ts#83)
2. testing wrong password pattern
  - here we test the password regex. we give it a wrong input and it should be invalid
  - expected result: passed
    - the test passed
  - link to test: [Link to line 92](src\app\authentication\signup\signup.component.spec.ts#92)

## All Dependencies
- Inculdes
  - Npm
  - Angular
  - Charts.js
  - Tailwind
  - Firebase
  - body parser
- Install:
  - ```npm run install-all-packages```

