import React, { useState, useEffect } from "react";

const List = props => {
  const [listItems, setListItems] = useState(
    Array.from(Array(10).keys(), n => n + 1)
  );
  const [DataList, setDataList] = useState(props.loadedData.slice(0, 10));
  const [isFetching, setIsFetching] = useState(false);

  console.log('prosp loadedDat', props.loadedData);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    console.log("Fetch more list items!");
    setIsFetching(true);
  }

  function fetchMoreListItems() {
    setTimeout(() => {
      // setListItems(prevState => (  [...prevState, ...Array.from(Array(10).keys(), n => n + prevState.length + 1)])  ); //spread prev array
      setDataList(prevState => [
        ...prevState,
        ...props.loadedData.slice(10)
      ]);
      setIsFetching(false);
    }, 2000);
  }



  return (
    <>
      <ul className="list-group mb-2">
        {DataList.map((data, ind) => (
          <>
            <li key={data.id} className="list-group-item">
              List Item {data.title}

              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-warning">Delete</button>
            </li>
            <li>{data.meta.url}</li>
          </>
        ))}
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
