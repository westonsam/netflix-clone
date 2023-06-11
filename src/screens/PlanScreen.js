import React, { useEffect, useState } from 'react'
import './PlanScreen.css';
import db from '../firebase-handler';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers').doc(user.uid).collection('subscriptions').get().then(querySnapshot => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    }, [user.uid]);


    useEffect(() => {
        // gets querySnapshots of active products from the database
        db.collection('products').where('active', "==", true).get().then(querySnapshot => {
            //passes the querySnapshot as a parameter
            //intitializes empty product object
            const products = {};
            //for each querySnapshot accesses data
            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();
                //creates a collection of prices (multiple possible)
                const priceSnap = await productDoc.ref.collection("prices").get();
                //for each price it gets the price id and data
                priceSnap.docs.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                });
            });
            setProducts(products);
        });
    }, []);

    console.log(products);
    console.log(subscription);

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers').doc(user.uid).collection("checkout_sessions").add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                //Show error to customer and inspect cloud function logs
                alert('An error occured: ${error.message}');
            }

            if (sessionId) {
                //Have a session, redrect to Checkout (init stripe)
                //publishable test key
                const stripe = await loadStripe("pk_test_51NHfaXIx0GsWJSH7oOm8aTV1XLHAhzJp3k4dFwuez8qQxZyBWoLYIc75MC0d7w9EANyrUyBtlgjkU39lQR4YBtMs00F2zxjk5D");
                stripe.redirectToCheckout({ sessionId });
                //test card number:
                //4242 4242 4242 4242 all entries random name and addy
            }
        });
    };

    return (
        <div className='planScreen'>
            <br />
            {subscription && <p>Renewal date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>}

            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

                return (
                    <div key={productId} className={`${
                        isCurrentPackage && "planScreen__plan--disabled"} planScreen__plan`}>
                        <div className='planScreen__info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() =>
                            !isCurrentPackage && loadCheckout(productData.prices.priceId)
                        }>
                            {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                        </button>
                    </div>
                );
            })}
        </div>
    )
}

export default PlanScreen