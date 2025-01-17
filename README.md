# Clearad Platform

### This is the main UI of Clearad Network Platform, Clearad is trust-minimized solution for digital advertising that reduces ad fraud, improves ad budgets and protects user privacy.

### It's built primarily with React.js, ethers.js and MATERIAL-UI and it interacts directly with Ethereum, [Clearad Market](https://github.com/
Network/adex-market), the [Validators](https://github.com/adexnetwork/adex-validator) and the Clearad Relayer.

## Running in development mode

* Ensure you have Chrome/Firefox with Metamask, configured to the Goerli network, with [Goerli testnet ETH](https://goerli-faucet.slock.it/)
* run the following commands:

```
npm install
npm start
```

* Once you open `http://localhost:3000`, go to Standard account -> Sign up; follow the instructions; the email does not matter


### Contribution guide

* Fork the repo, work in a separate branch created from `master`
* Ensure the tests pass (`npm test`)
* Create a PR back to the original repo

**NOTE:** If you're here because of a Gitcoin hackathon, please open new issues in the repository if you run into problems.

### Built with 
* [ethers.js](https://docs.ethers.io/ethers.js/html/) - Ethereum JavaScript API
* [React](https://github.com/facebook/react) - The web framework used
* [Create React App](https://github.com/facebookincubator/create-react-app) - The project bootstrap
* [MATERIAL-UI](https://material-ui.com/) - React components that implements Google Material Design
* Adex Platform

### [Changelog](CHANGELOG.md)

### Pre-defining an account to log in with
If you're logging in with an external wallet that controls many accounts (identities), you can append `?login-select-identity=<addr>` to the login link like so: `https://staging.



.network/#/login/full?external=metamask&login-select-identity=0x033ed90e0fec3f3ea1c9b005c724d704501e0196`
