import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAllProjects, fetchPersonalReports } from '../../actions/projects';

import Projects from "./projects/projects";
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import ProjectCard from "./project-card";

class ProjectsPage extends Component {

    componentDidMount() {
        this.props.fetchAllProjects();
        this.props.fetchPersonalReports();
    }


    _projectsNewCards() {
        const { projectsNew, loadingNew, errorProjectsNew } = this.props;
        if (loadingNew) return  <Spinner/>;
        if (errorProjectsNew) return  <ErrorMessage/>;
        return  projectsNew.map((project) => {
            return <ProjectCard key={project._id} project={project}/>;
        });
    }

    _projectsProcessCards() {
        const {
            projectsProcess, personalReports,
            loadingProcess, loadingPersonalReports,
            errorProjectsProcess, errorPersonalReports
        } = this.props;
        if (loadingProcess || loadingPersonalReports) return  <Spinner/>;
        if (errorProjectsProcess || errorPersonalReports) return  <ErrorMessage/>;
        return  projectsProcess.map((project) => {
            return <ProjectCard key={project._id} project={project} personalReports={personalReports[project._id]}/>;
        });
    }

    _projectsCloseCards() {
        const {
            projectsClose, personalReports,
            loadingClose, loadingPersonalReports,
            errorProjectsClose, errorPersonalReports
        } = this.props;
        if (loadingClose || loadingPersonalReports) return  <Spinner/>;
        if (errorProjectsClose || errorPersonalReports) return  <ErrorMessage/>;
        return  projectsClose.map((project) => {
            return <ProjectCard key={project._id} project={project} personalReports={personalReports[project._id]}/>;
        });
    }

    render() {
        const projects = {
            new: this._projectsNewCards(),
            process: this._projectsProcessCards(),
            close: this._projectsCloseCards()
        };
        return(
            <div className="col-md-10 float-right">
                <Projects projects={projects} />
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

export default connect(mapStateToProps, {fetchAllProjects, fetchPersonalReports})(ProjectsPage);



