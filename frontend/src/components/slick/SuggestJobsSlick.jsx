import React from "react";
import Slider from "react-slick";
import { SUGGEST_JOBS } from "~/const/data";
import classNames from "classnames/bind";
import styles from "./slick.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
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
export default function SuggestJobs({chevRonLeft}){
    const cx = classNames.bind(styles)
    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <SampleArrow onClick={chevRonLeft}/>,
        prevArrow: <SampleArrow />
    };
    return (
        <div className="w-full">
        <Slider {...settings}>
            {
                SUGGEST_JOBS.map((item) => {
                    return (
                        <div key={item.id} >
                            <div className={cx('wrapper',"flex justify-between" )}>
                                <img src={item.image} className="w-32 h-32 object-contain" alt="bg-company"/>
                                <div className="ml-5">
                                    <h1 className="mb-10 font-semibold">{item.nameJob}</h1>
                                    <div className={cx('wrapper__name',"flex items-center")}>
                                        <FontAwesomeIcon icon={faBuilding}/>
                                        <span className={cx('wrapper__name',"ml-4 text-xl")}>{item.nameCompany}</span>
                                    </div>
                                    <div className={cx('wrapper__name',"mt-4 flex items-center")}>
                                        <FontAwesomeIcon icon={faLocationDot}/>
                                        <span className={cx("ml-4 text-xl")}>{item.address}</span>
                                    </div>
                                </div>
                                <div className="text-2xl text-primaryColor font-semibold">{item.wages}</div>
                            </div>
                        </div>
                    )
                })
            }
        </Slider>
        </div>
    );
}