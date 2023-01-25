
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = process.env.REACT_APP_PRIV_KEY || ""

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    
    goerli: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://goerli.infura.io/v3/${REACT_APP_PROJECT_KEY}`
      ),
    },

    gas: 5000000,
    gasPrice: 25000000000,
    network_id: 3
    
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: 
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  }


};
