// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import ether from '../../node_modules/zeppelin-solidity/test/helpers/ether'
const BigNumber = web3.BigNumber;
// Import our contract artifacts and turn them into usable abstractions.
import xdac_artifacts from '../../build/contracts/XdacTokenCrowdsale.json'
import coin_artifacts from '../../build/contracts/XdacToken.json'
import _ from "lodash";
// MetaCoin is our usable abstraction, which we'll use through the code below.
var XdacTokenCrowdsale = contract(xdac_artifacts);
var XdacToken = contract(coin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var contract_address = '';
window.App = {
  start: function() {
    var self = this;
    contract_address = document.getElementById("address").value;
    // Bootstrap the MetaCoin abstraction for Use.
    XdacTokenCrowdsale.setProvider(web3.currentProvider);
    XdacToken.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      document.getElementById("account").value = account;
    });
  },
  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  deploy: function() {
    var _wallet = "0x5E3a35dF396c1324a0292309052882cc342383eb";

    const _roundGoals = [
      ether(document.getElementById("goal_0").value),
      ether(document.getElementById("goal_1").value),
      ether(document.getElementById("goal_2").value),
      ether(document.getElementById("goal_3").value),
      ether(document.getElementById("goal_4").value),
    ]

    const _roundRates = [
      new BigNumber(document.getElementById("rate_0").value),
      new BigNumber(document.getElementById("rate_1").value),
      new BigNumber(document.getElementById("rate_2").value),
      new BigNumber(document.getElementById("rate_3").value),
      new BigNumber(document.getElementById("rate_4").value)
    ]

    //const _minContribution = 0.001
    const _minContribution = ether(document.getElementById("minContribution").value)



    var xdactokencrowdsaleContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contributors","outputs":[{"name":"eth","type":"uint256"},{"name":"whitelisted","type":"bool"},{"name":"created","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferTokenOwnership","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contributors","type":"address[]"}],"name":"whitelistAddresses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"refundTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"refundTokensForAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenAmount","type":"uint256"}],"name":"getEthAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_weiAmount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiDelivered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_wallet","type":"address"},{"name":"_roundGoals","type":"uint256[]"},{"name":"_roundRates","type":"uint256[]"},{"name":"_minContribution","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"contributor","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]);
    var xdactokencrowdsale = xdactokencrowdsaleContract.new(
      _wallet,
      _roundGoals,
      _roundRates,
      _minContribution,
      {
        from: web3.eth.accounts[0],
        data: '0x606060405234156200001057600080fd5b604051620032023803806200320283398101604052808051906020019091908051820191906020018051820191906020018051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614151515620000c957600080fd5b60058251141515620000da57600080fd5b60058351141515620000eb57600080fd5b826001908051906020019062000103929190620001d0565b5081600290805190602001906200011c929190620001d0565b50806003819055506200012e62000222565b604051809103906000f08015156200014557600080fd5b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050506200025b565b8280548282559060005260206000209081019282156200020f579160200282015b828111156200020e578251825591602001919060010190620001f1565b5b5090506200021e919062000233565b5090565b6040516117978062001a6b83390190565b6200025891905b80821115620002545760008160009055506001016200023a565b5090565b90565b611800806200026b6000396000f3006060604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631f6d4942146100f157806321e6b53d146101545780632bf04304146101a557806341566585146101ff578063521eb27314610238578063710075091461028d5780638aabe700146102a25780638da5cb5b146102db5780638fc7a25d14610330578063a39fac1214610367578063c2507ac1146103d1578063ec8ac4d814610408578063f2fde38b14610436578063f7fb07b01461046f578063fc0c546a14610498578063fc12dfc7146104ed575b6100ef33610516565b005b34156100fc57600080fd5b610128600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610636565b604051808481526020018315151515815260200182151515158152602001935050505060405180910390f35b341561015f57600080fd5b61018b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061067a565b604051808215151515815260200191505060405180910390f35b34156101b057600080fd5b6101fd6004808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919050506109bf565b005b341561020a57600080fd5b610236600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a5b565b005b341561024357600080fd5b61024b610ac2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029857600080fd5b6102a0610ae8565b005b34156102ad57600080fd5b6102d9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610af3565b005b34156102e657600080fd5b6102ee610b5a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561033b57600080fd5b6103516004808035906020019091905050610b7f565b6040518082815260200191505060405180910390f35b341561037257600080fd5b61037a610b91565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156103bd5780820151818401526020810190506103a2565b505050509050019250505060405180910390f35b34156103dc57600080fd5b6103f26004808035906020019091905050610c80565b6040518082815260200191505060405180910390f35b610434600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610516565b005b341561044157600080fd5b61046d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c92565b005b341561047a57600080fd5b610482610de7565b6040518082815260200191505060405180910390f35b34156104a357600080fd5b6104ab610e10565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104f857600080fd5b610500610e36565b6040518082815260200191505060405180910390f35b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561055357600080fd5b6000341415151561056357600080fd5b600354341015151561057457600080fd5b6001600481548110151561058457fe5b9060005260206000209001546105a534600854610e3c90919063ffffffff16565b111515156105b257600080fd5b6105bb34610e5a565b90508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad183484604051808381526020018281526020019250505060405180910390a3610632610fba565b5050565b60066020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900460ff16905083565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106d857600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb848373ffffffffffffffffffffffffffffffffffffffff166370a082318573ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156107a257600080fd5b6102c65a03f115156107b357600080fd5b505050604051805190506000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561084357600080fd5b6102c65a03f1151561085457600080fd5b505050604051805190506000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15156108eb57600080fd5b6102c65a03f115156108fc57600080fd5b50505060405180519050508073ffffffffffffffffffffffffffffffffffffffff1663f2fde38b846040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156109a157600080fd5b6102c65a03f115156109b257600080fd5b5050506001915050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a1c57600080fd5b600090505b8151811015610a5757610a4a8282815181101515610a3b57fe5b906020019060200201516110df565b8080600101915050610a21565b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ab657600080fd5b610abf816110df565b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610af1336111f9565b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b4e57600080fd5b610b57816111f9565b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610b8a826112f0565b9050919050565b610b9961176f565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bf457600080fd5b6007805480602002602001604051908101604052809291908181526020018280548015610c7657602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610c2c575b5050505050905090565b6000610c8b82610e5a565b9050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ced57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610d2957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006002610df36114a8565b815481101515610dff57fe5b906000526020600020900154905090565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60085481565b6000808284019050838110151515610e5057fe5b8091505092915050565b600080600080600080610e6b6114a8565b9450600093506000925060085491508690505b6005851015610fad57600185815481101515610e9657fe5b906000526020600020900154610eb58284610e3c90919063ffffffff16565b1115610f5a57610ee882600187815481101515610ece57fe5b9060005260206000209001546114f790919063ffffffff16565b9250610efd8383610e3c90919063ffffffff16565b9150610f1283826114f790919063ffffffff16565b9050610f53610f44600287815481101515610f2957fe5b9060005260206000209001548561151090919063ffffffff16565b85610e3c90919063ffffffff16565b9350610fa0565b610f99610f8a600287815481101515610f6f57fe5b9060005260206000209001548361151090919063ffffffff16565b85610e3c90919063ffffffff16565b9350610fad565b8480600101955050610e7e565b8395505050505050919050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050611014348260000154610e3c90919063ffffffff16565b8160000181905550600015158160010160019054906101000a900460ff16151514156110bb5760018160010160016101000a81548160ff0219169083151502179055506007805480600101828161106b9190611783565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b8060010160009054906101000a900460ff16156110dc576110db3361154b565b5b50565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160010160006101000a81548160ff021916908315150217905550600015158160010160019054906101000a900460ff16151514156111de5760018160010160016101000a81548160ff0219169083151502179055506007805480600101828161118e9190611783565b9160005260206000209001600084909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b6000816000015411156111f5576111f48261154b565b5b5050565b600080600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160000154905060008111151561125357600080fd5b600082600001819055508273ffffffffffffffffffffffffffffffffffffffff167f50ea9274879b4e2a584129ff0e7d656cf15144ef80e8935d4cf890390f8f1580826040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156112eb57600080fd5b505050565b6000806000806000806113016114a8565b9450600093506000925060085491508690505b600585101561149b5760018581548110151561132c57fe5b90600052602060002090015461137761136860028881548110151561134d57fe5b9060005260206000209001548461175490919063ffffffff16565b84610e3c90919063ffffffff16565b1115611448576113aa8260018781548110151561139057fe5b9060005260206000209001546114f790919063ffffffff16565b92506113bf8383610e3c90919063ffffffff16565b91506114006113f16002878154811015156113d657fe5b9060005260206000209001548561175490919063ffffffff16565b826114f790919063ffffffff16565b905061144161143260028781548110151561141757fe5b9060005260206000209001548361175490919063ffffffff16565b85610e3c90919063ffffffff16565b935061148e565b61148761147860028781548110151561145d57fe5b9060005260206000209001548361175490919063ffffffff16565b85610e3c90919063ffffffff16565b935061149b565b8480600101955050611314565b8395505050505050919050565b600080600090505b60058110156114f2576001818154811015156114c857fe5b90600052602060002090015460085410156114e5578091506114f3565b80806001019150506114b0565b5b5090565b600082821115151561150557fe5b818303905092915050565b60008060008414156115255760009150611544565b828402905082848281151561153657fe5b0414151561154057fe5b8091505b5092915050565b6000806000600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209250826000015491506115a182610e5a565b90506000811115156115b257600080fd5b6000821115156115c157600080fd5b8260010160009054906101000a900460ff1615156115de57600080fd5b600083600001819055506115fd82600854610e3c90919063ffffffff16565b600881905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050151561166557600080fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb85836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561173257600080fd5b6102c65a03f1151561174357600080fd5b505050604051805190505050505050565b600080828481151561176257fe5b0490508091505092915050565b602060405190810160405280600081525090565b8154818355818115116117aa578183600052602060002091820191016117a991906117af565b5b505050565b6117d191905b808211156117cd5760008160009055506001016117b5565b5090565b905600a165627a7a7230582065306e7779321ddef57424b896151886b76bf0bf8c8f0e7d471dadf2e1cdba07002960606040526040805190810160405280600981526020017f5844414320434f494e00000000000000000000000000000000000000000000008152506004908051906020019062000051929190620001cd565b506040805190810160405280600481526020017f5844414300000000000000000000000000000000000000000000000000000000815250600590805190602001906200009f929190620001cd565b506012600660006101000a81548160ff021916908360ff1602179055503415620000c857600080fd5b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506b033b2e3c9fd0803ce80000006001819055506b033b2e3c9fd0803ce80000006000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef6b033b2e3c9fd0803ce80000006040518082815260200191505060405180910390a36200027c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200021057805160ff191683800117855562000241565b8280016001018555821562000241579182015b828111156200024057825182559160200191906001019062000223565b5b50905062000250919062000254565b5090565b6200027991905b80821115620002755760008160009055506001016200025b565b5090565b90565b61150b806200028c6000396000f3006060604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016357806318160ddd146101bd57806323b872dd146101e65780632ff2e9dc1461025f578063313ce5671461028857806366188463146102b757806370a08231146103115780638da5cb5b1461035e57806395d89b41146103b3578063a9059cbb14610441578063d73dd6231461049b578063dd62ed3e146104f5578063f2fde38b14610561575b600080fd5b34156100e057600080fd5b6100e861059a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012857808201518184015260208101905061010d565b50505050905090810190601f1680156101555780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016e57600080fd5b6101a3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610638565b604051808215151515815260200191505060405180910390f35b34156101c857600080fd5b6101d061072a565b6040518082815260200191505060405180910390f35b34156101f157600080fd5b610245600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610734565b604051808215151515815260200191505060405180910390f35b341561026a57600080fd5b610272610aee565b6040518082815260200191505060405180910390f35b341561029357600080fd5b61029b610afe565b604051808260ff1660ff16815260200191505060405180910390f35b34156102c257600080fd5b6102f7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610b11565b604051808215151515815260200191505060405180910390f35b341561031c57600080fd5b610348600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610da2565b6040518082815260200191505060405180910390f35b341561036957600080fd5b610371610dea565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103be57600080fd5b6103c6610e10565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104065780820151818401526020810190506103eb565b50505050905090810190601f1680156104335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561044c57600080fd5b610481600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610eae565b604051808215151515815260200191505060405180910390f35b34156104a657600080fd5b6104db600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506110cd565b604051808215151515815260200191505060405180910390f35b341561050057600080fd5b61054b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506112c9565b6040518082815260200191505060405180910390f35b341561056c57600080fd5b610598600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611350565b005b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106305780601f1061060557610100808354040283529160200191610630565b820191906000526020600020905b81548152906001019060200180831161061357829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561077157600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107be57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561084957600080fd5b61089a826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114a890919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061092d826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c190919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506109fe82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114a890919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b6b033b2e3c9fd0803ce800000081565b600660009054906101000a900460ff1681565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610c22576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cb6565b610c3583826114a890919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ea65780601f10610e7b57610100808354040283529160200191610ea6565b820191906000526020600020905b815481529060010190602001808311610e8957829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610eeb57600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610f3857600080fd5b610f89826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114a890919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061101c826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c190919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061115e82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114c190919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113ac57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156113e857600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008282111515156114b657fe5b818303905092915050565b60008082840190508381101515156114d557fe5b80915050929150505600a165627a7a72305820735a8a5b6a8d5683ccd55d2b0863eb3357507e0e955321f7b277a83137341f340029',
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          document.getElementById("address").value = contract.address;
        }
      })
  },

  refreshBalance: function() {
    var self = this;
    if(contract_address) {
      self.getBalance(account).then(function (data) {
        var balance_confirmed_element = document.getElementById("balance_confirmed");
        balance_confirmed_element.innerHTML = data.xdac;
        var whitelisted_element = document.getElementById("whitelisted");
        whitelisted_element.innerHTML = data.whitelisted;
        var balance_element = document.getElementById("balance");
        balance_element.innerHTML = data.eth;
      })
    }
    document.getElementById("beneficiary").value = account;
  },

  buyTokens: function() {
    var self = this;

    var amount = ether(parseFloat(document.getElementById("amount").value));
    var beneficiary = document.getElementById("beneficiary").value;

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        meta = instance;
        console.log(amount)
        return meta.buyTokens(beneficiary, { from: account, value: amount });
      }).then(function () {
        self.setStatus("Transaction complete!");
        self.refreshBalance();
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  whitelistAddress: function () {
    var self = this;
    var whitelist = document.getElementById("whitelist").value;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.whitelistAddress(whitelist, { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  refundTokens: function () {
    var self = this;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.refundTokens({ from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  refundTokensForAddress: function () {
    var self = this;
    var refund_address = document.getElementById("refund").value;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.refundTokensForAddress(refund_address, { from: account });
      }).then(function () {
        self.setStatus("Transaction complete!");
      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  getAddresses: function () {
    var self = this;
    if(contract_address) {
      XdacTokenCrowdsale.at(contract_address).then(function (instance) {
        return instance.getAddresses({ from: account });
      }).then(function (addresses) {
        console.log(addresses)
        var addresses_element = document.getElementById("addresses");
        var res = [];
        var whitelisted_element = document.getElementById("addresses");
        whitelisted_element.value = "";
        _(addresses).forEach(function (address) {
          self.getBalance(address).then(function (data) {

            res.push(data)
            whitelisted_element.value = whitelisted_element.value + "\n" + "address: " + data.address + ", eth:"+data.eth + ", xdac:"+data.xdac + ", whitelisted:" + data.whitelisted + "\n"
          })
          self.setStatus("Transaction complete!");
        })


      }).catch(function (e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  },
  getBalance: async function(address) {
    var eth_balance = 0;
    var xdac_balance = 0;
    var whitelisted = false;
    if (contract_address) {
      const XdacTokenCrowdsaleInstance = await XdacTokenCrowdsale.at(contract_address)
      const contributorValues = await XdacTokenCrowdsaleInstance.contributors.call(address)
      eth_balance = contributorValues[0].valueOf() / ether(1);
      whitelisted = contributorValues[1].valueOf();
      const token = await XdacTokenCrowdsaleInstance.token.call()
      const XdacTokenInstance = await XdacToken.at(token)
      const balance = await XdacTokenInstance.balanceOf(address)
      xdac_balance = balance / ether(1);
   }
    return {'address': address, 'eth': eth_balance, 'xdac': xdac_balance, 'whitelisted': whitelisted }
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
