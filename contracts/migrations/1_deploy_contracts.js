// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");

const trustCertify = artifacts.require("CertificateVerification");

// constructor(address[] memory _signers, uint _quorum)

module.exports = function (deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);

  deployer.deploy(
    trustCertify,
    [
      // CHARLES
      // "0x50433f78cEa9f7e25c9b2c0fE7Cf10A13a6c4Fa4",
      // "0x7Bb6a66adD371e0Ecad67a1bBabb4A9f6Ec269e0",
      // "0x4Aa0e5e926395a481766a84823239eaDA561b648",
      // "0x11040D210130ce470caA1612f72350818CD1C6Fd",

      // FELABS
      "0xcAE942D0E6Fb42937229E94B74542457d6fCe403",
      "0x68277717Dc0d6c9cD2458A4E9DD7Ce8826e403ba",
      "0x2082220aD843818F4B382b397A8Fd23628946f62",
      "0x6768fc7634f0bC61A1f2D8a2c0f608b3D0DA746B",
    ],
    2
  );
};
