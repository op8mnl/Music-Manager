import React, { useState, useEffect } from "react";

function AUP(){

    const [policy, setPolicy] = useState({});
    const [show, setShow] = useState(false);

    useEffect(async () => {
    const policyget = await fetch("/api/aup");
    if (policyget.ok) {
      const data = await policyget.json();
      setPolicy(data[0]);
    }
    }, []);
    
    const inputstyle = {
        width:"1200px",
        height:"200px",
        resize: "vertical",
        color: "black",
        backgroundColor: "white"
    }   

    function boxEnable(){
        document.getElementById("textArea").disabled = false;
        setShow(true);
    }

    
    async function submit(e){
        const text = document.getElementById("textArea").value;
        await fetch("/api/aup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                id: 1
            }),
          });
        setPolicy();
    }

    return(
        <>
        <div class="accent">
            <a href = "/">
                <div class="title">
                    SE3316 Lab 4
                </div>
            </a> 
        </div>
        <div style={{paddingTop: "70px", paddingLeft: "20px", paddingright: "20px",background:"black", color:"white"}}>{policy.policyText}</div>
        <form style={{paddingTop: "30px",paddingLeft: "20px", paddingright: "20px",background:"black", color:"white"}}>
            <textarea id="textArea" defaultValue={"Rewrite policy here...."} style={inputstyle} disabled></textarea>
            <br></br>
            <input type="button" value="Edit" onClick={boxEnable}></input>
            <div id="saveDiv">
            {show && <input type="button" value="Save" onClick={submit}></input>}
            </div>
        </form>
        </>
)
}

export default AUP;