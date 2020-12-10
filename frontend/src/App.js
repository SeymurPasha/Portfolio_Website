import React, { Component } from 'react'
// import Loader from './Components/Loader'
// import NavBar from './Components/NavBar'
import Home from './Components/Home'
import About from './Components/About'
import Skills from './Components/Skills'
// import Contact from './Components/Contact'
// import Projects from './Components/Projects'
// import Footer from './Components/Footer'
// import Download from './Components/Download'

import axios from 'axios'
import './sass/main.scss'

 class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
    loading : true,
    part1Active: false,
    part2Active: false,
    showArrow : false,
    file:null,
      }
  }
  
  componentDidMount() {
  this.loadPage()
  setTimeout(()=> {this.setState({
    part1Active:true
  })}, 2000)
  setTimeout(()=> {this.setState({
    part2Active:true
  })}, 4000)
  setInterval(()=> {this.setState({
    showArrow:true
  })}, 6000)
  }

  upload = () => {
  console.log(true);
  }


  loadPage = () => {
    setTimeout(()=> {this.setState({
      loading:false
    })}, 100)
  }

  sendMessage = (e) => {
   e.preventDefault()
   axios.post('http://localhost:3000/send')
  .then((res) => {
    console.log(res);
  })
  }

  getResume = () => {
    const method = 'GET';
    const url = 'http://localhost:3000/download';
    axios.request({
        url,
        method,
        responseType: 'blob', //important
      })
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'Seymur Pashayev Resume.pdf'); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }

  render() {

    // if(this.state.loading) {
    // return <Loader />
    // }
    return (
      <div className = "App">
       <Home part1Active = {this.state.part1Active} part2Active = {this.state.part2Active} showArrow = {this.state.showArrow} />
      {/* <NavBar /> */}
      <About transform = {this.state.transform} />
      <Skills />
      {/* <Projects skill1 = {this.state.skill1} /> */}
      {/* <Contact sendMessage = {this.sendMessage} /> */}
      {/* <Download getResume = {this.getResume}/> */}
      {/* <Footer /> */}
      </div>
    )
  }
}

export default App