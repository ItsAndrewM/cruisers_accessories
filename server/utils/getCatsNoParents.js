const swell = require('swell-node')
swell.init('psl-test-store', 'sk_drvQHk5KZy6w0BF55jyArsdojvJ3AxVy');

const getCatsNoParents = async () => {
    return await swell.get('/categories', {
        where: {
            $and: [
                { active: true },
                { parent_id: 'null' }
            ]
        },
        sort: 'name asc',
        limit: 100,
        page: 1,
    });

}

// getCatsNoParents().then((data) => {
//     console.log(data)
// })