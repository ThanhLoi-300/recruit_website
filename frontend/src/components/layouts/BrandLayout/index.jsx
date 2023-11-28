import classNames from "classnames/bind";
import styles from "./BrandLayout.module.scss";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TabsBrand from "~/components/tabs/TabBrand";
function BrandLayout() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header','bg-white relative')}>
                <img className={cx('wrapper__header-background','w-full object-cover')} src="https://static.topcv.vn/company_covers/dC1UzP1dcHyXgNRs5Tv7.jpg" alt="background"/>
                <div className="px-32 relative h-72">
                    <img className={cx('wrapper__header-avatar','w-80 h-80 rounded-full')} src="https://cdn-new.topcv.vn/unsafe/135x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-tnhh-mtl-healthpost-bf7e42e68b58c72df1cc75b0d81db253-6440dd2bde140.jpg" alt="avatar"/>
                    <div className="flex items-center justify-between ml-80 pt-10 px-8">
                        <h1 className="text-5xl font-semibold">CÔNG TY TNHH MTV HEALTHPOST</h1>
                        <div className={cx("flex items-center font-semibold",'wrapper__header-follow')}>
                            <FontAwesomeIcon icon={faPlus}/>
                            <span className="ml-4">Theo dõi công ty</span>
                        </div>
                    </div>
                </div>
            </div>
            <TabsBrand/>
            <Footer/>
        </div>
    );
}

export default BrandLayout;