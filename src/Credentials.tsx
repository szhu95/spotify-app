
const Credentials = () => {

    return {
        ClientId: 'f075bf24332845daa1836ba0abc9ae06',
        ClientSecret: 'fb3002ff88e44cf39ded14d70036849a',
        SpotifyAuthorizeEndpoint: 'https://accounts.spotify.com/authorize',
        RedirectUrlAfterLogin: 'http://spotify-dj-app-bucket.s3-website-us-east-1.amazonaws.com/'
    }
}

export { Credentials };