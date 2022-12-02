import React from 'react';
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
                    <input type="submit" value="Submit Request"></input>
                    </p>

                </div>
            </div>
        </div>
    </body>
    </>
)
}

export default DMCATakedown;