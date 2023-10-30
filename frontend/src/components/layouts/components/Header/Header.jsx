import classNames from "classnames/bind";
import { Popover } from '@headlessui/react'
import {
  Bars3Icon,
  BriefcaseIcon,
  CreditCardIcon,
  EnvelopeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import images from "~/assets/images";
function Header() {
    const cx = classNames.bind(styles);
    return (  
        <header className="bg-white shadow-bsd-bottom">
            <nav className="columns-12 flex max-w-full items-center justify-between lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">SGU CV</span>
                    <img className="h-50 w-auto" src={images.logo} alt="SGU LOGO" />
                </a>
                </div>
                <div className="flex lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                </div>
                <div className="flex items-center ju">
                    <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
                        <Link to="#" className="text-2xl flex items-center font-semibold leading-6 text-gray-900">
                            <div className="flex-col flex">
                                <EnvelopeIcon className="h-8 w-auto"/>
                                <span>Articles</span>
                            </div>
                        </Link>
                        <Link to="#" className="text-2xl flex items-center font-semibold leading-6 text-gray-900">
                            <div className="flex-col flex">
                                <UserGroupIcon className="h-8 w-auto"/>
                                <span>People</span>
                            </div>
                        </Link>
                        <Link to="#" className="text-2xl flex items-center font-semibold leading-6 text-gray-900">
                            <div className="flex-col flex">
                                <CreditCardIcon className="h-9 w-auto"/>
                                <span>Learning</span>
                            </div>
                        </Link>
                        <Link to="#" className="text-2xl flex items-center font-semibold leading-6 text-gray-900 pr-5 border-r">
                            <div className="flex-col flex">
                                <BriefcaseIcon className="h-8 w-auto"/>
                                <span>Jobs</span>
                            </div>
                        </Link>
                    </Popover.Group>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link to="#" className={cx("text-2xl pt-5 pb-5 pl-10 pr-10 m-5 font-semibold leading-6 text-gray-900  text-royalBlue border rounded-3xl hover:banana")}>
                            Log in
                        </Link>
                    </div>
                </div>
            </nav>
    </header>
    );
}

export default Header;