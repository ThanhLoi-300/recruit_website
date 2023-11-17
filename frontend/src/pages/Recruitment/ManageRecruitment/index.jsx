import classNames from "classnames/bind";
import styles from "./ManageRecruitment.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CreateJob from "./CreateJob";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import ToggleSwitch from "~/components/button/ToggleSwitch/ToggleSwitch";
import { Filter } from "~/components/popper/Filter";
import { DATA_EXPERIENCE } from "~/const/province";
import { Link } from "react-router-dom";
function ManageRecruitment() {
    const cx = classNames.bind(styles);
    const [isShowNewJobs,setIsShowNewJob] = useState(false);
    const [isShowFilterJobs,setShowFilterJobs] = useState(false);
    const [valueFilterJobs,setValueFilterJobs] = useState('Tất cả chiến dịch');
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#76417e",
          color: theme.palette.common.white,
          border: "1px solid #ccc"
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          border: "1px solid #ccc"
        },
      }));
    
    const rows = [
        createData('Frozen yoghurt', 159, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Ice cream sandwich', 237, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Eclair', 262, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Cupcake', 305,'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Frozen yoghurt', 159, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Ice cream sandwich', 237, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Eclair', 262, 'Đăng tin', 'Tìm CV', 'Thêm'),
        createData('Cupcake', 305,'Đăng tin', 'Tìm CV', 'Thêm'),
    ];

    const handleClickIsShowNewJobs = () =>{
        setIsShowNewJob(true);
    };

    const handelClickShowFilterJob = () =>{
        setShowFilterJobs(!isShowFilterJobs);
    };
    return (  
        <div>
            {
                !isShowNewJobs ? (
                    <div className={cx('wrapper')}>
                        <div className={cx('wrapper__header', 'px-4 py-8 text-2xl font-medium bg-white')}>
                            <h1>Quản lý chiến dịch tuyển dụng</h1>
                        </div>
                        <div className={cx('wrapper__content','p-24')}>
                            <div className={cx('wrapper__content-menu','mt-12 flex')}>
                                <Link className={cx('wrapper__content-menu-newJob','flex items-center rounded-lg')}
                                    to={"create-job"}
                                >
                                    <div>
                                        <FontAwesomeIcon className="text-2xl" icon={faBagShopping}/>
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
                                    {rows.map((row,index) => (
                                        <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: "1px solid #ccc"} }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <div className="flex">
                                                    {<ToggleSwitch checked={true}/>}
                                                    <div className="ml-8 css-1it3gd4-MuiTableRow-nameJobs">
                                                        <div className="font-semibold mb-4">{row.name}</div>
                                                        <span className="mt-3 px-4 py-2 bg-gray rounded-lg text-lg font-medium">#1405165</span>
                                                        <div className="h-16 mt-8">
                                                            <div className="css-1it3gd4-MuiTableRow-root-hover-selected">
                                                                <div className="flex items-center">
                                                                    <span className="font-medium">Sửa chiến dịch</span>
                                                                    <span className="mx-2 text-gray">|</span>
                                                                    <span className="font-medium">Xem báo cáo</span>
                                                                </div>
                                                                <span className="mt-4 font-medium">Xem CV ứng tuyển</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left"><div className="text-blue font-medium">{row.calories+"%"}</div></TableCell>
                                            <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium">{row.fat}</span></TableCell>
                                            <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium">{row.carbs}</span></TableCell>
                                            <TableCell align="left"><span className="mt-3 px-6 py-3 bg-btn-table text-primaryColor rounded-lg font-medium">{row.protein}</span></TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                ) : <CreateJob/>
            }
        </div>
    );
}

export default ManageRecruitment;