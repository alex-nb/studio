import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
//import Spinner from "../layout/spinner";
//import ErrorMessage from "../layout/error-message";
import {Card, Button} from 'react-bootstrap';
import "./personal-info.css";
import EditPersonalInfo from "./edit-personal-info";
import axios from "axios";

class PersonalInfo  extends Component {

    state = {
        showModalEditForm: false
    };

    changeStateModalEditForm = () => {
        this.setState({ showModalEditForm: !this.state.showModalEditForm })
    };

    render() {
        const {info, departments} = this.props;
        return (
            <Fragment>
                <div className="col-md-10 float-right">
                    <Card className="text-center profile-card">
                        <Card.Img variant="top" src={axios.defaults.baseURL+info.img} className="profile-img"/>
                        <Card.Body>
                            <Card.Title>{info.name}</Card.Title>
                            <Card.Text>
                                Email: {info.email}
                            </Card.Text>
                            <Card.Footer>
                                {departments && departments.map(dept => <span key={dept._id}>{dept.title}<br/></span>)}
                            </Card.Footer>
                            <Button variant="primary" onClick={() => this.changeStateModalEditForm()}>Редактировать</Button>
                        </Card.Body>
                    </Card>
                </div>
                <EditPersonalInfo
                    show={this.state.showModalEditForm}
                    onHide={this.changeStateModalEditForm}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({ personalInfo }) => {
    const { info, departments } = personalInfo;
    return {
        info, departments
    };
};

export default connect(mapStateToProps)(PersonalInfo);