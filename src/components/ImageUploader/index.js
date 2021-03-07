import React from 'react';
import './custom.scss';

import {
    uploadImageToBackend
} from "../../api";

export default class ImageUploader extends React.Component {
    state = {
        uploaded: null
    }

    constructor(props) {
        super(props);
        this.imgFormRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            uploaded: this.props.images
        })
    }

    displayUploaded = (data, idx) => {
        return (
            <div className="image__row" key={idx}>
                {data}
                <img className="image" src={data} />
            </div>
        )
    }

    imageUploaderForm = () => {
        return (
            <div>
                <input
                    ref={this.imgFormRef}
                    type="file"
                    id="file_name"
                    onChange={this.uploadImage}
                />
            </div>
        )
    }

    render = () => {
        if(!this.state.uploaded) {
            return null;
        }

        return (
            <div className="image__uploader">
                {this.imageUploaderForm()}
                {this.state.uploaded.length > 0 && 
                    this.state.uploaded.map(
                        (data, idx) => this.displayUploaded(data, idx)
                    )}
            </div>
        );
    }

    uploadImage = () => {
        let file = this.imgFormRef.current.files[0];
        
        const reader = new FileReader();
        const this_ = this;
        reader.readAsDataURL(file);
        reader.onload = () => {
            uploadImageToBackend(this.props.page, reader.result)
            .then(
                data => {
                    let uploaded = this_.state.uploaded;
                    uploaded.push(data.url);
                    this_.setState({
                        uploaded: uploaded
                    }, () => {
                        this_.imgFormRef.current.value = "";
                    });
                }
            )
        };
    }
}

const log = (...msg) => {
    console.log("[ImageUploader]", ...msg);
}