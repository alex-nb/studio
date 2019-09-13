import React, { Component } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {connect} from "react-redux";
import ReactAvatarEditor from 'react-avatar-editor'
import {updatePersonalInfo} from '../../actions/personal-info';

class EditPersonalInfo extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        image: '',
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 200,
        height: 200,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.info.name !== this.props.info.name) this.setState({name: this.props.info.name});
        if(prevProps.info.email !== this.props.info.email) this.setState({email: this.props.info.email});
        if (prevProps.updatingPersonalInfo !== this.props.updatingPersonalInfo
            && !this.props.updatingPersonalInfo
            && this.props.errorPersonalInfo === null)  {
            this.props.onHide();
        }
    }

    handleNewImage = e => {
        this.setState({ image: e.target.files[0] });
    };

    handleScale = e => {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    };

    handlePositionChange = position => {
        this.setState({ position });
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        let formData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        if (this.state.image && this.editor) formData.img = this.editor.getImageScaledToCanvas().toDataURL();
        this.props.updatePersonalInfo(formData);
    };

    setEditorRef = (editor) => this.editor = editor;

    render() {
        const {info, dispatch, updatePersonalInfo, updatingPersonalInfo, errorPersonalInfo, ...props } = this.props;
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Редактирование
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmit}>
                    <Modal.Body>
                        <Form.Label>Новая аватарка</Form.Label>
                        <div>
                            <div>
                                <ReactAvatarEditor
                                    ref={this.setEditorRef}
                                    scale={parseFloat(this.state.scale)}
                                    width={this.state.width}
                                    height={this.state.height}
                                    position={this.state.position}
                                    onPositionChange={this.handlePositionChange}
                                    rotate={parseFloat(this.state.rotate)}
                                    borderRadius={this.state.width / (100 / this.state.borderRadius)}
                                    image={this.state.image}
                                    className="editor-canvas"
                                />
                            </div>
                            <input
                                name="scale"
                                type="range"
                                onChange={this.handleScale}
                                min={this.state.allowZoomOut ? '0.1' : '1'}
                                max="2"
                                step="0.01"
                                defaultValue="1"
                            />
                            <br />
                            <input name="newImage" type="file" onChange={this.handleNewImage} />
                        </div>
                        <hr/>
                        <Form.Group>
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control
                                required type="text" placeholder="Ваше имя"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Отмена</Button>
                        <Button type="submit">
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = ({ personalInfo }) => {
    const { info, updatingPersonalInfo, errorPersonalInfo } = personalInfo;
    return {
        info, updatingPersonalInfo, errorPersonalInfo
    };
};

export default connect(mapStateToProps, {updatePersonalInfo})(EditPersonalInfo);