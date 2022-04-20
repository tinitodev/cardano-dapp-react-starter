# Cardano DApp - simple react starter (POC)

## Instructions

 - Clone this repo
 - ``cd`` into the repo directory
 - Run ``npm install``
 - Fill ``SCRIPT_ADDRESS_TESTNET`` (on 'src/config/constants.ts') with your own script-address
 - Start the app in development mode 

    ```
      npm run dev
    ```
 
 Note: You may encounter a "critical warning" (from webpack complaining) this is due to a dynamically defined require on 'cardano-multiplatform-lib', you can just ignore it, or go to 'node_modules/@dcspark/cardano-multiplatform-lib-browser/cardano_multiplatform_lib_bg.js' file and comment out the function making this require (just search by: 'require', should be at line 16059 aprox.)

 ```js
 export function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
  // var ret = require(getStringFromWasm0(arg0, arg1));
  // return addHeapObject(ret);
};
 ```

## Notes and Clarifications

This was my first approach for a Dapp on Cardano. Basically, an example or proof of concept on how to connect wallets on the frontend, and also how to build and submit a simple transaction with the help of 'cardano-multiplatform-lib' (forked from 'cardano-serialization-lib'). The provided example will allow you to send $ADA to a Plutus Script Address and set a Datum on the Tx. The hardcoded datum is just () (Unit), but you could change that to your needs, and play around with different types of Data. You could add additional functionalities and functions (for example in the 'transactionsUtils.ts' file).

Please take into account that the Cardano ecosystem and tooling is very new and changing almost every day. So it’s very likely that the approach I used for this first project/exercise won’t be the same as the one I will probably use for future or more complex ones.
Also note, that this is a purely frontend (serverless) simple project, but for more complex applications you may need/want to build a backend to make the app more robust, etc.

## The Starter

This project is built using Typescript as is obviously a big help to keep all the different types of data clearly distinguishable and minimize the introductions of bugs or runtime errors.

For styles, UI elements and theme, is using Material-UI.
It already has react-router-dom setup, and even a silly page to navigate from/to Homepage (so you can easily add more pages).

There is some basic error-handling and alerts already in place, but can be improved a lot for a better UX and also better code quality.

It also has eslint and prettier already setup, to have some basic code format rules. You can obviously change those config files to your preferences (``npm run format`` to explicitly format code).

Using webpack, with dev and prod config.

I tried to leave this project as empty and as clean as possible, so the people using it as starter can add their own stuff, but there is some basic structure/components to make it more easy to get started playing and have something to see out-of-the-box.


### Credits & Sources

Some of the functions in 'transactionsUtils.ts' file were entirely or partially taken from [dynamicstrategies/cardano-wallet-connector](https://github.com/dynamicstrategies/cardano-wallet-connector/blob/master/src/App.js) and adapted to typescript.

These Cardano Foundation [CIP-0030 docs](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030) were consulted, to better understand the WalletAPI available methods, their signature types (params), as well as the different APIError types and codes.
