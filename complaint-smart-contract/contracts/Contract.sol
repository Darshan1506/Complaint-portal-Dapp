// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Complaint {

    // var
    address public officer; // who interacts with owner
    address public owner;
    uint public nextId;
    uint256 [] public pendingApprovals;
    uint256 [] public pendingResolutions;
    uint256 [] public resolvedCases;


    constructor(address _officer) {
        owner = msg.sender;
        officer = _officer;
        nextId = 1;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"You are not an owner");
        _;
    }

    modifier onlyOfficer(){
        require(msg.sender == officer,"You are not the officer");
        _;
    }

    struct complaint {
        uint256 id;
        address complaintRegiteredBy;
        string title;
        string description;
        string approvalRemark;
        string resolutionRemark;
        bool isApproved;
        bool isResolved;
        bool exists;
    }
    mapping(uint256=>complaint) public Complaints;

    event complaintFiled(uint256 id, address complaintRegiteredBy,string title);

    function fileComplaint(string memory _title, string memory _description) public {
        complaint storage newComplaint = Complaints[nextId]; //making a new complaint
        newComplaint.id = nextId;
        newComplaint.complaintRegiteredBy = msg.sender; // (msg.sender who is calling this address)
        newComplaint.title = _title;
        newComplaint.description = _description;
        newComplaint.approvalRemark = "Pending approval"; // since we have just file the complained
        newComplaint.resolutionRemark = "Pending resolution";
        newComplaint.isApproved=false;
        newComplaint.isResolved=false;
        newComplaint.exists = true;
        emit complaintFiled(nextId, msg.sender, _title);
        nextId++;
    }

    function approveComplaint(uint256 _id, string memory _approvalRemark) public onlyOfficer{
        require(Complaints[_id].exists == true,"This complaint does not exists");
        require(Complaints[_id].isApproved == false,"This Complaint is already approved");
        Complaints[_id].isApproved = true;
        Complaints[_id].approvalRemark = _approvalRemark;
    }

 function discardComplaint(uint256 _id, string memory _approvalRemark)
        public
        onlyOfficer
    {
        require(
            Complaints[_id].exists == true,
            "This complaint id does not exist"
        );
        require(
            Complaints[_id].isApproved == false,
            "Complaint is already approved"
        );
        Complaints[_id].exists = false;
        Complaints[_id].approvalRemark = _approvalRemark;
    }

    function resolveComplaint(uint256 _id,string memory _resolutionRemark) public onlyOfficer {
        require(Complaints[_id].exists == true,"This complaint does not exists");
        require(Complaints[_id].isApproved == true,"This complaint is not approved");
        require(Complaints[_id].isResolved == false,"This complaint is already Resolved");
        Complaints[_id].isResolved = true;
        Complaints[_id].resolutionRemark = _resolutionRemark; 
    }

    function calcPendingApprovalIds() public {
        delete pendingApprovals;
        for (uint256 i = 1; i < nextId; i++) {
            if(Complaints[i].isApproved == false && Complaints[i].exists == true){
                pendingApprovals.push(Complaints[i].id);
            }
        }
    }

    function calcPendingResolutionIds() public {
        delete pendingResolutions;
        for (uint256 i = 1; i < nextId; i++) {
            if(Complaints[i].isResolved == false && Complaints[i].exists == true && Complaints[i].isApproved == true){
                pendingResolutions.push(Complaints[i].id);
            }
        }
    }
    function calcResolvedIds() public {
        delete resolvedCases;
        for (uint256 i = 1; i < nextId; i++) {
            if(Complaints[i].isResolved == true){
                resolvedCases.push(Complaints[i].id);
            }
        }
    }

    function setOfficerAddress(address _officer) public onlyOwner {
        owner = _officer;
    }

}