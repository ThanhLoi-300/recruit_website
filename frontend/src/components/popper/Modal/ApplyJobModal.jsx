import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFileArrowUp, faUpload } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from "./ApplyJobModal.module.scss";
import images from '~/assets/images';
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
export default function ApplyJobModal({isOpen=false,onClose=undefined}) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        onClose(false);
        setOpen(false);
    };
    const cx = classNames.bind(styles);
    React.useEffect(() => {
        if(isOpen){
            setOpen(true);
        } else {
            setOpen(false);
        }
    },[isOpen]);
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
                        <h1 className='text-2xl font-semibold text-black'>Ứng tuyển <span className='font-semibold text-primaryColor'>Nhân Viên Livestream Thu Nhập 15 - 25 Triệu (Đi Làm Ngay)</span></h1>
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
                                    <div className='text-center mt-4 '>
                                        <input id='upLoadFileApplyJob' type='file' hidden/>
                                        <label className='px-6 py-2 bg-gray rounded-lg hover:cursor-pointer hover:bg-primaryColor hover:text-white' htmlFor='upLoadFileApplyJob'>Chọn CV</label>
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
                                            <input className='w-full px-4 py-3 mt-2 rounded-lg border border-gray outline-primaryColor' type='text' placeholder='Nhập họ và tên' value={'Nguyễn Thanh Quỳnh Linh'}/>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 mt-5'>
                                            <div>
                                                <h4>Email <span className={cx('wrapper__header-note')}>*</span></h4>
                                                <input className='w-full px-4 py-3 mt-2 rounded-lg border border-gray outline-primaryColor' type='text' placeholder='Nhập họ và tên' value={'linh@gmail.com'}/>
                                            </div>
                                            <div>
                                                <h4>Họ và tên <span className={cx('wrapper__header-note')}>*</span></h4>
                                                <input className='w-full px-4 py-3 mt-2 rounded-lg border border-gray outline-primaryColor' type='text' placeholder='Nhập họ và tên' value={'0981984623'}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-7'>
                            <div className='flex items-center justify-end'>
                                <button className='px-6 py-4 bg-gray rounded-lg text-center'>Hủy</button>
                                <button className='px-6 py-4 bg-primaryColor rounded-lg ml-4 text-white text-center'>Nộp đơn ứng tuyển</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}