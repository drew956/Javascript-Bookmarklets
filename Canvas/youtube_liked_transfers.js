/* 
  This is a Javscript Snippet meant to be run in the Console. 
  What it does is it saves all the videos in a playlist to the playlist named "MyMix Public"
  This is because Youtube forces your liked playlist to be private, so to share your likes with friends 
  you have to create a new public playlist and manually add each video to your new playlist.
  This will do that for you. 
  It still takes forever, but you can just let it run. 
  It will automatically add each video in your playlist to your new one. 

  Just replace the "MyMix Public" below with the name of your new playlist. 
  This was tested in Google Chrome on Mac OS X. 
  You have to open the playlist in playlist view (so you have the list of videos on the right).
  It takes about 8 seconds per video, so you can estimate how long the entire list will take. 
  I am not sure if "Deleted" videos in your playlist will throw it off. 

  The last thing to mention is that normally you would call clearInterval(gogo); to stop it. 
  However, since we are running it from the Console it will be hard to type this in fast enough. 
  Once the program finishes adding all the videos close the tab/window to stop it. 
  I'll add a feature to auto-stop in a future version. 
*/

let select = $;
function saveVideo(){
    setTimeout( () =>{
        select("[aria-label='Save to playlist']").click();
        setTimeout( () =>{
            select("[aria-label='MyMix Public']").click()
            setTimeout( () =>{
                select("[icon=close]").click();
                setTimeout( () =>{
                    select(".ytp-next-button").click();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 300);
}

let gogo = setInterval(saveVideo, 8000);

