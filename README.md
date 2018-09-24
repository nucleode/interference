<div align="center">

![interference2](https://user-images.githubusercontent.com/6388707/44865709-587bc600-ac83-11e8-9e38-bfb9e9426086.png)

</div>

<div align="center">
  
[![NPM version](https://img.shields.io/npm/v/interference.svg?style=flat)](https://www.npmjs.com/package/interference)
[![NPM downloads](https://img.shields.io/npm/dm/interference.svg?style=flat)](https://www.npmjs.com/package/interference) 
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Greenkeeper badge](https://badges.greenkeeper.io/nucleode/interference.svg)](https://greenkeeper.io/)

</div>

Custom error factory for microservices with HTTP code and internal type props Edit

## Install

```bash
npm install interference
```

## Usage

```javascript
import Interference from 'interference' // or const Interference = require('interference').default
```

<b>Factory</b>
```javascript
(message: string, type?: string, details?: any, code?: number): Interference
```

You can inject custom HTTP codes to map internal type errors to HTTP errors inside your main index.ts/index.js.

```javascript
InjectCodes({
    INVALID_OBJECT_ID: 400,
    MISSING_OBJECT_ID: 400,
    EMPTY_DOCUMENT: 400,
    DOCUMENT_VALIDATION_ERROR: 400,
    MISSING_UNIQUE_KEY: 400,
    MISSING_AUTH_DATA: 400,
    CREDENTIALS_NOT_VALID: 400,
    MISSING_MANDATORY_PRAMETER: 400,
    TOKEN_NOT_VALID: 401,
    DOCUMENT_NOT_FOUND: 404,
    INCOMPATIBLE_CHANGE_STATUS: 409,
    DUPLICATED_DOCUMENT: 409,
    REMOTE_UNREACHABLE: 503,
    GENERIC_ERROR: 500,
  })
  ```
  
Then if you create a new error `const error = Interference('Empty document', 'EMPTY_DOCUMENT', { dupe: '4350394' })` it you will be mapped to 400 HTTP error inside `error.statutsCode`.

`InjectCodes` must be called only once inside your project since it will set internal httpCodes var, that will be used for all future Interference instance.


### Referenct to < es6 target
[Extending built-ins Error](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work])



