import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter} from "react-router-dom";
import {Form,Button} from "react-bootstrap";
import { createProject } from '../../../actions/projects';

import Can from "../../../utils/can";

class CreateProject extends Component {

    state = {
        title: ''
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.createProject(this.state, this.props.history);
    };

    render() {
        return (
            <Can
                roles={this.props.roles}
                perform="projects:create"
                yes={() => (
                    <div className="col-md-10 float-right">
                        <Form onSubmit={this.onSubmit}>
                            <legend>Создание проекта </legend>
                            <Form.Group>
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                    required type="text" placeholder="Название проекта"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                            </Form.Group>
                            <Button type="submit"  variant="primary"
                                    disabled={this.props.loadingUpdateProject}>
                                {this.props.loadingUpdateProject ? 'Секунду...' : 'Сохранить'}
                            </Button>
                        </Form>
                    </div>
                )}
                no={() => (<div className="col-md-10 float-right"><h3>Извините, доступ запрещен.</h3></div>)}
            />

        );
    }
}

const mapStateToProps = ({projectsList, auth }) => {
    const { loadingUpdateProject } = projectsList;
    const { roles } = auth;
    return {
        roles, loadingUpdateProject
    };
};

export default connect(mapStateToProps, { createProject })(withRouter(CreateProject));