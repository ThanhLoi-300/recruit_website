import images from "~/assets/images";

const LIST_CAREER = [
    {
        id: 0,
        name: 'Kinh doanh/Bán hàng',
        image : images.tag,
        quantityJob : 14.459 
    },
    {
        id: 1,
        name: 'IT phần mềm',
        image : images.link,
        quantityJob : 3.097
    },
    {
        id: 2,
        name: 'Hành chính/văn phòng',
        image : images.bag,
        quantityJob : 4.459 
    },
    {
        id: 3,
        name: 'Giáo dục/đào tạo',
        image : images.edu,
        quantityJob : 2.459 
    },

    {
        id: 4,
        name: 'Tư vấn',
        image : images.message,
        quantityJob : 1.959 
    },
    {
        id: 5,
        name: 'Truyền thông',
        image : images.marketing,
        quantityJob : 459 
    },
    {
        id: 6,
        name: 'Vận tải/kho vận',
        image : images.car,
        quantityJob : 1.002
    },
    {
        id: 7,
        name: 'Kế toán/kiểm toán',
        image : images.calculator,
        quantityJob : 6.259 
    }
];
const LIST_BRANDING = [
    {
        id: 1,
        name: 'TopCV Profile',
        des:'TopCV Profile là bản hồ sơ năng lực giúp bạn xây dựng thương hiệu cá nhân, thể hiện thế mạnh của bản thân thông qua việc đính kèm học vấn, kinh nghiệm, dự án, kỹ năng,... của mình',
        nameBtn: 'Tạo Profile'
    },
    {
        id: 2,
        name: 'CV Builder 2.0',
        des:'Một chiếc CV chuyên nghiệp sẽ giúp bạn gây ấn tượng với nhà tuyển dụng và tăng khả năng vượt qua vòng lọc CV.',
        nameBtn: 'Tạo CV ngay'
    }
];
const LIST_YOURSELF = [
    {
        id: 1,
        name: 'Trắc nghiệm tính cách MBTI',
        des:'Kết quả trắc nghiệm MBTI chỉ ra cách bạn nhận thức thế giới xung quanh và ra quyết định trong cuộc sống, từ đó, giúp bạn có thêm thông tin để lựa chọn nghề nghiệp chính xác hơn.',
        nameBtn: 'Khám phá ngay'
    },
    {
        id: 2,
        name: 'Trắc nghiệm đa trí thông minh MI',
        des:'Trả lời cho câu hỏi “Bạn có trí thông minh nổi trội trong lĩnh vực nào?”, từ đó bạn có thể hiểu bản thân mình hơn và đưa ra các quyết định nghề nghiệp phù hợp.',
        nameBtn: 'Khám phá ngay'
    }
];
const SUGGEST_JOBS = [
    {
        id: 1,
        nameJob: 'Frontend Developer (Reactjs/Nextjs, English)',
        nameCompany:'INNOTECH VIETNAM CORPORATION',
        address: 'Hồ Chí Minh',
        wages: 'Thỏa thuận',
        image : 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/test%2Fd8297e02e995f614af4ef6ec377479da-5fe570d09e9b2.webp?alt=media&token=b2577155-ff0b-4e94-8a82-cc95111bf46b'
    },
    {
        id: 2,
        nameJob: 'Frontend Developer (Senior/Principal)',
        nameCompany:'CÔNG TY TNHH AMARIS VIỆT NAM',
        address: 'Đà Nẵng',
        wages: 'Thỏa thuận',
        image: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/test%2Fcong-ty-tnhh-amaris-viet-nam-9750f47dad65f8403cce75e3796f7e7a-64647abfbb156.webp?alt=media&token=1185ae8a-2340-4f6b-9154-7cb3b6bf9378'
    },
    {
        id: 3,
        nameJob: 'Fresher Frontend Developer (ReactJS)',
        nameCompany:'CÔNG TY CỔ PHẦN ESTUARY',
        address: 'Hà Nội',
        wages: '17-20 triệu',
        image: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/test%2Fcong-ty-co-phan-estuary-623aa13f9a22a.webp?alt=media&token=baa10aee-8d82-4a79-814a-dd69b4b99f5b'
    }
];
export {LIST_CAREER,LIST_BRANDING,LIST_YOURSELF,SUGGEST_JOBS};