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
      "0xcAE942D0E6Fb42937229E94B74542457d6fCe403",
      "0x68277717Dc0d6c9cD2458A4E9DD7Ce8826e403ba",
      "0x2082220aD843818F4B382b397A8Fd23628946f62",
      "0x6768fc7634f0bC61A1f2D8a2c0f608b3D0DA746B",
    ],
    2
  );
};
