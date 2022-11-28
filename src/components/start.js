import React from 'react';
import '../App.css';

function Start(){
    return(
        <>
            <body>
                <div class="accent">
                    <div class="title">
                        SE3316 Lab 4 
                    </div>
                </div>
                <div class="box">
                    <div class="start-box">
                        <div style={{order:"1",width:"100%"}}>
                            <span style = {{textAlign:"center"}}>
                                This interactive web app allows you to create, view, and share various playlists created by users around the world!
                            </span>
                        </div>
                        <div style={{order:"2",width:"100%"}}>
                            <a href="/auth"><input class="button"id="login"type="button"value="Login"/></a>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Start;