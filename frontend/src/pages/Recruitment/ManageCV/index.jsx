import classNames from "classnames/bind";
import styles from "./ManageCV.module.scss";
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
function ManageCV() {
    const cx =classNames.bind(styles);
    const [isLoadingListJob,setIsLoadingListJob] = useState(false);
    const [listJobByRecruiter,setListJobByRecruiter] = useState([]);
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
    return (  
        <div className={cx('wrapper','')}>
            <div className={cx('wrapper__header')}>
                <div className="p-6 bg-white border-b border-gray">
                    <h1 className="text-2xl font-medium">Quản lý CV ứng viên</h1>
                </div>
            </div>
            <div className="p-24">
                <TableContainer className="mt-8" component={Paper}>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Chiến dịch tuyển dụng</StyledTableCell>
                                <StyledTableCell align="left">Thông tin người ứng tuyển</StyledTableCell>
                                <StyledTableCell align="left">CV</StyledTableCell>
                                <StyledTableCell align="left">Trạng thái</StyledTableCell>
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

export default ManageCV;