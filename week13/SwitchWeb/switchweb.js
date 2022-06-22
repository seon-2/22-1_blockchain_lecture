web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var abi = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "payToSwitch", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_index", "type": "uint256" } ], "name": "updateStatus", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_iot", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": true, "inputs": [], "name": "iot", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "numPaid", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "switches", "outputs": [ { "name": "addr", "type": "address" }, { "name": "endTime", "type": "uint256" }, { "name": "status", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var swAbi = web3.eth.contract(abi);
var contractAddr = "0xa151D73f88E29AcaA0d53784baBcEBD9048A2776";
var swObj = swAbi.at(contractAddr);

var accounts = web3.eth.accounts;

function refereshAccountsTable() {
    var innerHtml = "<tr><td>Account</td><td>Balance</td>";

    for (var i=0; i < accounts.length; i++) {
        var account = accounts[i];
//        var balance = web3.fromWei(web3.eth.getBalance(account),"ether");
        var balance = web3.eth.getBalance(account);
        
        innerHtml = innerHtml + "<tr><td>" + account + "</td><td>" + balance + "</td></tr>";
    }

    $("#accountsBalanceTable").html(innerHtml);
}

function refereshContractTable() {
    var innerHtml = "<tr><td>Contract</td>" + "<td>Amount</td>";
	var balance = web3.fromWei(web3.eth.getBalance(contractAddr),"ether");

    innerHtml = innerHtml + "<tr><td>" + contractAddr + "</td><td>" + "&nbsp;&nbsp;" + balance + "</td></tr>";

	$("#switchAccount").html(innerHtml);
}


function payToSwitch() {
    var  sender  =  $("#userAddr").val(); 
    
    swObj.payToSwitch({from: sender, to : contractAddr, value: 1000000000000000000}, function(e,result) {
        if(!e) {
            refereshAccountsTable(); 
            refereshContractTable();
        }                          
        else                 
            console.error(error);         
    }); 

    
}

$(document).ready(function() {
    refereshAccountsTable();
	refereshContractTable();
});

