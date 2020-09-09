import React from "react"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';


import coreStyles from 'react-awesome-slider/src/core/styles.scss';
import animationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

const AutoplaySlider = withAutoplay(AwesomeSlider);
export default class TopAdvert extends React.Component {

    onClick() {
        console.log("hahah")
    }
    render() {
        return (
            <AutoplaySlider

                className={this.props.className}
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={2000}
            >
                <div data-src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2728642492,158673572&fm=26&gp=0.jpg"  onClick={() => this.onClick()}/>
                <div data-src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3559051156,3273521023&fm=26&gp=0.jpg" onClick={() => this.onClick()}/>
                <div data-src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3417378894,222175516&fm=26&gp=0.jpg" onClick={() => this.onClick()}/>
            </AutoplaySlider>
        )
    }
}