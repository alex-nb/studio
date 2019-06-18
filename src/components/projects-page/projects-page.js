import React, { Component } from 'react';
import { compose } from '../../utils';
import { connect } from 'react-redux';
import { fetchAllProjects, fetchPersonalReports } from '../../actions/projects';
import { withBdApiService } from '../hoc';

import Projects from "./projects/projects";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";
import ProjectCard from "./project-card";
import { withRouter } from 'react-router-dom';

class ProjectsPage extends Component {

    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchPersonalReports();
    }

    render() {
        const {
            projectsClose, projectsProcess, projectsNew, personalReports,
            loadingProcess, loadingClose, loadingNew, loadingPersonalReports,
            errorProjectsProcess, errorProjectsClose, errorProjectsNew, errorPersonalReports
        } = this.props;

        const elementsPrNew = (loadingNew) ? <Spinner/> : (errorProjectsNew) ? <ErrorMessage /> : projectsNew.map((project) => {
            return (
                <ProjectCard key={project._id} project={project} editProject={(id) => this.props.history.push(`${id}`)}/>

            );
        });

        const elementsPrProc = (loadingProcess || loadingPersonalReports) ? <Spinner/> : (errorProjectsProcess || errorPersonalReports) ? <ErrorMessage /> : projectsProcess.map((project) => {
            return (
                <ProjectCard key={project._id} project={project} personalReports={personalReports[project.id]} editProject={(id) => this.props.history.push(`${id}`)}/>

            );
        });

        const elementsPrClose = (loadingClose || loadingPersonalReports) ? <Spinner/> : (errorProjectsClose || errorPersonalReports) ? <ErrorMessage /> : projectsClose.map((project) => {
            return (
                <ProjectCard key={project._id} project={project} personalReports={personalReports[project.id]}/>

            );
        });

        return(<Projects elementsPrProc={elementsPrProc} elementsPrClose={elementsPrClose} elementsPrNew={elementsPrNew} />);
    }
}


const mapStateToProps = ({
                             projectsClose, projectsProcess, projectsNew, personalReports,
                             loadingProcess, loadingClose, loadingNew, loadingPersonalReports,
                             errorProjectsProcess, errorProjectsClose, errorProjectsNew, errorPersonalReports,
                             studioProject
                         }) => {
    return {
        projectsClose, projectsProcess, projectsNew, personalReports,
        loadingProcess, loadingClose, loadingNew, loadingPersonalReports,
        errorProjectsProcess, errorProjectsClose, errorProjectsNew, errorPersonalReports,
        studioProject
    };
};

const mapDispatchToProps = (dispatch, { bdApiService }) => {
    return {
        fetchAllProjects: fetchAllProjects(bdApiService, dispatch),
        fetchPersonalReports: fetchPersonalReports(bdApiService, dispatch)
    };
};

export default compose(
    withBdApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(withRouter(ProjectsPage));



