import { useState } from "react"

const AddPreparation=()=>{
    const [fromData,setFormData]=useState({
        topic:"",
        level:"Beginner",
        confidence:1,
        notes:""
    });

    return (
        <form>
            <input name="topic" placeholder="Topic" onChange={handleChange}/>
            <select name="level" onChange={handleChange}>
                 <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
            </select>
        </form>
    )
}