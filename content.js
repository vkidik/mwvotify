class MWVotify{
    constructor(){
        this.token = ''

        this.checkLogin()
    }

    checkLogin(){
        chrome.storage.local.get(["token"]).then(async tokenResult => {
            await (()=> {
                if(tokenResult.token != ""){
                    this.token = tokenResult.token
                } else{
                    while(this.token == ''){
                        this.token = prompt("Enter API from your account")
                    }
                }
            })()

            await this.getData(this.token)
        })
    }

    async getData(token){
        await chrome.storage.local.set({ token: token }).then(() => {
            console.log("Token is set");
        });
        
        this.musicPlayer(token)
    }

    musicPlayer(token){
        window.onSpotifyWebPlaybackSDKReady = () => {
            window.player = new Spotify.Player({
                name: 'KOMP Player',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
          
            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });
          
            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
          
            player.addListener('initialization_error', ({ message }) => {
                console.error(message);
            });
          
            player.addListener('authentication_error', ({ message }) => {
                console.error(message);
            });
          
            player.addListener('account_error', ({ message }) => {
                console.error(message);
            });
          
            document.getElementById('togglePlay').onclick = function() {
              player.togglePlay();
            };
          
            player.connect();
          }
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    window.MWVotify = new MWVotify()
})