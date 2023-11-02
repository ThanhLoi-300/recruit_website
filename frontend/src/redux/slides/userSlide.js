import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    avatar: '',
    followList: [],
    infoCompany: {
        websiteLink: '',
        nameCompany: '',
        logoLink: '',
        addressCompany: '',
        areaCompany: '',
    },
    token: '',
    id: '',
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const {
                name = '',
                email = '',
                role = '',
                phone = '',
                address = '',
                avatar = '',
                followList = [],
                infoCompany = null,
                token = '',
                _id = '',
            } = action.payload;
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id;
            state.token = token ? token : state.token;
            state.role = role ? role : state.role;
            state.followList = followList ? followList : state.followList;
            state.infoCompany = infoCompany ? infoCompany : state.infoCompany;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
            state.token = '';
            state.role = '';
            state.followList = [];
            state.infoCompany = {
                websiteLink: '',
                nameCompany: '',
                logoLink: '',
                addressCompany: '',
                areaCompany: '',
            };
        },
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
