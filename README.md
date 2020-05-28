<div align="center">

![interference2](https://user-images.githubusercontent.com/6388707/44865709-587bc600-ac83-11e8-9e38-bfb9e9426086.png)

</div>

<div align="center">
  
[![NPM version](https://img.shields.io/npm/v/interference.svg?style=flat)](https://www.npmjs.com/package/interference)
[![NPM downloads](https://img.shields.io/npm/dm/interference.svg?style=flat)](https://www.npmjs.com/package/interference) 
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  [![Dependencies Status](https://david-dm.org/greguz/fluido.svg)](https://david-dm.org/greguz/fluido.svg)

</div>

Custom error factory for microservices with HTTP code and internal type props Edit

## Install

```bash
npm install interference
```

## Usage

```javascript
import Interference, { isInterference } from 'interference'

const err = Interference({ message: 'Good news everyone', type: 'FUTURAMA' })

if (isInterference(err) && err.type === 'FUTURAMA') {
  console.log('We have a special delivery today')
}
```

<b>Factory Signature</b>
```javascript
({ message: string, type?: string, details?: any, code?: number }): Interference
```

### Referenct to < es6 target
[Extending built-ins Error](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work])
