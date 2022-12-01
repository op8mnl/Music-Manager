import React, { useState, useEffect } from "react";

function PrivacyPolicy(){

    const [policy, setPolicy] = useState({});
    const [show, setShow] = useState(false);

    useEffect(async () => {
    const policyget = await fetch("/api/privacypolicy");
    if (policyget.ok) {
      const data = await policyget.json();
      setPolicy(data[0]);
    }
    }, []);
    
    const inputstyle = {
        width:"1200px",
        height:"200px",
        resize: "vertical"
    }    

    function boxEnable(){
        document.getElementById("textArea").disabled = false;
        setShow(true);
    }

    
    async function submit(e){
        const text = document.getElementById("textArea").value;
        await fetch("/api/privacypolicy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                id: 1
            }),
          });
        setPolicy();
        alert(policy);
    }

    return(
    <>
    <div style={{padding: "30px"}}>{policy.policyText}</div>

    <div style={{padding: "30px"}}>
        <form>
            <textarea id="textArea" defaultValue={"Rewrite policy here...."} style={inputstyle} disabled></textarea>
            <br></br>
            <input type="button" value="Edit" onClick={boxEnable}></input>
            <div id="saveDiv">
            {show && <input type="button" value="Save" onClick={submit}></input>}
            </div>
            
        </form>
    </div>
    </>
)
}

export default PrivacyPolicy;