 // SPDX-License-Identifier: MIT

// A decentralised system that stores academic credentials like certificates
// Allows three kinds of users; institutions that issue certificates, certificate holders, verifiers
// Institutions issue certificates and can revoke them in case of fraud
// Employs Multisignature verification mechanism to either issue or revoke certificates

pragma solidity ^0.8.0;

contract CertificateVerification {
    //State variables goes here
    // Structure to represent a certificate
    struct Certificate {
        string studentName;
        string courseName;
        string institutionName;
        uint issueDate;
        bool isRevoked;
    }

    // Structure to represent a pending certificate approval
    struct PendingCertificate {
        string studentName;
        string courseName;
        string institutionName;
        uint approvals;
    //this mapping  ensures that each signer can approve only once
        mapping(address => bool) approvedBy;
    }

    uint public certificateCount;

    // Mapping of certificate IDs to Certificate structs
    mapping(bytes32 => Certificate) public certificates;

    // Mapping of pending certificate IDs to PendingCertificate structs
    mapping(bytes32 => PendingCertificate) public pendingCertificates;

    //Array to hold the addresses of  authorizedSigners
    address[] public authorizedSigners;

     //Minimum number of approvals required for a certificate to be issued
    uint public quorum;

    // Events
    event CertificateIssued(
        bytes32 indexed certificateId,
        string studentName,
        string courseName,
        string institutionName,
        uint issueDate
    );

    event CertificateRevoked(bytes32 indexed certificateId);

    event CertificateProposed(
        bytes32 indexed certificateId,
        string studentName,
        string courseName,
        string institutionName
    );
    event CertificateApproved(bytes32 indexed certificateId, address approver);

    // Modifier to restrict access to authorized signers
    modifier onlyAuthorizedSigner() {
        bool isSigner = false;
        for (uint i = 0; i < authorizedSigners.length; i++) {
            if (msg.sender == authorizedSigners[i]) {
                isSigner = true;
                break;
            }
        }
        require(isSigner, "Only authorized signers can perform this action");
        _;
    }

    // Constructor to set authorised signers and quorum
    constructor(address[] memory _signers, uint _quorum) {
        require(_signers.length >= _quorum, "Quorum cannot exceed the number of signers");
        authorizedSigners = _signers;
        quorum = _quorum;
    }

    // Function to propose a certificate
    function proposeCertificate(
        string memory studentName,
        string memory courseName,
        string memory institutionName
    ) public onlyAuthorizedSigner returns (bytes32) {
        // Generate a unique certificate ID
        bytes32 certificateId = keccak256(
            abi.encodePacked(studentName, courseName, institutionName, block.timestamp)
        );

        // Ensure the certificate is not already issued or pending
        require(certificates[certificateId].issueDate == 0, "Certificate already issued");
        require(pendingCertificates[certificateId].approvals == 0, "Certificate already proposed");

        // Represents a pending certificate
        PendingCertificate storage pending = pendingCertificates[certificateId];
        pending.studentName = studentName;
        pending.courseName = courseName;
        pending.institutionName = institutionName;

        // Emit the CertificateProposed event
        emit CertificateProposed(certificateId, studentName, courseName, institutionName);

        return certificateId;
    }

    // Function to approve a certificate
    function approveCertificate(bytes32 certificateId) public onlyAuthorizedSigner {
        PendingCertificate storage pending = pendingCertificates[certificateId];

        // Ensure the certificate proposal exists
        require(bytes(pending.studentName).length > 0, "Certificate proposal does not exist");

        // Ensure the signer has not already approved
        require(!pending.approvedBy[msg.sender], "Already approved by this signer");

        // Record the approval
        pending.approvedBy[msg.sender] = true;
        pending.approvals++;

        // Emit the CertificateApproved event
        emit CertificateApproved(certificateId, msg.sender);

        // If quorum is met, issue the certificate
        if (pending.approvals >= quorum) {
            _issueCertificate(certificateId, pending);
        }
    }

    // Function to issue a certificate
    function _issueCertificate(bytes32 certificateId, PendingCertificate storage pending) internal {
        certificates[certificateId] = Certificate({
            studentName: pending.studentName,
            courseName: pending.courseName,
            institutionName: pending.institutionName,
            issueDate: block.timestamp,
            isRevoked: false
        });

        // Emit the CertificateIssued event
        emit CertificateIssued(
            certificateId,
            pending.studentName,
            pending.courseName,
            pending.institutionName,
            block.timestamp
        );

        // Clean up the pending certificate
        delete pendingCertificates[certificateId];
    }

    // Function to revoke a certificate
    function revokeCertificate(bytes32 certificateId) public onlyAuthorizedSigner {
        require(certificates[certificateId].issueDate != 0, "Certificate does not exist");
        certificates[certificateId].isRevoked = true;

        emit CertificateRevoked(certificateId);
    }

    // Function to verify a certificate
    function verifyCertificate(bytes32 certificateId) public view returns (bool, string memory) {
        Certificate memory cert = certificates[certificateId];
        if (cert.issueDate == 0) {
            return (false, "Certificate does not exist");
        }
        if (cert.isRevoked) {
            return (false, "Certificate has been revoked");
        }
        return (true, "Certificate is valid");
    }
}
