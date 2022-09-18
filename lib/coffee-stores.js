const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = () => {
    return [
        "https://api.lorem.space/image/drink?w=150&h=150&hash=8B7BCDC2",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=500B67FB",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=A89D0DE6",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=225E6693",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=9D9539E7",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=BDC01094",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=7F5AE56A",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=4F32C4CF",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=B0E33EF4",
        "https://api.lorem.space/image/drink?w=150&h=150&hash=2D297A22",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=8B7BCDC2",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=500B67FB",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=A89D0DE6",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=225E6693",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=9D9539E7",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=BDC01094",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=7F5AE56A",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=4F32C4CF",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=B0E33EF4",
        "https://api.lorem.space/image/burger?w=150&h=150&hash=2D297A22",
    ];
}

export const fetchCoffeeStores = async (
    latLong = "43.653833032607096%2C-79.37896808855945",
    limit = 6
) => {

    const photos = await getListOfCoffeeStorePhotos();

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
    };

    const response = await fetch(
        getUrlForCoffeeStores(latLong, "coffee", limit),
        options
    );
    const data = await response.json();

    return data.results.map((result, index) => {
        const neighborhood = result.location.neighborhood;
        return {
            ...result,
            id: result.fsq_id,
            address: result.location.address,
            name: result.name,
            neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
            imgUrl: photos.length > 0 ? photos[index] : null,
        };
    });
};