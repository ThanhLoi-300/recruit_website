import classNames from "classnames/bind";
import styles from "./ManageRecruitment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import ToggleSwitch from "~/components/button/ToggleSwitch/ToggleSwitch";
import { Filter } from "~/components/popper/Filter";
import { DATA_EXPERIENCE } from "~/const/province";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListJobByRecruiter } from "~/redux/jobSlice";
import useUser from "~/hooks/useUser";
import getRandomNumber from "~/const/getRandomNumber";
import HorizontalBarsDna from "~/components/spinners/components/horizontalBarsDna";
function ManageRecruitment() {
    const cx = classNames.bind(styles);
    const [isLoadingListJob,setIsLoadingListJob] = useState(false);
    const [isShowFilterJobs,setShowFilterJobs] = useState(false);
    const [valueFilterJobs,setValueFilterJobs] = useState('Tất cả chiến dịch');
    const [listJobByRecruiter,setListJobByRecruiter] = useState([]);
    const dispatch = useDispatch();
    const {obDetailInfoUser} = useUser();
    const state = useSelector(state => state.job);
    function createData(id, name, optimal, recruitment, filterCV, serviceRunning) {
        return { id, name, optimal, recruitment, filterCV, serviceRunning };
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#76417e",
          color: theme.palette.common.white,
          border: "1px solid #ccc",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          border: "1px solid #ccc"
        },
    }));
    
    const handelClickShowFilterJob = () =>{
        setShowFilterJobs(!isShowFilterJobs);
    };

    useEffect(() => {
        if(obDetailInfoUser && obDetailInfoUser._id){
            dispatch(getListJobByRecruiter({
                idRecruit: {
                 $oid: obDetailInfoUser._id
                },
                pageSize: 3,
                page: 1
            })).then((item) => {
                if(item.payload && item.payload.jobs){
                    const newJobs = [];
                    item.payload.jobs.map((item) => newJobs.push(createData(item._id.slice(0, 6),item.title,getRandomNumber(), 'Đăng tin', 'Tìm CV', 'Thêm')))
                    setListJobByRecruiter(newJobs)
                }
            })
        }
    },[obDetailInfoUser]);
    useEffect(() => {
        if(state.isLoading){
            setIsLoadingListJob(state.isLoading);
        }
    },[state]);
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header', 'px-4 py-8 text-xl font-medium bg-white')}>
                <h1>Quản lý chiến dịch tuyển dụng</h1>
            </div>
            <div className={cx('wrapper__content','p-24')}>
                <div className={cx('wrapper__content-menu','mt-12 flex')}>
                    <Link className={cx('wrapper__content-menu-newJob','flex items-center rounded-lg')}
                        to={"create-job"}
                    >
                        <div>
                            <FontAwesomeIcon className="text-xl" icon={faBagShopping}/>
                        </div>
                        <p className="ml-4 text-xl font-medium">Chiến dịch mới</p>
                    </Link>
                    <div className={cx("flex items-center",'wrapper__content-menu-boxFilter')}>
                        <Filter
                            state={isShowFilterJobs}
                            items={DATA_EXPERIENCE}
                            valueSelected={valueFilterJobs}
                            className="wrapper"
                            placement="bottom-start"
                            onClickFilter={(item) => {
                                setValueFilterJobs(item);
                                setShowFilterJobs(false);
                            }}
                        >
                            <div className={cx('wrapper__content-menu-boxFilter-filterJob','flex items-center justify-between ml-4')} onClick={handelClickShowFilterJob}>
                                <span  className="px-4 text-xl font-medium">{valueFilterJobs}</span>
                                <div>
                                    <FontAwesomeIcon className="text-primaryColor text-xl font-medium" icon={faChevronDown}/>
                                </div>
                            </div>
                        </Filter>
                        <div className={cx("relative w-full",'wrapper__content-menu-boxFilter-searchJob')}>
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            </div>
                            <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full border-0 "
                            placeholder="Tìm chiến dịch"
                            />
                            <div className="absolute inset-y-5 right-5 flex items-center text-primaryColor">
                                <FontAwesomeIcon icon={faSearch}/>
                            </div>
                        </div>
                    </div>
                </div>
                <TableContainer className="mt-8" component={Paper}>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Chiến dịch tuyển dụng</StyledTableCell>
                                <StyledTableCell align="left">Tối ưu</StyledTableCell>
                                <StyledTableCell align="left">Tin tuyển dụng</StyledTableCell>
                                <StyledTableCell align="left">Lọc CV</StyledTableCell>
                                <StyledTableCell align="left">Dịch vụ đang chạy</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            isLoadingListJob ? (
                                listJobByRecruiter.map((row,index) => (
                                    <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: "1px solid #ccc"} }}
                                    >   
                                        {/* { id, name, optimal, recruitment, filterCV, serviceRunning } */}
                                        <TableCell component="th" scope="row">
                                            <div className="flex">
                                                {<ToggleSwitch checked={true}/>}
                                                <div className="ml-8 css-1it3gd4-MuiTableRow-nameJobs">
                                                    <div className="font-semibold mb-4 text-xl">{row.name}</div>
                                                    <span className="mt-3 px-4 py-2 bg-gray rounded-lg text-lg font-medium">#{row.id}</span>
                                                    <div className="h-16 mt-8">
                                                        <div className="css-1it3gd4-MuiTableRow-root-hover-selected">
                                                            <div className="flex items-center">
                                                                <span className="font-medium text-xl">Sửa chiến dịch</span>
                                                                <span className="mx-2 text-gray text-xl">|</span>
                                                                <span className="font-medium text-xl">Xem báo cáo</span>
                                                            </div>
                                                            <span className="mt-4 font-medium text-xl">Xem CV ứng tuyển</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left"><div className="text-blue font-medium text-xl">{row.optimal+"%"}</div></TableCell>
                                        <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium text-xl">{row.recruitment}</span></TableCell>
                                        <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium text-xl">{row.filterCV}</span></TableCell>
                                        <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium text-xl">{row.serviceRunning}</span></TableCell>
                                    </TableRow>
                                ))
                            ) : <TableRow><TableCell colSpan={5}><HorizontalBarsDna/></TableCell></TableRow>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ManageRecruitment;