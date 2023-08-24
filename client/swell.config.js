if (!"psl-test-store") {
    throw new Error('Missing required environment variable SWELL_STORE_ID')
}
if (!"pk_By1MsSwBSiM1eFL4HPR8IWkRpO9N9m2C") {
    throw new Error(
        'Missing required environment variable SWELL_PUBLIC_KEY'
    )
}

export default {
    storeId: "psl-test-store",
    publicKey: "pk_By1MsSwBSiM1eFL4HPR8IWkRpO9N9m2C",
}
