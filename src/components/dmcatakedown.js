import React from 'react';

const boxstyle = {
    height: "85vh",
    width: "calc(100% - 2em)",
    margin: "1em",
    borderRadius: "20px",
    background: "rgba(56, 56, 56, 0.356)",
    color:"#ffffff",
  }


function DMCATakedown(){
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
                    <p>The procedure for logging a DMCA notice is as follows:</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <p>Type of Request:         Date of Request</p>
                    <select name="reqType" id="reqType">
                        <option value="" disabled selected>Select a Request Type</option>
                        <option value="Takedown Request">Takedown Request</option>
                        <option value="Infringement Notice">Infringement Notice</option>
                        <option value="Dispute Claim">Dispute Claim</option>
                    </select>

                    <input type="date" id="date" style={{marginLeft: "50px"}}></input>
                </div>
            </div>
        </div>
    </body>
    </>
)
}

export default DMCATakedown;