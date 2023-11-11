import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./foward.module.scss";
function ForwardForm({title,description,nameBtn}) {
    const cx =classNames.bind(styles);
    return (  
        <div className={cx('foWard')}>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="my-10 text-2xl">{description}</p>
            <button className="flex items-center justify-around" type="button">
                <span>{nameBtn}</span>
                <FontAwesomeIcon className="ml-4" icon={faArrowRight}/>
            </button>
        </div>
    );
}
export default ForwardForm;