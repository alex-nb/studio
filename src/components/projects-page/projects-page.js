import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAllProjects, fetchPersonalReports } from '../../actions/projects';

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

        return(
            <div className="col-md-10 float-right">
                <Projects elementsPrProc={elementsPrProc} elementsPrClose={elementsPrClose} elementsPrNew={elementsPrNew} />
            </div>
        );
    }
}


const mapStateToProps = ({ projectsList }) => {
    const {
        projectsClose, projectsProcess, projectsNew, personalReports,
        loadingProcess, loadingClose, loadingNew, loadingPersonalReports,
        errorProjectsProcess, errorProjectsClose, errorProjectsNew, errorPersonalReports,
        studioProject
    } = projectsList;
    return {
        projectsClose, projectsProcess, projectsNew, personalReports,
        loadingProcess, loadingClose, loadingNew, loadingPersonalReports,
        errorProjectsProcess, errorProjectsClose, errorProjectsNew, errorPersonalReports,
        studioProject
    };
};

export default connect(mapStateToProps, {fetchAllProjects, fetchPersonalReports})(withRouter(ProjectsPage));



