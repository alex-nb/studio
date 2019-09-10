import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Spinner from "../layout/spinner";
//import ErrorMessage from "../layout/error-message";
import {Card, Button} from 'react-bootstrap';
import "./personal-info.css";

class PersonalInfo  extends Component {


    render() {
        const {info, departments} = this.props;
        return (
            <div className="col-md-10 float-right">
                <Card className="text-center profile-card">
                    <Card.Img variant="top" src={info.img} className="profile-img"/>
                    <Card.Body>
                        <Card.Title>{info.name}</Card.Title>
                        <Card.Text>
                            Email: {info.email}
                        </Card.Text>
                        <Card.Footer>
                            {departments && departments.map(dept => <span key={dept._id}>{dept.title}<br/></span>)}
                        </Card.Footer>
                        <Button variant="primary">Редактировать</Button>
                    </Card.Body>
                </Card>
            </div>
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