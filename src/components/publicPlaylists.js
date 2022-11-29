import React from 'react';
import '../App.css';

function Public(){
    return(
        <>
            <body>
                <div class="accent">
                    <a href = "/">
                        <div class="title">
                            SE3316 Lab 4
                        </div>
                    </a> 
                    <div class="getGenreButton">
                        <a href = "/auth"><input class="button"id="getGenres" type="button"value="Log In"/></a>
                    </div>
                </div>
                <div class="box">
                    <div class="start-box">
                        
                    </div>
                </div>
            </body>
        </>
    );
}

export default Public;