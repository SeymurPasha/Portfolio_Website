import React, { Component } from 'react'
import Arrow from './Arrow'

export default class Home extends Component {
    render() {
        return (
            <div className = "home">
            <span className = {this.props.part1Active ? "text1 typewriter show" : 'hide'}>Hello.I'm Seymur Pashayev</span>
            <span className = {this.props.part2Active ? " text2 typewriter show" : 'hide'}>FullStack Web Developer</span>
            <video 
            src="backr.mp4"
            autoPlay
            muted
            loop
            >
            </video>
            <Arrow showArrow = {this.props.showArrow}/>
            </div>
        )
    }
}
