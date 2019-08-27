import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAllProjects } from '../../actions/projects';

import Projects from "./projects/projects";
import Spinner from "../layout/spinner";
import ErrorMessage from "../layout/error-message";
import ProjectCard from "./project-card";

class ProjectsPage extends Component {

    state = {
      costPrNew: 0,
      costPrProcess: 0,
      costPrClose: 0,
    };

    componentDidMount() {
        this.props.fetchAllProjects();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projectsNew !== this.props.projectsNew && this.state.costPrNew===0) {
            this.props.projectsNew.forEach((project) => {
                this.setState(prevState => ({
                    costPrNew: project.costTotal ? Number(project.costTotal)+prevState.costPrNew : prevState.costPrNew
                }));
            });
        }
        if (prevProps.projectsProcess !== this.props.projectsProcess && this.state.costPrProcess===0) {
            this.props.projectsProcess.forEach((project) => {
                this.setState(prevState => ({
                    costPrProcess: project.costTotal ? Number(project.costTotal)+prevState.costPrProcess : prevState.costPrProcess
                }));
            });
        }
        if (prevProps.projectsClose !== this.props.projectsClose && this.state.costPrClose===0) {
            this.props.projectsClose.forEach((project) => {
                this.setState(prevState => ({
                    costPrClose: project.costTotal ? Number(project.costTotal)+prevState.costPrClose : prevState.costPrClose
                }));
            });
        }
    }

    _projectsNewCards() {
        const { projectsNew, loadingNew, errorProjectsNew } = this.props;
        if (loadingNew) return  <Spinner/>;
        if (errorProjectsNew) return  <ErrorMessage/>;
        return projectsNew.map((project) => {
            return <ProjectCard key={project._id} project={project}/>;
        });
    }

    _projectsProcessCards() {
        const {
            projectsProcess, loadingProcess, errorProjectsProcess
        } = this.props;
        if (loadingProcess) return  <Spinner/>;
        if (errorProjectsProcess) return  <ErrorMessage/>;
        return projectsProcess.map((project) => {
            return <ProjectCard key={project._id} project={project} reports={project.reports}/>;
        });
    }

    _projectsCloseCards() {
        const {
            projectsClose, loadingClose, errorProjectsClose,
        } = this.props;
        if (loadingClose) return  <Spinner/>;
        if (errorProjectsClose) return  <ErrorMessage/>;
        return projectsClose.map((project) => {
            return <ProjectCard key={project._id} project={project} reports={project.reports}/>;
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
                <Projects projects={projects} totalCosts={this.state}/>
            </div>
        );
    }
}


const mapStateToProps = ({ projectsList }) => {
    const {
        projectsClose, projectsProcess, projectsNew,
        loadingProcess, loadingClose, loadingNew,
        errorProjectsProcess, errorProjectsClose, errorProjectsNew,
        studioProject
    } = projectsList;
    return {
        projectsClose, projectsProcess, projectsNew,
        loadingProcess, loadingClose, loadingNew,
        errorProjectsProcess, errorProjectsClose, errorProjectsNew,
        studioProject
    };
};

export default connect(mapStateToProps, {fetchAllProjects})(ProjectsPage);



