export class Product {
    productName : string
    productCategory : string
    productPrices : Prices[]
    productQuantity : number
    productDetail : ProductDetail[]
    
}

export class Prices {
    quantity : number
    rate : number
}

export class ProductDetail {
    productAbout : string
    productBenefits : string
    productStorageAndUsage : string
    otherProductInfo : OtherInfo[]
}

export class OtherInfo {
    eanCode : number
    bestBefore : string
    sourcedAndMarketed : string
}