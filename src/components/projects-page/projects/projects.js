import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button';

import './projects.css';
export default class Projects extends Component {
    state = {
        tabProjectsNew: true,
        tabProjectsProcess: true,
        tabProjectsClose: false
    };

    render() {
        const {
            elementsPrProc, elementsPrClose, elementsPrNew
        } = this.props;

        const { tabProjectsProcess, tabProjectsClose, tabProjectsNew } = this.state;
        return(
            <>
                {elementsPrNew ? (
                    <>
                    <Button
                        block variant="outline-primary"
                        onClick={() => this.setState({ tabProjectsNew: !tabProjectsNew })}
                        aria-controls="collapse-new-projects"
                        aria-expanded={tabProjectsNew}
                        className="project-button"
                    >
                        Новые проекты
                    </Button>
                    <Collapse in={tabProjectsNew}>
                        <div id="collapse-new-projects" className="project-card">
                            { elementsPrNew }
                        </div>
                    </Collapse></>): null}

                <Button

                    block variant="outline-primary"
                    onClick={() => this.setState({ tabProjectsProcess: !tabProjectsProcess })}
                    aria-controls="collapse-open-projects"
                    aria-expanded={tabProjectsProcess}
                    className="project-button"
                >
                Текущие проекты
                </Button>
                <Collapse in={tabProjectsProcess}>
                    <div id="collapse-open-projects" className="project-card">
                        { elementsPrProc }
                    </div>
                </Collapse>
                <Button
                    block variant="outline-primary"
                    onClick={() => this.setState({ tabProjectsClose: !tabProjectsClose })}
                    aria-controls="collapse-close-projects"
                    aria-expanded={tabProjectsClose}
                    className="project-button"
                >
                    Закрытые проекты
                </Button>
                <Collapse in={tabProjectsClose}>
                    <div id="collapse-close-projects" className="project-card">
                        { elementsPrClose }
                    </div>
                </Collapse>
            </>
        );
    }
}

