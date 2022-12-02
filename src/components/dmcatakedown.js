import React, { useState, useEffect } from "react";
import { findAllInRenderedTree } from "react-dom/test-utils";
import WorkDoc from '../assets/Workflow_Documentation.docx';

const boxstyle = {
    height: "85vh",
    width: "calc(100% - 2em)",
    margin: "1em",
    borderRadius: "20px",
    background: "rgba(56, 56, 56, 0.356)",
    color:"#ffffff",
  }

  
function DMCATakedown(){

    const [playlists, setPlaylists] = useState([]);

    useEffect(async () => {
        const playlistget = await fetch("/api/playlists");
        if (playlistget.ok) {
          const data = await playlistget.json();
          setPlaylists(data);
        }
    }, []);
    
    var List = []
    List = playlists.map(function(element){
        return ({value: element.playlist_name, id: element._id});
    })

    const reviewSel = document.getElementById("reviewSel");
    for(let i =0; i<List.length;i++){
        reviewSel.options[reviewSel.options.length] = new Option(List[i].value, i);
    }

    async function submit(){
        const reqPlaylist = document.getElementById("reviewSel").options[document.getElementById("reviewSel").selectedIndex].text;
        for(let i=0; i<List.length;i++){
            if(reqPlaylist == List[i].value){
                const playobj=List[i];
            }
        }


        const reqDate = document.getElementById("date".value)
        const reqType = document.getElementById("reqType".value)
        const reqObj = {reqType, reqDate}

        // await fetch(`/api/playlists/${playobj.id}`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         request: 
                
        //     }),
        //   });
        // setPlaylists();
    }

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
            <div style={boxstyle}>
                <div style={{margin: "20px"}}>
                    <p>For an intuitive document illustrating the procedures and administrative tools available, click the link below.</p>
                    <a href = {WorkDoc} target = "_blank">DMCA Takedown Workflow Document</a>
                    <p>To find the current DMCA Policy, click <a href="/dmcapolicy">here</a>.</p>
                    <br></br>
                    <br></br>
                    
                    <p>Type of Request:&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;Date of Request:&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;Review:</p>
                    <select name="reqType" id="reqType">
                        <option value="" disabled selected>Select a Request Type</option>
                        <option value="Takedown Request">Takedown Request</option>
                        <option value="Infringement Notice">Infringement Notice</option>
                        <option value="Dispute Claim">Dispute Claim</option>
                    </select>

                    <input type="date" id="date" style={{marginLeft: "50px", width: "130px"}}></input>

                    <select name="reviewSel" id="reviewSel" style={{marginLeft: "50px", width: "250px"}}>
                        <option value="" disabled selected>Select a Review</option>
                    </select>

                    <p>
                    <input type="submit" value="Submit Request" onClick={submit}></input>
                    </p>

                </div>
            </div>
        </div>
    </body>
    </>
)
}

export default DMCATakedown;