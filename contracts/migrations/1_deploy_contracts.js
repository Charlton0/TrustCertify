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
      "0x50433f78cEa9f7e25c9b2c0fE7Cf10A13a6c4Fa4",
      "0x7Bb6a66adD371e0Ecad67a1bBabb4A9f6Ec269e0",
      "0x4Aa0e5e926395a481766a84823239eaDA561b648",
      "0x11040D210130ce470caA1612f72350818CD1C6Fd",
    ],
    2
  );
};
