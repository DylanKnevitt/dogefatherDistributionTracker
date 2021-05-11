const baseUrl = "https://api.bscscan.com/api?";
const apiKey = "VJF78CF8DEGX5A15GKNYQEKK14M33ZMTUF";
const dogeFatherAddress = "0x3d29aa78fb558f84112bbc48a84f371147a920c9";

  async function getWalletTotal(walletAddress){
     return await $.ajax({
        url: baseUrl,
        type: "get", //send it through get method
        data: { 
          module: "account", 
          action: "tokenbalance", 
          address: walletAddress,
          tag: "latest",
          contractaddress: dogeFatherAddress,
          apiKey: apiKey
        },
        success: function(response) {
          //Do Something
          console.log(response.result);
          return response.result;

        },
        error: function(xhr) {
          //Do Something to handle error
        }
      });
}

async function gwt(tokenIn,tokenOut,walletAddress){
        let walletTotalAsync = await getWalletTotal(walletAddress);
        let walletTotal = walletTotalAsync.result;
        let distributedTotal = walletTotal  - (tokenIn - tokenOut);
        
        $("#txtWalletTotal").val(walletTotal);
        $("#txtTokenIn").val(tokenIn);
        $("#txtTokenOut").val(tokenOut);
        $("#txtDistributedTotal").val(distributedTotal);

}

function getTxns(walletAddress){

    
    $.ajax({
        url: baseUrl,
        type: "get", //send it through get method
        data: { 
          module: "account", 
          action: "tokentx", 
          address: walletAddress,
          apikey: apiKey,
          startblock: 0,
          endblock: 99999999999999,
          sort: "desc",
          contractaddress: dogeFatherAddress
        },
        success: function(response) {
          //Do Something
          let result = response.result;
          let result1 = result;
          let tokenIn = result.filter( x => 
            { return x.to == walletAddress})
            .reduce((total,x) => {
                return total + Number(x.value);},0);

           let tokenOut = result1.filter( x => 
            { return x.from == walletAddress})
            .reduce((total,x) => {
                return total + Number(x.value);},0);

            gwt(tokenIn,tokenOut,walletAddress);
            
     
        },
        error: function(xhr) {
          //Do Something to handle error
        }
      });
}
