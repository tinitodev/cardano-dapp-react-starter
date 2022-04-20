# Cardano DApp simple react starter (POC)


## Instructions

 - Clone this repo
 - ``cd`` into the repo directory
 - run ``npm i``
 - fill ``SCRIPT_ADDRESS_TESTNET`` (on 'src/config/constants') with your own script-address
 - start the app in development mode ``npm run dev``
 
 Note: You may encounter a "critical warning" (from webpack complaining) this is due to a dynamically defined require on 'cardano-multiplatform-lib', you can just ignore it, or go to node_modules/@dcspark/cardano-multiplatform-lib-browser/cardano_multiplatform_lib_bg.js file and comment out the function making this require (just search by: 'require', should be at line 16059 aprox.)

 ```js
 export function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    // var ret = require(getStringFromWasm0(arg0, arg1));
    // return addHeapObject(ret);
};
 ```


