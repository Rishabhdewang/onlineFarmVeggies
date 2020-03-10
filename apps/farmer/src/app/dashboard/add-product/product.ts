export class Product {
    productName : string
    productCategory : string
    productPrices : Prices[]
    productQuantity : number
    productAbout : string
    productBenefits : string
    productStorageAndUsage : string
    productOtherInfo : OtherInfo[]
}

export class Prices {
    quantity : number
    rate : number
}

export class OtherInfo {
    eanCode : number
    bestBefore : string
    sourcedAndMarketed : string
}