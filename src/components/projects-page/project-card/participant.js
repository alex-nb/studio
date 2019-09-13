import React, {Fragment} from 'react';
import {Modal, Button} from 'react-bootstrap';
import PeopleList from "../people-list";

const Participant = (props) => {
    const {departments, infoDepartments, participants, ...modalProps} = props;
    const _departmentsInfo =() => {
        if (!infoDepartments) return null;
        return infoDepartments.map((dept) => {
            const participantsList =  participants.filter(people => people.idDept===dept.idDept).map((people) => {
                return <PeopleList
                    key={`${people.idEmployee._id}-${dept.idDept}`}
                    name={people.idEmployee.name}
                    img={people.idEmployee.img}
                    revenue={people.revenue}
                />;
            });
            return (
                <Fragment key={dept.idDept}>
                    {dept.nameDept} : {dept.cost}Y;
                    <br />
                    <strong>Часы: </strong> <span title="Фактические">{dept.hoursFact ? dept.hoursFact : 0}h</span>/<span title="Планируемые">{dept.hoursPlan}h</span>
                    <br />
                        Участники: {participantsList}
                    <hr/>
                </Fragment>
            );
        });
    };

    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Участники проекта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {_departmentsInfo()}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onHide()}>Закрыть</Button>
            </Modal.Footer>
        </Modal>

    );
};

export default Participant;