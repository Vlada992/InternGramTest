import React, { useState, useEffect } from 'react';     //new functionality, hooks


const List  = (props) => {
    const [listItems, setListItems ] = useState(Array.from(Array(10).keys(), n => n + 1));

    const [DataList, setDataList] = useState(props.loadedData.slice(0, 10));
    const [isFetching, setIsFetching] = useState(false);


    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);  //add listener
        return () => window.removeEventListener('scroll', handleScroll);  //remove listener
    }, []);


    useEffect(() => {
        if(!isFetching) return; //if false, return from page
        fetchMoreListItems();
    }, [isFetching]) 


    function handleScroll(){
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ) return;
        console.log('Fetch more list items!');
        setIsFetching(true);
    }

    function fetchMoreListItems() {
        setTimeout(() => {
         // setListItems(prevState => (  [...prevState, ...Array.from(Array(10).keys(), n => n + prevState.length + 1)])  ); //spread prev array
          setDataList(prevState => ([...prevState, ...props.loadedData.slice(10) ])  )
          setIsFetching(false);
        }, 2000);
      }


    return (
        <>
        <ul className="list-group mb-2">
        {/*{listItems.map(listItem => <li key={listItem} className="list-group-item">List Item {listItem}</li>)}*/}

        {DataList.map((data, ind) => <li key={data.id} className="list-group-item">List Item {data.title}</li>)}
        

        </ul>
        {isFetching && 'Fetching more list items...'}
        </>
    )
}



export default List;



//export default List; 

//useEffect => SIMILAR TO componentDidMount in creation phase
//useEffect here, having second argument =? [] empty array is telling that i'ts same as componentDidMount
//Ok, let's see.
//If window.innerHeight + document.scrollTop == document offsetHeight => so, if scroll reached end of viewport
//Moras da saljes diff keys.