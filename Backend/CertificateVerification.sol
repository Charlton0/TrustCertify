 // SPDX-License-Identifier: MIT

// A decentralised system that stores academic credentials like certificates
// Allows three kinds of users; institutions that issue certificates, certificate holders, verifiers
// Institutions issue certificates and can revoke them in case of fraud
// Employs Multisignature verification mechanism to either issue or revoke certificates
// The contract also allows transfer of certifiate ownership,
// enables students to move their certificates between accounts, which is useful if they lose access to their original wallet or migrate to a new digital identity
// Also allows for one to appeal against unfair revocation of academic credentials
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
        address owner;
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

    struct RevocationAppeal {
        address student;
        string reason;
        bool resolved;
        uint approvals;
        mapping(address => bool) approvedBy;
    }

    uint public certificateCount;

    // Mapping of certificate IDs to Certificate structs
    mapping(bytes32 => Certificate) public certificates;

    // Mapping of pending certificate IDs to PendingCertificate structs
    mapping(bytes32 => PendingCertificate) public pendingCertificates;

    // Mapping of revocation reasons 
    mapping(bytes32 => string) public revocationReasons;

    // Mapping of revocation appeals
    mapping(bytes32 => RevocationAppeal) public revocationAppeals;

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
    event CertificateTransferred(bytes32 indexed certificateId, address newOwner);
    event RevocationAppealed(bytes32 indexed certificateId, address student, string reason);
    event RevocationAppealApproved(bytes32 indexed certificateId, address approver);
    event CertificateRestored(bytes32 indexed certificateId);

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
            isRevoked: false,
            owner: msg.sender
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
    function revokeCertificate(bytes32 certificateId, string memory reason) public onlyAuthorizedSigner {
    require(certificates[certificateId].issueDate != 0, "Certificate does not exist");
    certificates[certificateId].isRevoked = true;
    revocationReasons[certificateId] = reason;

    emit CertificateRevoked(certificateId);
}

    // Function to allow a certificate owner to appeal incase of unfair revocation
    function appealRevocation(bytes32 certificateId, string memory reason) public {
    require(certificates[certificateId].isRevoked, "Certificate is not revoked");
    require(certificates[certificateId].owner == msg.sender, "Only certificate owner can appeal");

    
    RevocationAppeal storage appeal = revocationAppeals[certificateId];
    appeal.student = msg.sender;
    appeal.reason = reason;
    appeal.resolved = false;
    appeal.approvals = 0;

    emit RevocationAppealed(certificateId, msg.sender, reason);
}

    // Function to approve a revocked certificate incase of any appeal
    function approveRevocationAppeal(bytes32 certificateId) public onlyAuthorizedSigner {
        RevocationAppeal storage appeal = revocationAppeals[certificateId];
        require(!appeal.resolved, "Appeal already resolved");
        require(!appeal.approvedBy[msg.sender], "Already approved");

        appeal.approvedBy[msg.sender] = true;
        appeal.approvals++;
        emit RevocationAppealApproved(certificateId, msg.sender);

        if (appeal.approvals >= quorum) {
            certificates[certificateId].isRevoked = false;
            delete revocationAppeals[certificateId];
            emit CertificateRestored(certificateId);
        }
    }

     // Function to transfer ownership of a certificate
    function transferCertificate(bytes32 certificateId, address newOwner) public {
        require(certificates[certificateId].owner == msg.sender, "Only the certificate owner can transfer");
        require(newOwner != address(0), "Invalid address");
        certificates[certificateId].owner = newOwner;
        emit CertificateTransferred(certificateId, newOwner);
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
