import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import List from './components/List/List';



class App extends Component {
  constructor(props){
    console.log('creation phase [constructor] [FIRST CALLED] -1')
    super(props)
    this.state = {
      loadedData: null
    }
  }

  componentDidMount(){
    console.log('creation phase [componentDidMount] [FOURTH CALLED] -4');

    axios.get('http://localhost:3004/posts')
  .then(response => {
    this.setState({loadedData: response.data}) //loadedData filled with data, here.
    console.log(response.data.title);
  })
  .catch(error => {
    console.log(error);
  });

  };

  //axios.get.then.catch;


  render(){
    console.log('creation phase [render] [THIRD CALLED] -3')
    console.log(this.state.loadedData);

    return (
      <div className="container-fluid">

      <div className='row'>
      <div className='col-lg-12 text-center'>
      { this.state.loadedData ?  <List {...this.state}/> : null}
      </div>

      </div>



      </div>
    )
  }
}
 


export default App;



//main, class component
//We need: CRUD
//1) create component
//2) update component
//3) delete component
//4) post load component
//So, turn everything into this.state
//Or, turn everything into React hooks
//So, that's the important thing
//
