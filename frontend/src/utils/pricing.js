export const getPrice = (product, amount=1) => {
      let packSize = 0;
      let amountOfPacks = 0;
      let amountOfUnits = 0;
      if(product !== "letras") {
            packSize = pricingTable[product].packAmount;
            amountOfPacks = Math.trunc(amount/packSize);
            amountOfUnits = amount - (packSize*amountOfPacks);
      }

      switch(product) {
            case "sameSize":
                  return (amountOfUnits*pricingTable[product].unit + amountOfPacks*pricingTable[product].pack);
            case "additionalPhrase":
                  return (amount*pricingTable[product].unit);
            case "delivery":
                  return (pricingTable[product][amount]);
            case "letras":
                  return 99;
            default: 
                  return 0;
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
      },
      "delivery": {
            "gratis": 0,
            "express": 14
      }
}
