import { useState, useEffect } from 'react'
import './styles.css'
import { InputNumber, Select } from "antd";
import "antd/dist/antd.css";
import axios from 'axios'

const { Option } = Select;

function Container() {
    const [paragraph, setParagraph] = useState("")
    const [num, setNum] = useState(1)
    const [loading,setLoading] = useState(false)
    const [html,setHtml] = useState("text")
    const [status, setStatus] = useState("first")
    
    const getParagraph =async (e) => {
        setNum(e)
        setLoading(true)
        await axios.get(`https://baconipsum.com/api/?type=all-meat&paras=${e}&format=${html}`).then(res => setParagraph(res.data))
        setLoading(false)
       
    }

    useEffect(async ()=> {
        if (status === "first") {
            setLoading(true)
            await axios.get(`https://baconipsum.com/api/?type=all-meat&paras=${num}&format=${html}`).then(res => setParagraph(res.data))
            setLoading(false)
            setStatus("second")
        }
    },[])


    const setText =() => {
        if (num === 0){
            return "Increase Number"
        }else if (loading){
            return "Loading..."
        }else{
            return paragraph
        }
    }

    return (
        <>
            <div className="container">
                <h1 style={{color:'white', marginTop:'0', paddingTop:'4vh'}} className="header">React sample text generator app</h1>
                <hr style={{color:'white'}} />

                <span style={{float:'left'}}>
                    <span className="p-text">Paragraphs</span>
                    <span style={{display:"block"}}>
                        <InputNumber value={num} onChange={getParagraph} style={{width:"200px", float:"left"}} min={1} max={25} />
                    </span>
                </span>

                <span style={{float:'left', marginLeft:"50px"}}>
                    <span className="p-text">Include HTML</span>
                    <span style={{display:"block"}}>
                        <Select value={html} onChange={(e)=> setHtml(e)} defaultValue="text" style={{ marginLeft:'-36px'}}>
                            <Option value="html">Yes</Option>
                            <Option value="text">No</Option>
                        </Select>
                    </span>
                </span>

                <div className="textholder">
                    {setText()}
                </div>
            </div>
        </>
    )
}

export default Container
