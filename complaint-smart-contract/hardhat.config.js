 /** @type import('hardhat/config').HardhatUserConfig */
 module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: "polygon_mumbai",
    networks:{
      hardhat:{},
      polygon_mumbai: {
        url: 'https://polygon-mumbai.g.alchemy.com/v2/Fr_3C3_IPMwlFf_bfgGM2Hi8f7nHp5uj',
        accounts:[`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
