import { builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init(YOUR_API_KEY);

export async function getStaticProps({ params }) {
    const productDetails = await builder.get('product-details', {
        query: {
            // Query product details by its handle field
            'data.handle': params.product
        }
    }).promise();

    return {
        props: {
            productDetails: productDetails || null,
        },
        // Show a 404 page if no product is found
        notFound: !productDetails,
        revalidate: 5,
    };
}

export default function Home({ productDetails }) {
    return (
        <>
            <YourHeader />
            <ProductDetails product={productDetails} />
        </>
    );
}