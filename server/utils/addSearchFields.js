const swell = require('swell-node')
swell.init('psl-test-store', 'sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy');

const addSearchFields = async () => {
    return await swell.put('/:models/products', {
        id: 'default',
        fields: [
            'name',
            'slug',
            'sku',
            'attributes',
            'attributes.boat_model.value',
            'attributes.boat_make.value'
        ],
    })
}

addSearchFields().then((data) => {
    console.log(data)
})