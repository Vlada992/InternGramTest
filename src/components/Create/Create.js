import React from "react";
import '../Create/Create.css';


const Create = (props) => {
    let placeholderTitle = `Add ${props.placeholder} title`;
    let placeholderUrl =   `Add ${props.placeholder} url`;
 
  return (
    <>
      <div className="col-lg-12">
        <div className='cont-div'>

            <div className='create-btn-cont'>
                <button onClick={props.createBtn} className='create-btn'>Create new post</button>
            </div>

            {props.createTypeDiv ? <div className='create-type-cont'>
             <button value='Image' onClick={props.createInp}>IMAGE</button>
             <button value='Video' onClick={props.createInp}>VIDEO</button>
             <button value='Link' onClick={props.createInp}>LINK</button>
            </div> : null }

            {props.createInpDiv ? <div>
                <input type='text' name='inpValTitle' onChange={(e) => props.takeInpVal(e)} value={props.inpValTitle}  placeholder={placeholderTitle}/>
                <input type='text' name='inpValUrl' onChange={(e) => props.takeInpVal(e)} value={props.inpValUrl} placeholder={placeholderUrl}/>
                <button  onClick={props.createPost}>Create!</button>

           </div> : null}



        </div>
      </div>
    </>
  );
}



export default Create;

