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
                    bg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600084321595&di=42425d15129c997c393ef2f9470a1b8d&imgtype=0&src=http%3A%2F%2Fpic75.nipic.com%2Ffile%2F20150819%2F1754547_162246812000_2.jpg",
                    to: "https://des.cloud.tencent.com/?utm_campaign=MJTG&utm_source=CSDN&utm_medium=SPDZB#/"
                },
                {
                    bg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600084495773&di=af68c7a9dfbc34c67c319e9d6ab40beb&imgtype=0&src=http%3A%2F%2Fpic9.nipic.com%2F20100823%2F3174103_125739006193_2.jpg",
                    to: "https://des.cloud.tencent.com/?utm_campaign=MJTG&utm_source=CSDN&utm_medium=SPDZB#/"
                },
            ]
        }
    }

    onClick(url) {
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