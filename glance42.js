import axios from "axios";

(async () => {
    const type = "client_credentials";
    const id = "38f5852b05cacce9343e7eccb55b89bddbe0f10dcf5b3470196d1f69c73b616e";
    const secret = "9f08e5f875f1b31a70737dc94e0adc9f8fe49b9d230c9362e6635bbb5a2f7d76";

    function getAccessToken(type, id, secret) {
        return new Promise(async (resolve, reject) => {
            const reqData = await axios({
                url: "https://api.intra.42.fr/oauth/token",
                method: "post",
                data: {
                    grant_type: type,
                    client_id: id,
                    client_secret: secret,
                },
            });
            const accessToken = reqData.data.access_token;

            resolve(accessToken);
        });
    }

    async function getLocationData(accessToken, userName) {
        const reqData = await axios.get(`https://api.intra.42.fr/v2/users/${userName}/locations`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                filter : {}
            },
        });

        console.log(reqData);
    }

    const accessToken = await getAccessToken(type, id, secret);
    const locationData = await getLocationData(accessToken, "jgo");

    console.log(locationData);
})();
