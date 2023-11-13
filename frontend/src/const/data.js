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
export {LIST_CAREER,LIST_BRANDING,LIST_YOURSELF};