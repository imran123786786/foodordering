import Stripe from "stripe";
const stripe = new Stripe("sk_test_51O4QsSSAT443RgpSkmEfkvTm8PmgoA668fBo9Kw9MbLNU0hY7mm6Vtqpvae2BcjKQNuN2CACL8yZNa2pvjCgYYr400THbwxYm8");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Validate req.body (ensure it's an array and contains valid data) 
            if (!Array.isArray(req.body)) {
                throw new Error('Invalid data format');
            }

            const params = {
                submit_type: 'pay',
                mode: "payment",
                payment_method_types: ['card'],
                line_items: req.body.map((item) => {
                    // Validate item properties here if necessary
                    if (!item.name || !item.price || !item.quantity || !item.image || !item.image.asset || !item.image.asset._ref) {
                        throw new Error('Invalid item data format');
                    }

                    const img = item.image.asset._ref;
                    const newImages = img.replace(
                        "image-",
                        "https://cdn.sanity.io/images/tzcbx44q/production/"
                    ).replace('-jpg', '.jpg');

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImages],
                            },
                            unit_amount: item.price * 100
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/cart`
            };

            const session = await stripe.checkout.sessions.create(params);
            console.log(session);
            res.status(200).json(session);
        } catch (error) {
            console.error("Error creating checkout session:", error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
