import React, {Component, Fragment} from 'react';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button';
import './projects.css';
import Can from "../../../utils/can";
import {Link} from "react-router-dom";

export default class Projects extends Component {
    state = {
        tabProjectsNew: true,
        tabProjectsProcess: true,
        tabProjectsClose: false
    };

    _openTab(statusProjects) {
        switch (statusProjects) {
            case 'new':
                this.setState({ tabProjectsNew: !this.state.tabProjectsNew });
                break;
            case 'process':
                this.setState({ tabProjectsProcess: !this.state.tabProjectsProcess });
                break;
            case 'close':
                this.setState({ tabProjectsClose: !this.state.tabProjectsClose });
                break;
            default:
                break;
        }
    }

    _tabNewProjects() {
        const { projects, totalCosts } = this.props;
        const { tabProjectsNew } = this.state;
        return (
            <Fragment>
                <Button
                    block variant="outline-primary"
                    onClick={() => this._openTab('new')}
                    aria-controls="collapse-new-projects"
                    aria-expanded={tabProjectsNew}
                    className="project-button"
                >
                    <Can
                        roles={this.props.roles}
                        perform="projects:create"
                        yes={() => (
                            <span><Link to={`/projects/create`}><i className="far fa-plus-square fa-list pointer"/></Link></span>
                        )}
                        no={() => null}
                    />
                    Новые проекты
                    <p className="rightstr">{totalCosts.costPrNew} Y</p>
                </Button>
                <Collapse in={tabProjectsNew}>
                    <div id="collapse-new-projects" className="project-card">
                        { projects.new }
                    </div>
                </Collapse>
            </Fragment>
        );
    }

    render() {
        const { projects, totalCosts, roles } = this.props;
        const { tabProjectsProcess, tabProjectsClose } = this.state;
        return(
            <Fragment>
                <Can
                    roles={roles}
                    perform="projects:new"
                    yes={() => projects.new && this._tabNewProjects()}
                    no={() => null}
                />

                <Button
                    block variant="outline-primary"
                    onClick={() => this._openTab('process')}
                    aria-controls="collapse-open-projects"
                    aria-expanded={tabProjectsProcess}
                    className="project-button"
                >
                    Текущие проекты
                    <p className="rightstr">{totalCosts.costPrProcess} Y</p>
                </Button>

                <Collapse in={tabProjectsProcess}>
                    <div id="collapse-open-projects" className="project-card">
                        { projects.process }
                    </div>
                </Collapse>

                <Button
                    block variant="outline-primary"
                    onClick={() => this._openTab('close')}
                    aria-controls="collapse-close-projects"
                    aria-expanded={tabProjectsClose}
                    className="project-button"
                >
                    Закрытые проекты
                    <p className="rightstr">{totalCosts.costPrClose} Y</p>
                </Button>

                <Collapse in={tabProjectsClose}>
                    <div id="collapse-close-projects" className="project-card">
                        { projects.close }
                    </div>
                </Collapse>

            </Fragment>
        );
    }
}

