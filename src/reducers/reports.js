import { reportsPageTypes } from '../actions/types';

const initialState = {
    allReports: [],
    loadingAllReports: true,
    errorAllReports: null,
    errorAddReport: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case reportsPageTypes.ALL_REPORTS_GET:
            return {
                ...state,
                allReports: action.payload,
                loadingAllReports: false,
                errorAllReports: null
            };

        case reportsPageTypes.ALL_REPORTS_GET_FAILURE:
            return {
                ...state,
                allReports: {},
                loadingAllReports: false,
                errorAllReports: action.payload
            };

        case reportsPageTypes.UPDATE_REPORT:
            const report = action.payload;
            return {
                ...state,
                allReports: state.allReports.map(project => {
                    const index = project.reports.findIndex(report => report.idReport._id === action.payload._id);
                    if (index > -1) {
                        project.reports[index].idReport = report;
                        project.hoursFact = project.hoursFact+Number(report.hoursStudy)+Number(report.hoursWork);
                        project.hoursBad = project.hoursBad+(Number(report.hoursStudy)+Number(report.hoursWork))-(Number(report.acceptedHoursStudy)+Number(report.acceptedHoursWork));
                        project.hoursBadWork = project.hoursBadWork+Number(report.hoursWork)-Number(report.acceptedHoursWork);
                        project.hoursBadStudy = project.hoursBadStudy+Number(report.hoursStudy)-Number(report.acceptedHoursStudy);
                    }
                    return project;
                }),
                loadingAllReports: false,
                errorAllReports: null
            };

        case reportsPageTypes.UPDATE_REPORT_FAILURE:
            return {
                ...state,
                loadingAllReports: false,
                errorAllReports: action.payload
            };
        default:
            return state;
    }

};