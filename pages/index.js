import {useEffect} from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "../components/banner";
import Card from "../components/card";

import useTrackLocation from "../hooks/use-track-location";
import {fetchCoffeeStores} from "../lib/coffee-stores";
import styles from "../styles/Home.module.css";

export async function getStaticProps(context) {

    const coffeeStores = await fetchCoffeeStores();

    return {
        props: {
            coffeeStores,
        }, // will be passed to the page component as props
    };
}

const Home = (props) => {

    const {handleTrackLocation, latLong, locationErrorMsg, isFindingLocation} =
        useTrackLocation();

    console.log({latLong, locationErrorMsg});

    useEffect(() => {
        setCoffeeStoresByLocation();
    }, [latLong]);

    async function setCoffeeStoresByLocation() {
        if (latLong) {
            try {
                const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 6);
                console.log({fetchedCoffeeStores});
                //set coffee stores
            } catch (error) {
                //set error
                console.log("Error", {error});
            }
        }
    }

    const handleOnBannerBtnClick = () => {
        handleTrackLocation();
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <Banner
                    buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
                    handleOnClick={handleOnBannerBtnClick}
                />
                {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}

                <div className={styles.heroImage}>
                    <Image src="/static/hero-image.png" width={700} height={400}/>
                </div>
                <div className={styles.sectionWrapper}>
                    {props.coffeeStores.length > 0 && (
                        <>
                            <h2 className={styles.heading2}>Toronto stores</h2>
                            <div className={styles.cardLayout}>
                                {props.coffeeStores.map((coffeeStore) => {
                                    return (
                                        <Card
                                            key={coffeeStore.id}
                                            name={coffeeStore.name}
                                            imgUrl={
                                                coffeeStore.imgUrl || ""
                                            }
                                            href={`/coffee-store/${coffeeStore.id}`}
                                            className={styles.card}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home