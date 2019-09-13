import React from 'react';
import './people-list.css';
import {Card} from "react-bootstrap";
import axios from "axios";

const PeopleList = ({name, img, revenue}) => {
    //const {id, name, deptID, deptName} = this.props;
    return (
        <Card className="participant" title={name}>
            <Card.Img src={axios.defaults.baseURL+img} className="participant-img" />
            <small className="text-muted form-text">{revenue}</small>
        </Card>
    );
};
export default PeopleList;