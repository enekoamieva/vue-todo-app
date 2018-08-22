import moment from 'moment';

export default{

    state: {
        dateToday: '',
        dateFromNow: ''
    },

    mutations: {

        setToday: (state) => {
            state.dateToday = moment(new Date()).format('DD/MM/YYYY HH:mm');
        },

        setFromNow: (state, date) => {
            state.dateToday = moment(new Date()).format('DD/MM/YYYY HH:mm');
            state.dateFromNow = moment(date, 'DD-MM-YYYY HH:mm').locale('es').fromNow();
        }
    },

    getters: {
        viewFromNowDate: (state) => {
            return state.dateFromNow;
        },

        viewTodayDate: (state) => {
            return state.dateToday;
        },

        viewTodayDateHeader: () => {
            let  dayName = moment().locale('es').format("dddd");
            dayName = dayName[0].toUpperCase() + dayName.substr(1);

            const dayNum = moment().locale('es').format("D");
            const month = moment().locale('es').format("MMMM");
            return(dayName + ' ' + dayNum + ' de ' + month);
        }
    }

}