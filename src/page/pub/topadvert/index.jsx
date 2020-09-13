import React from "react"
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

import utils from "utils/utils.jsx"
import coreStyles from 'react-awesome-slider/src/core/styles.scss';
// import animationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';
import animationStyles from 'react-awesome-slider/src/styled/cube-animation/cube-animation.scss';

const AutoplaySlider = withAutoplay(AwesomeSlider);
export default class TopAdvert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            advert_list: [
                {
                    bg: "https://csdnimg.cn/public/publick_img/ad_20200909_toolbar325.jpg",
                    to: "https://des.cloud.tencent.com/?utm_campaign=MJTG&utm_source=CSDN&utm_medium=SPDZB#/"
                },
                {
                    bg: "https://csdnimg.cn/public/publick_img/ad_20200909_toolbar325.jpg",
                    to: "https://des.cloud.tencent.com/?utm_campaign=MJTG&utm_source=CSDN&utm_medium=SPDZB#/"
                }
            ]
        }
    }

    onClick(url) {
        console.log("hahah")
        utils.redirect(url)
    }
    render() {
        return (
            <AutoplaySlider

                className={this.props.className}
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={2000}
            >
                {
                    this.state.advert_list.map((v, idx) => {
                        return (
                            <div key={idx} data-src={v.bg}
                                onClick={() => this.onClick(v.to)}/>
                        )
                    })
                }
            </AutoplaySlider>
        )
    }
}