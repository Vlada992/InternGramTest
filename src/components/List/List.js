import React, { useState, useEffect } from "react";
import '../List/List.css';




const List = props => {
  const [DataList, setDataList] = useState(props.loadedData.slice(0, 10));

  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return; //if state isFetching is false ( and thas true) return nothing, return from function
    fetchMoreListItems();
  }, [isFetching]);



  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  };



  function fetchMoreListItems() {
    setTimeout(() => {
      setDataList(prevState => [...prevState, ...props.loadedData.slice(0, 10)]); //problem here?

      setIsFetching(false);
    }, 2000);
  }



  let urlVideo = `https://www.youtube.com/embed/`;
  

  return (
    <>
      <ul className="list-group mb-2">
        {DataList.map(  (data, ind) => (
          <>
            
              <li key={data.id} className="list-group-item">
              <p className='li-text-class'><span>{data.title} </span>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-warning">Delete</button>
              </p>

                {data.type == "VIDEO" ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={urlVideo + data.meta.url.slice(32)}
                    target="_parent"
                  />
                ) : null}

                {data.type == 'IMAGE' ? (
                    <img alt="Smiley face" height="100%" width="100%" src={data.meta.url}/>
                ) : null}

                {data.type == 'LINK' ? (
                 <a href={data.meta.url}>Visit</a>   
                ): null}
              </li>

              
          </>
        ))  }
      </ul>
      {isFetching && "Fetching more list items..."}
    </>
  );
};



export default List;

//useEffect => SIMILAR TO componentDidMount in creation phase; //1) CONSTRUCTOR, 2) componentWillMount, 3) render 4) componentDidMount
//useEffect here, having second argument =? [] empty array is telling that i'ts same as componentDidMount
//If window.innerHeight + document.scrollTop == document offsetHeight => so, if scroll reached end of viewport
//Moras da saljes diff keys.
//So, think how to structure your code

//show image VIDEO OR LINK, but how to do that?
//IF type IS image, DO THIS,
