import React, { Component } from "react";
import Slider from "react-slick";
import { DATA_DISTRICT_HCM } from "~/const/province";
function SampleArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      />
    );
}
export default class MultipleItems extends Component {
    render() {
        const settings = {
          className: "slider variable-width",
          dots: true,
          infinite: true,
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          nextArrow: <SampleArrow />,
          prevArrow: <SampleArrow />
        };
        return (
          <div className="w-3/5">
            <Slider {...settings}>
                {
                    DATA_DISTRICT_HCM.map((item) => {
                        if(item.district_name === 'Thành phố Hồ Chí Minh' || item.district_name === 'Thành phố Thủ Đức'){
                            return (
                                <div key={item.district_id} style={{ width: 250 }}>
                                    <p>{item.district_name}</p>
                                </div>
                            )
                        } else {
                            return (
                                <div key={item.district_id} style={{ width: 150 }}>
                                    <p>{item.district_name}</p>
                                </div>
                            )
                        }
                    })
                }
            </Slider>
          </div>
        );
      }
}