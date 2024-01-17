import classNames from "classnames/bind";
import styles from "./ManageCV.module.scss";
import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useUser from "~/hooks/useUser";
import HorizontalBarsDna from "~/components/spinners/components/horizontalBarsDna";
import { getAppliesByUserId } from "~/redux/applyJobSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { notificationByEmail } from "~/redux/authSlice";
import { Toast } from "~/components/toast";
function ManageCV() {
    const cx =classNames.bind(styles);
    const [isLoadingListJob,setIsLoadingListJob] = useState(false);
    const [listAppliesByUser,setListAppliesByUser] = useState([]);
    const [valueMessageStatusJob,setValueMessageStatusJob] = useState('');
    const dispatch = useDispatch();
    const {obDetailInfoUser} = useUser();

    function convertDateTime(params) {
        const dateObject = new Date(params);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear()

        return `${day}/${month}/${year}`;
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

    const handleChangeStatusApply = async (applyId,action) => {
        const msg = await dispatch(notificationByEmail({
            action : action,
            idApply: applyId
        }));
        if(msg && msg.payload){
            const {message , status} =  msg.payload;
            if(message === "Đã gửi thông báo đến ứng viên" && status === "OK"){
                setValueMessageStatusJob(message);
                Toast({
                    type: 'success',
                    content: message,
                    position: 'bottom-right',
                    autoClose: 2000,
                    limit: 1,
                    des: 'edit',
                });
            }
        }
    };

    const handleClickConfirm = (applyId) => {
        handleChangeStatusApply(applyId,true);
    };

    const handleCLickCancel = (applyId) => {
        handleChangeStatusApply(applyId,false);
    };

    useEffect(() => {
        if(obDetailInfoUser && obDetailInfoUser._id){
            dispatch(getAppliesByUserId({id:obDetailInfoUser._id})).then((item) => {
                if(item && item.payload && item.payload.message === 'SUCCESS' && item.payload.status === 'OK'){
                    setListAppliesByUser(item.payload.applies);
                    setIsLoadingListJob(true);
                }
            })
        }
    },[obDetailInfoUser]);

    useEffect(() => {
        if(valueMessageStatusJob === "Đã gửi thông báo đến ứng viên"){
            if(obDetailInfoUser && obDetailInfoUser._id){
                dispatch(getAppliesByUserId({id:obDetailInfoUser._id})).then((item) => {
                    if(item && item.payload && item.payload.message === 'SUCCESS' && item.payload.status === 'OK'){
                        setListAppliesByUser(item.payload.applies);
                        setIsLoadingListJob(true);
                    }
                })
            }
        }
    },[valueMessageStatusJob])

    return (  
        <div className={cx('wrapper','')}>
            <div className={cx('wrapper__header')}>
                <div className="p-6 bg-white border-b border-gray">
                    <h1 className="text-2xl font-medium">Quản lý CV ứng viên</h1>
                </div>
                <div className="bg-white px-6 py-2 flex items-center">
                    <div className="relative text-lg w-96">
                        <input 
                            className="border p-2 pr-8 w-full  border-gray rounded-lg placeholder:text-lg placeholder:font-medium" 
                            placeholder="Tìm kiếm tên, email, số điện thoại" 
                        />
                        <FontAwesomeIcon className="absolute right-4 top-0 bottom-0 m-auto" icon={faSearch}/>
                    </div>
                    <div className="ml-5 flex items-center text-lg border border-gray p-2 rounded-lg">
                        <span>Chọn chiến dịch tuyển dụng</span>
                        <FontAwesomeIcon className="ml-4" icon={faChevronDown}/>
                    </div>
                    <div className="ml-5 flex items-center text-lg border border-gray p-2 rounded-lg">
                        <span>Chọn trạng thái</span>
                        <FontAwesomeIcon className="ml-4" icon={faChevronDown}/>
                    </div>
                    <div className="ml-5 flex items-center text-lg border border-gray p-2 rounded-lg">
                        <span>Chọn nguồn CV</span>
                        <FontAwesomeIcon className="ml-4" icon={faChevronDown}/>
                    </div>
                    <div className="ml-5 flex items-center text-lg border border-gray p-2 rounded-lg">
                        <span>Tất cả nhãn</span>
                        <FontAwesomeIcon className="ml-4" icon={faChevronDown}/>
                    </div>
                </div>
            </div>
            <div className="p-24">
                {
                    isLoadingListJob ? (
                        (listAppliesByUser.length > 0 ? (
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
                                        listAppliesByUser.map((row,index) => (
                                            <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: "1px solid #ccc"} }}
                                            >
                                                {/* { id, name, optimal, recruitment, filterCV, serviceRunning } */}
                                                <TableCell align="left">  
                                                    <div className="">
                                                        <h1 className="text-xl font-semibold ">{row.job.title}</h1>
                                                        <div className="mt-4 ">
                                                            <h2 className="font-medium">Thông tin tuyển dụng:</h2>
                                                            <ul className="text-xl border border-gray py-2 px-4 mt-4 rounded-lg">
                                                                <li className="mt-3 font-medium">- Ngày tạo: {convertDateTime(row.job.createdAt)}</li>
                                                                <li className="mt-3 font-medium">- Ngày hết hạn: {row.job.deadlineApplication}</li>
                                                                <li className="mt-3 font-medium">- Mức lương: {row.job.salary}</li>
                                                                <li className="mt-3 font-medium">- Số lương tuyển: {row.job.quantityRecruit}</li>
                                                                <li className="mt-3 font-medium">- Vị trí tuyển dụng: {row.job.vacancy}</li>
                                                                <li className="mt-3 font-medium">- Kinh nghiệm: {row.job.experienceYear}</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <div className="mt-4">
                                                        <div className="text-xl">
                                                            <div className="mt-3 font-medium flex items-center">
                                                                Họ và tên: <span className="ml-4">{row.user.name}</span>
                                                            </div>
                                                            <div className="mt-3 font-medium flex items-center">
                                                                Số điện thoại: <span className="ml-4">{row.user.phone}</span>
                                                            </div>
                                                            <div className="mt-3 font-medium flex items-center">
                                                                Email: <span className="ml-4">{row.user.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link to={row.fileCv} className="underline font-semibold" target="_blank">Xem</Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <div className='flex items-center w-36 p-1  text-primaryColor rounded-lg font-medium'>
                                                        <FontAwesomeIcon className="" icon={faCheck}/>
                                                        <button 
                                                            type="button" 
                                                            className="ml-3"
                                                            onClick={(e) => handleClickConfirm(row._id)}
                                                        >
                                                            Tiếp nhận
                                                        </button>
                                                    </div>
                                                    <div className='flex items-center w-36 p-1 mt-4  text-primaryColor rounded-lg font-medium'>
                                                        <FontAwesomeIcon className="" icon={faTrash}/>
                                                        <button 
                                                            type="button" 
                                                            className="ml-3"
                                                            onClick={(e) => handleCLickCancel(row._id)}
                                                        >
                                                            Từ chối
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) :  (
                            <div className="bg-white rounded-lg text-center shadow-brand">
                                <div className="flex justify-center"><img className="w-96 h-96" src={images.noData} alt="NO DATA"/></div>
                                <h1 className="text-2xl py-6">Chưa tìm thấy ứng viên phù hợp</h1>
                            </div>
                        ))
                    ) : (  
                        <HorizontalBarsDna/>
                    )
                }
            </div>
        </div>
    );
}

export default ManageCV;