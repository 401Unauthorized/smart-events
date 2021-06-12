## Security

> The project contributors advise this is not "production ready"!

> There should be no reasonable expectation of proper security measures.

If you have discovered a new security vulnerability, please report it through the means described below.

## Reporting Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

Send an email to [git@stephenmendez.dev](mailto:git@stephenmendez.dev). Expect to receive a response within 72 hours. 

Please include the following information (when available):

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

## Known Vulnerabilities

> For the sake of transparency, this project may publicly disclose some known vulnerabilities.

### Data Consistency

* There is **minimal data validation** for the returned data of the websocket API.
* The data model is subject to change without advanced notice.

### Authentication

* Authentication is currently a manual process based on an unaffiliated web app.
* Secrets (cookie, csrf token, etc) need to be stored safely. Determining how to do so is the sole resposibility of the developer using this package.
* The stored secrets may allow full access to the user account without limitation.
* If the secrets are lost, shared or published, the entire account should be considered compromised. 

### Logging

* There is limited to no logging.

### Tests

* There is limited to no tests.

### Privacy

* The websocket request includes a unique User-Agent header containing the project name, version and URL: `smart-events/0.1.1 (https://github.com/401unauthorized/smart-events)`.
* All communication happens over the WSS (WebSocket Secure) protocol which uses SSL/TLS encryption.
* The security of the [websocket library](https://www.npmjs.com/package/websocket) has not been tested/validated.