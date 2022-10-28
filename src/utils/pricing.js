export const getPrice = (product, amount) => {
      const packSize = pricingTable[product].packAmount;
      const amountOfPacks = Math.trunc(amount/packSize);
      const amountOfUnits = amount - (packSize*amountOfPacks);
      
      switch(product) {
            case "sameSize":
                  return (amountOfUnits*pricingTable[product].unit + amountOfPacks*pricingTable[product].pack);
            case "additionalPhrase":
                  return (amount*pricingTable[product].unit);
            default: 
                  return (0);
      }
}

const pricingTable = {
      "sameSize": {
            "packAmount": 3,
            "unit": 20,
            "pack": 79,
      },
      "additionalPhrase": {
            "unit": 19
      }
}
