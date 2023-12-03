import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFile, faFileArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from "./ApplyJobModal.module.scss";
import images from '~/assets/images';
import useUser from '~/hooks/useUser';
import { v4 } from 'uuid';
import { storage } from '~/config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useDispatch} from "react-redux";
import { createApplyJob } from '~/redux/applyJobSlice';
import { Toast } from '~/components/toast';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: '10px',
};
export default function ApplyJobModal({isOpen=false,onClose=undefined,data}) {
    const cx = classNames.bind(styles);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [valueFullNameUser,setValueFullNameUser] = React.useState({
        name : '',
        state: null
    });
    const [valueEmailUser,setValueEmailUser] = React.useState({
        name : '',
        state: null
    });
    const [valuePhoneUser,setValuePhoneUser] = React.useState({
        name : '',
        state: null
    });
    const [valueFileUpLoad,setValueFileUpLoad] = React.useState({});
    const {obDetailInfoUser} = useUser();

    // HANDLE CLOSE BOX APPLY JOB
    const handleClose = () => {
        onClose(false);
        setOpen(false);
    };
   
    const handleOnChangeFullName = (e) => {
        setValueFullNameUser({...valueFullNameUser , name: e.target.value, state: null});
    };

    const handleOnChangeEmail = (e) => {
        setValueEmailUser({...valueEmailUser , name: e.target.value, state: null});
    };

    const handleOnChangePhone = (e) => {
        setValuePhoneUser({...valuePhoneUser , name: e.target.value, state: null});
    };

    const handleOnChangeFileUploadCvUser = (e) => {
        const selectedFile = e.target.files[0];
        const allowedFileTypes = ['pdf', 'doc', 'docx'];    
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (allowedFileTypes.includes(fileExtension)) {
                setValueFileUpLoad({fileName : selectedFile});
            } else {
                Toast({
                    type: 'error',
                    content: 'Không đúng định dạng',
                    position: 'bottom-right',
                    autoClose: 2000,
                    limit: 1,
                    des: 'edit',
                });
            }
        }
    };

    const handleRemoveFileUpload = () => {
        setValueFileUpLoad({...valueFileUpLoad , fileName: {name : ''}});
    };

    // HANDLE UPLOAD FILE TO FIREBASE
    const upLoadFileToFireBase = (valueIdUser, imageUpload,typeFile) => {
        return new Promise((resolve, reject) => {
            const uuid = v4();
            const nameImage = imageUpload.name + uuid;
            const imageRef = ref(storage, `${typeFile}/${valueIdUser}/${nameImage}`);
            uploadBytes(imageRef, imageUpload)
                .then((upLoad) => getDownloadURL(upLoad.ref))
                .then((url) => {
                    if (url) {
                        resolve(url);
                    } else {
                        reject('error upload');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const handleApplyJobInDb = async (fileCv,userId,jobId) => {
        return await dispatch(createApplyJob({
            fileCv: fileCv,
            userId: userId,
            jobId: jobId
        }))
    };

    const handleApplyJob = () => {
        if(valueEmailUser.name === '') setValueEmailUser({...valueEmailUser , state: false});
        if(valueFullNameUser.name === '') setValueFullNameUser({...valueFullNameUser , state: false});
        if(valuePhoneUser.name === '') setValuePhoneUser({...valuePhoneUser , state: false});
        if(obDetailInfoUser && valueFileUpLoad && data && obDetailInfoUser._id &&  data._id){
            upLoadFileToFireBase(obDetailInfoUser._id,valueFileUpLoad.fileName,'CV_User').then((url) => {
                handleApplyJobInDb(url,obDetailInfoUser._id,data._id).then((item) => {
                    console.log(item);
                    if(item && item.payload && item.payload.message === "SUCCESS" && item.payload.status === "OK") {
                        Toast({
                            type: 'success',
                            content: 'Nộp đơn ứng tuyển thành công',
                            position: 'bottom-right',
                            autoClose: 2000,
                            limit: 1,
                            des: 'edit',
                        });
                    }
                })
            })
        }
    };

    React.useEffect(() => {
        if(isOpen){
            setOpen(true);
        } else {
            setOpen(false);
        }
    },[isOpen]);

    React.useEffect(() => { 
        if(obDetailInfoUser && obDetailInfoUser.name && obDetailInfoUser.phone && obDetailInfoUser.email){
            setValueFullNameUser({...valueFullNameUser , name:obDetailInfoUser.name});
            setValueEmailUser({...valueEmailUser , name:obDetailInfoUser.email});
            setValuePhoneUser({...valuePhoneUser , name:obDetailInfoUser.phone});
        }
    },[obDetailInfoUser]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={cx('wrapper')}>
                    <div className={cx('wrapper__header','flex items-center justify-start relative')}>
                        <h1 className='text-2xl font-semibold text-black mr-12'>Ứng tuyển 
                            <span className='font-semibold text-primaryColor'>
                                {data && data.title ? ' ' + data.title : ''}
                            </span>
                        </h1>
                        <FontAwesomeIcon className={cx('wrapper__header-icon','absolute')} icon={faClose} onClick={handleClose}/>
                    </div>
                    <div>
                        <div className='flex items-center text-primaryColor font-semibold mt-7 text-xl'>
                            <FontAwesomeIcon className='text-3xl' icon={faFileArrowUp}/>
                            <h2 className='ml-2'>Chọn CV Ứng tuyển</h2>
                        </div>
                        <div className='mt-7'>
                            <div className='p-4  border border-dashed border-primaryColor rounded-lg'>
                                <div className='pb-5 border-b border-gray'>
                                    <div className='flex items-center justify-center'>
                                        <img className='w-20 h-w-20' src={images.upLoadCloud} alt='upLoad Cloud'/>
                                        <h3 className='ml-4 text-black'>Tải lên CV từ máy tính, chọn hoặc kéo thả</h3>
                                    </div>
                                    <div className='text-center mt-4'>Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB</div>
                                    <div className={cx('text-center mt-4 ',valueFileUpLoad && valueFileUpLoad.fileName && valueFileUpLoad.fileName.name  && valueFileUpLoad.fileName.name !== '' ? 'flex items-center justify-center':'')}>
                                        {
                                            valueFileUpLoad && valueFileUpLoad.fileName && valueFileUpLoad.fileName.name  && valueFileUpLoad.fileName.name !== '' ? (
                                                <div className='flex items-center'>
                                                    <div className='flex items-center text-primaryColor font-semibold'>
                                                        <FontAwesomeIcon icon={faFile}/>
                                                        <span className='ml-3'>{valueFileUpLoad.fileName.name}</span>
                                                    </div>
                                                    <FontAwesomeIcon 
                                                        className='ml-3 rounded-lg p-2 border border-primaryColor bg-primaryColor 
                                                            text-white hover:bg-white hover:text-primaryColor hover:cursor-pointer' 
                                                        icon={faTrash}
                                                        onClick={handleRemoveFileUpload}
                                                    />
                                                </div>
                                            ) : ''
                                        }
                                        <div className={cx(valueFileUpLoad && valueFileUpLoad.fileName && valueFileUpLoad.fileName.name  && valueFileUpLoad.fileName.name !== '' ? 'ml-5':'')}>
                                            <input
                                                id='upLoadFileApplyJob'
                                                type='file'
                                                hidden
                                                onChange={handleOnChangeFileUploadCvUser}
                                            />
                                            <label 
                                                className='px-6 py-2 bg-gray rounded-lg hover:cursor-pointer hover:bg-primaryColor hover:text-white' 
                                                htmlFor='upLoadFileApplyJob'
                                            >
                                                Chọn CV
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-7'>
                                    <div className='flex items-center justify-between'>
                                        <h3 className='text-xl text-primaryColor font-semibold'>Vui lòng nhập đầy đủ thông tin chi tiết:</h3>
                                        <p className={cx('text-red-600 font-medium','wrapper__header-note')}>(*) Thông tin bắt buộc</p>
                                    </div>
                                    <div>
                                        <div>
                                            <h4>Họ và tên <span className={cx('wrapper__header-note')}>*</span></h4>
                                            <input 
                                                className={cx('w-full px-4 py-3 mt-2 rounded-lg border outline-primaryColor',!valueFullNameUser.state && valueFullNameUser.state !== null ? 'border-error text-error' : 'border-gray')} 
                                                type='text' 
                                                placeholder='Nhập họ và tên' 
                                                value={valueFullNameUser.name}
                                                onChange={handleOnChangeFullName}
                                            />
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 mt-5'>
                                            <div>
                                                <h4>Email <span className={cx('wrapper__header-note')}>*</span></h4>
                                                <input 
                                                    className={cx('w-full px-4 py-3 mt-2 rounded-lg border outline-primaryColor',!valueEmailUser.state && valueEmailUser.state !== null ? 'border-error text-error' : 'border-gray')} 
                                                    type='text' 
                                                    placeholder='Nhập email' 
                                                    value={valueEmailUser.name}
                                                    onChange={handleOnChangeEmail}
                                                />
                                            </div>
                                            <div>
                                                <h4>Số điện thoại<span className={cx('wrapper__header-note')}>*</span></h4>
                                                <input 
                                                    className={cx('w-full px-4 py-3 mt-2 rounded-lg border outline-primaryColor',!valuePhoneUser.state && valuePhoneUser.state !== null ? 'border-error text-error' : 'border-gray')} 
                                                    type='text' 
                                                    placeholder='Nhập số điện thoại' 
                                                    value={valuePhoneUser.name}
                                                    onChange={handleOnChangePhone}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-7'>
                            <div className='flex items-center justify-end'>
                                <button 
                                    type='text' 
                                    className='px-6 py-4 bg-gray rounded-lg text-center' 
                                    onClick={handleClose}
                                >
                                    Hủy
                                </button>
                                <button 
                                    type='text' 
                                    className='px-6 py-4 bg-primaryColor rounded-lg ml-4 text-white text-center'
                                    onClick={handleApplyJob}
                                >
                                    Nộp đơn ứng tuyển
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}