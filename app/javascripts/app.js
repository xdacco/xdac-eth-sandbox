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
    var _wallet = "0x315F5Ea9f407e386b45796856012c0e07068C18a";
    const _roundGoals = [
      ether(5),
      ether(10),
      ether(15),
      ether(20),
      ether(25)
    ]

    const _roundRates = [
      new BigNumber(12500),
      new BigNumber(12000),
      new BigNumber(11500),
      new BigNumber(11000),
      new BigNumber(10500)
    ]

    const _minContribution = 0.001

    var xdactokencrowdsaleContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contributors","outputs":[{"name":"eth","type":"uint256"},{"name":"whitelisted","type":"bool"},{"name":"created","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributors","type":"address[]"}],"name":"whitelistAddresses","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"whitelistAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"refundTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contributor","type":"address"}],"name":"refundTokensForAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokenAmount","type":"uint256"}],"name":"getEthAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAddresses","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_contributor","type":"address"}],"name":"getContributorValues","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_weiAmount","type":"uint256"}],"name":"getTokenAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"addresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiDelivered","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_wallet","type":"address"},{"name":"_roundGoals","type":"uint256[]"},{"name":"_roundRates","type":"uint256[]"},{"name":"_minContribution","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"curRound","type":"uint256"},{"indexed":false,"name":"weiDelivered","type":"uint256"},{"indexed":false,"name":"weiAmount","type":"uint256"},{"indexed":false,"name":"calculatedTokenAmount","type":"uint256"}],"name":"TokenCalculate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"x","type":"bool"}],"name":"Test","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"}]);
    var xdactokencrowdsale = xdactokencrowdsaleContract.new(
      _wallet,
      _roundGoals,
      _roundRates,
      _minContribution,
      {
        from: web3.eth.accounts[0],
        data: '0x606060405234156200001057600080fd5b604051620032f8380380620032f8833981016040528080519060200190919080518201919060200180518201919060200180519060200190919050508160008151811015156200005c57fe5b90602001906020020151846200007162000243565b604051809103906000f08015156200008857600080fd5b6000831115156200009857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614151515620000d557600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200011257600080fd5b8260028190555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060058251141515620001ef57600080fd5b600583511415156200020057600080fd5b82600590805190602001906200021892919062000254565b5081600690805190602001906200023192919062000254565b508060078190555050505050620002ce565b6040516117d38062001b2583390190565b82805482825590600052602060002090810192821562000293579160200282015b828111156200029257825182559160200191906001019062000275565b5b509050620002a29190620002a6565b5090565b620002cb91905b80821115620002c7576000816000905550600101620002ad565b5090565b90565b61184780620002de6000396000f300606060405260043610610128576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631f6d49421461013357806321df0da7146101965780632bf04304146101eb5780632c4e722e146102455780634042b66f1461026e5780634156658514610297578063521eb273146102d057806371007509146103255780638aabe7001461033a5780638d8f2adb146103735780638da5cb5b146103885780638fc7a25d146103dd578063a32bf59714610414578063a39fac121461043d578063be4aa19c146104a7578063c2507ac1146104ff578063ec8ac4d814610536578063edf26d9b14610564578063f2fde38b146105c7578063f7fb07b014610600578063fc0c546a14610629578063fc12dfc71461067e575b610131336106a7565b005b341561013e57600080fd5b61016a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610775565b604051808481526020018315151515815260200182151515158152602001935050505060405180910390f35b34156101a157600080fd5b6101a96107b9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101f657600080fd5b6102436004808035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919050506107e2565b005b341561025057600080fd5b61025861087f565b6040518082815260200191505060405180910390f35b341561027957600080fd5b610281610885565b6040518082815260200191505060405180910390f35b34156102a257600080fd5b6102ce600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061088b565b005b34156102db57600080fd5b6102e36108f3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561033057600080fd5b610338610919565b005b341561034557600080fd5b610371600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610924565b005b341561037e57600080fd5b61038661098c565b005b341561039357600080fd5b61039b610997565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103e857600080fd5b6103fe60048080359060200190919050506109bd565b6040518082815260200191505060405180910390f35b341561041f57600080fd5b610427610b75565b6040518082815260200191505060405180910390f35b341561044857600080fd5b610450610bc4565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b83811015610493578082015181840152602081019050610478565b505050509050019250505060405180910390f35b34156104b257600080fd5b6104de600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c58565b60405180838152602001821515151581526020019250505060405180910390f35b341561050a57600080fd5b6105206004808035906020019091905050610d0a565b6040518082815260200191505060405180910390f35b610562600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106a7565b005b341561056f57600080fd5b6105856004808035906020019091905050610d1c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156105d257600080fd5b6105fe600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610d5b565b005b341561060b57600080fd5b610613610eb3565b6040518082815260200191505060405180910390f35b341561063457600080fd5b61063c610edc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561068957600080fd5b610691610f01565b6040518082815260200191505060405180910390f35b6000803491506106b78383610f07565b6106c082610f63565b90506106d78260035461111290919063ffffffff16565b6003819055506106e78382611130565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad188484604051808381526020018281526020019250505060405180910390a361075e8383611236565b61076661123a565b61077083836112e6565b505050565b60086020528060005260406000206000915090508060000154908060010160009054906101000a900460ff16908060010160019054906101000a900460ff16905083565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561084057600080fd5b600090505b815181101561087b5761086e828281518110151561085f57fe5b906020019060200201516112ea565b8080600101915050610845565b5050565b60025481565b60035481565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108e757600080fd5b6108f0816112ea565b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61092233611404565b565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098057600080fd5b61098981611404565b50565b610995336114c8565b565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806000806000806109ce610b75565b94506000935060009250600a5491508690505b6005851015610b68576005858154811015156109f957fe5b906000526020600020900154610a44610a35600688815481101515610a1a57fe5b906000526020600020900154846115f290919063ffffffff16565b8461111290919063ffffffff16565b1115610b1557610a7782600587815481101515610a5d57fe5b90600052602060002090015461160d90919063ffffffff16565b9250610a8c838361111290919063ffffffff16565b9150610acd610abe600687815481101515610aa357fe5b906000526020600020900154856115f290919063ffffffff16565b8261160d90919063ffffffff16565b9050610b0e610aff600687815481101515610ae457fe5b906000526020600020900154836115f290919063ffffffff16565b8561111290919063ffffffff16565b9350610b5b565b610b54610b45600687815481101515610b2a57fe5b906000526020600020900154836115f290919063ffffffff16565b8561111290919063ffffffff16565b9350610b68565b84806001019550506109e1565b8395505050505050919050565b600080600090505b6005811015610bbf57600581815481101515610b9557fe5b906000526020600020900154600a541015610bb257809150610bc0565b8080600101915050610b7d565b5b5090565b610bcc611790565b6009805480602002602001604051908101604052809291908181526020018280548015610c4e57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610c04575b5050505050905090565b600080610c636117a4565b6000600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060606040519081016040529081600082015481526020016001820160009054906101000a900460ff161515151581526020016001820160019054906101000a900460ff161515151581525050915081602001519050816000015181935093505050915091565b6000610d1582610f63565b9050919050565b600981815481101515610d2b57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610db757600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610df357600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006006610ebf610b75565b815481101515610ecb57fe5b906000526020600020900154905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a5481565b60075481111515610f1757600080fd5b60056004815481101515610f2757fe5b906000526020600020900154610f4882600a5461111290919063ffffffff16565b11151515610f5557600080fd5b610f5f8282611626565b5050565b600080600080600080610f74610b75565b94506000935060009250600a5491508690505b600585101561110557600585815481101515610f9f57fe5b906000526020600020900154610fbe828461111290919063ffffffff16565b111561106357610ff182600587815481101515610fd757fe5b90600052602060002090015461160d90919063ffffffff16565b9250611006838361111290919063ffffffff16565b915061101b838261160d90919063ffffffff16565b905061105c61104d60068781548110151561103257fe5b9060005260206000209001548561167690919063ffffffff16565b8561111290919063ffffffff16565b93506110a9565b6110a261109360068781548110151561107857fe5b9060005260206000209001548361167690919063ffffffff16565b8561111290919063ffffffff16565b9350611105565b7fb2688fbd8a09d5da0128329177088b492a5f18e777099b260caf53c2889d8aa5858383876040518085815260200184815260200183815260200182815260200194505050505060405180910390a18480600101955050610f87565b8395505050505050919050565b600080828401905083811015151561112657fe5b8091505092915050565b6000600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061118a34826000015461111290919063ffffffff16565b8160000181905550600015158160010160019054906101000a900460ff16151514156112315760018160010160016101000a81548160ff021916908315150217905550600980548060010182816111e191906117ca565b9160005260206000209001600085909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b505050565b5050565b6112426117a4565b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060606040519081016040529081600082015481526020016001820160009054906101000a900460ff161515151581526020016001820160019054906101000a900460ff16151515158152505090508060200151156112e3576112e2336114c8565b5b50565b5050565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060018160010160006101000a81548160ff021916908315150217905550600015158160010160019054906101000a900460ff16151514156113e95760018160010160016101000a81548160ff0219169083151502179055506009805480600101828161139991906117ca565b9160005260206000209001600084909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505b600081600001541115611400576113ff826114c8565b5b5050565b600080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160000154905060008111151561145e57600080fd5b6000826000018190555061147d8160035461160d90919063ffffffff16565b6003819055508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156114c357600080fd5b505050565b6000806000600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002092508260000154915061151e82610f63565b905060008111151561152f57600080fd5b60008211151561153e57600080fd5b8260010160009054906101000a900460ff16151561155b57600080fd5b6000836000018190555061157a82600a5461111290919063ffffffff16565b600a81905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015156115e257600080fd5b6115ec84826116b1565b50505050565b600080828481151561160057fe5b0490508091505092915050565b600082821115151561161b57fe5b818303905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561166257600080fd5b6000811415151561167257600080fd5b5050565b600080600084141561168b57600091506116aa565b828402905082848281151561169c57fe5b041415156116a657fe5b8091505b5092915050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b151561177457600080fd5b5af1151561178157600080fd5b50505060405180519050505050565b602060405190810160405280600081525090565b606060405190810160405280600081526020016000151581526020016000151581525090565b8154818355818115116117f1578183600052602060002091820191016117f091906117f6565b5b505050565b61181891905b808211156118145760008160009055506001016117fc565b5090565b905600a165627a7a7230582097142cd709a878c60fbc08fba5640116133448ed6921eebec18ce69adfe4d8f0002960606040526040805190810160405280600981526020017f5844414320434f494e00000000000000000000000000000000000000000000008152506004908051906020019062000051929190620001fa565b506040805190810160405280600481526020017f5844414300000000000000000000000000000000000000000000000000000000815250600590805190602001906200009f929190620001fa565b506012600660006101000a81548160ff021916908360ff1602179055503415620000c857600080fd5b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600660009054906101000a900460ff1660ff16600a0a633b9aca0002600181905550600660009054906101000a900460ff1660ff16600a0a633b9aca00026000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1660007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef600660009054906101000a900460ff1660ff16600a0a633b9aca00026040518082815260200191505060405180910390a3620002a9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200023d57805160ff19168380011785556200026e565b828001600101855582156200026e579182015b828111156200026d57825182559160200191906001019062000250565b5b5090506200027d919062000281565b5090565b620002a691905b80821115620002a257600081600090555060010162000288565b5090565b90565b61151a80620002b96000396000f3006060604052600436106100d0576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100d5578063095ea7b31461016357806318160ddd146101bd57806323b872dd146101e65780632ff2e9dc1461025f578063313ce5671461028857806366188463146102b757806370a08231146103115780638da5cb5b1461035e57806395d89b41146103b3578063a9059cbb14610441578063d73dd6231461049b578063dd62ed3e146104f5578063f2fde38b14610561575b600080fd5b34156100e057600080fd5b6100e861059a565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561012857808201518184015260208101905061010d565b50505050905090810190601f1680156101555780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016e57600080fd5b6101a3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610638565b604051808215151515815260200191505060405180910390f35b34156101c857600080fd5b6101d061072a565b6040518082815260200191505060405180910390f35b34156101f157600080fd5b610245600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610734565b604051808215151515815260200191505060405180910390f35b341561026a57600080fd5b610272610aee565b6040518082815260200191505060405180910390f35b341561029357600080fd5b61029b610b0d565b604051808260ff1660ff16815260200191505060405180910390f35b34156102c257600080fd5b6102f7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610b20565b604051808215151515815260200191505060405180910390f35b341561031c57600080fd5b610348600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610db1565b6040518082815260200191505060405180910390f35b341561036957600080fd5b610371610df9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103be57600080fd5b6103c6610e1f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104065780820151818401526020810190506103eb565b50505050905090810190601f1680156104335780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561044c57600080fd5b610481600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610ebd565b604051808215151515815260200191505060405180910390f35b34156104a657600080fd5b6104db600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506110dc565b604051808215151515815260200191505060405180910390f35b341561050057600080fd5b61054b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506112d8565b6040518082815260200191505060405180910390f35b341561056c57600080fd5b610598600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061135f565b005b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106305780601f1061060557610100808354040283529160200191610630565b820191906000526020600020905b81548152906001019060200180831161061357829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561077157600080fd5b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107be57600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561084957600080fd5b61089a826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114b790919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061092d826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114d090919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506109fe82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114b790919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b600660009054906101000a900460ff1660ff16600a0a633b9aca000281565b600660009054906101000a900460ff1681565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905080831115610c31576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cc5565b610c4483826114b790919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610eb55780601f10610e8a57610100808354040283529160200191610eb5565b820191906000526020600020905b815481529060010190602001808311610e9857829003601f168201915b505050505081565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614151515610efa57600080fd5b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610f4757600080fd5b610f98826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114b790919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061102b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114d090919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600061116d82600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546114d090919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156113bb57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156113f757600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008282111515156114c557fe5b818303905092915050565b60008082840190508381101515156114e457fe5b80915050929150505600a165627a7a72305820ff2edca868273f2cc07116bc596f52f8d88f62ee0b033c6a375678022fef53e00029',
        gas: '4700000'
      }, function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
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
      const contributorValues = await XdacTokenCrowdsaleInstance.getContributorValues(address, { from: account })
      eth_balance = contributorValues[0].valueOf() / ether(1);
      whitelisted = contributorValues[1].valueOf();
      const token = await XdacTokenCrowdsaleInstance.getToken({ from: account })
      const XdacTokenInstance = await XdacToken.at(token)
      const balance = await XdacTokenInstance.balanceOf(address, { from: account })
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
