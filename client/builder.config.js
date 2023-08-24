if (!"20988483cda74747b3e814c30d7ff832") {
    throw new Error('Missing env varialbe BUILDER_PUBLIC_KEY')
}

export default {
    apiKey: "20988483cda74747b3e814c30d7ff832",
    productsModel: 'swell-product',
    collectionsModel: 'swell-collection',
    isDemo: false,
}
