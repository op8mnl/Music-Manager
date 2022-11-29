import React from 'react';
import '../App.css';

function Start(){
    return(
        <>
            <body>
                <div class="accent">
                    <a href = "/">
                        <div class="title">
                            SE3316 Lab 4
                        </div>
                    </a> 
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
                            <a href="/public"><input class="button"id="site"type="button"value="Go To Site >>>"/></a>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default Start;