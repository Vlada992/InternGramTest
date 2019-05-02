import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import List from "./components/List/List";
import Create from "./components/Create/Create";

class App extends Component {
  constructor(props) {
    console.log("creation phase [constructor] [FIRST CALLED] -1");
    super(props);

    this.state = {
      loadedData: null,
      createTypeDiv:false,
      createInpDiv:false,
      placeholder: '',
      inpValTitle:'',
      inpValUrl:''
    };
  }

  componentDidMount() {
    console.log("creation phase [componentDidMount] [FOURTH CALLED] -4");
    axios
      .get("http://localhost:3004/posts")
      .then(response => {
        const respData = response.data;
        this.setState({ loadedData: respData });
        console.log(response.data.title);
      })
      .catch(error => {
        console.log(error);
      });
  }




  createBtnHandler = () => {
    console.log('func works');
    this.setState({createTypeDiv:true})
  };



  createInpHandler = (event) => {
    console.log('event je:', event.target.value)
    const {value} = event.target;
      this.setState({
        placeholder : value,
        createInpDiv:true,
        inpValTitle:'',
        inpValUrl:''
      })
  };



  sendInpVal = (event) => {
    console.log('48 line:', event.target.value)
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });


    //}
  };

  createPost = () => {
    if(this.state.loadedData != null){
      const newPost = {
        id: this.state.loadedData.length + 1,
        type:'IMAGE',
        meta: {url: this.state.inpValUrl},
        title: this.state.inpValTitle
      }

      this.setState( (state) => {
        state.loadedData = [newPost, ...this.state.loadedData ]
        return state;
    });
    }
  };



  render() {
    console.log("creation phase [render] [THIRD CALLED] -3");
    return (
      <div className="container-fluid">
      
        <div className="row justify-content-center row-own-0">
          <div className="col-lg-12 text-center mb-5">
            <h1>Manage lists</h1>
          </div>

          <Create  {...this.state}
           createBtn = {this.createBtnHandler}
           createInp = {this.createInpHandler}
           takeInpVal={this.sendInpVal}
           createPost={this.createPost}
          />
        </div>

        <div className="row row-own-1">
          <div className="col-lg-12 text-center">
            {this.state.loadedData ? <List {...this.state} /> : null}
          </div>
        </div>

      </div>
    );
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
//most important things
