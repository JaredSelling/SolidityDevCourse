// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minContribution) public {
        address newCampaignAddress = address(new Campaign(minContribution, msg.sender));
        deployedCampaigns.push(newCampaignAddress);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint requestAmnt;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    mapping(address => bool) public approvers;
    uint public minContribution;
    uint numApprovers;
    Request[] public requests;

    constructor(uint minimum, address creator) {
        manager = creator;
        minContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minContribution);
        approvers[msg.sender] = true;
        numApprovers++;
    }

    function createSpendingRequest(string memory description, uint requestAmnt, address recipient) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.requestAmnt = requestAmnt;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.complete == false);
        require(request.approvalCount > (numApprovers/2));

        payable(request.recipient).transfer(request.requestAmnt);
        request.complete = true;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
