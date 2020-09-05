import React from "react"
import FileUploadProgress  from 'react-fileupload-progress';

// import FileUpload from "react-fileupload-provisional"
import FileUpload from "component/fileuploader/reactfileuploader.jsx";

import {Button, Icon, Image, Input, Progress} from "semantic-ui-react";
import utils from "utils/utils.jsx";

import CommonModal from "component/common-modal/index.jsx";
import _ from "lodash"

import "./index.scss"
import userService from "service/user.jsx";

class ProgressFileUploader extends React.Component {
    render() {
        return (
            <div>
                <h3>Default style</h3>
                <FileUploadProgress method={"post"} key='ex1' url='http://localhost:3000/api/upload'
                                    onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
                                    onLoad={ (e, request) => {console.log('load', e, request);}}
                                    onError={ (e, request) => {console.log('error', e, request);}}
                                    onAbort={ (e, request) => {console.log('abort', e, request);}}
                />
            </div>
        )
    }
}


class FileUploader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choose: "",
            choose_image: utils.imageHost("null_image.png"),
            progress_percent: 0,
            success: false,
            tag: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue && !this.state.tag) {

            console.log("UNSAFE_componentWillReceiveProps", nextProps.defaultValue, nextProps.defaultImage)
            this.setState({
                tag: true,
                success: true,
                choose: nextProps.defaultValue,
                choose_image: nextProps.defaultImage
            })
        }

    }

    onChooseFile(filename) {
        if (filename === "") {
            return;
        }

        this.delImage(() => {
            this.setState({
                choose: filename
            })
        })
    }

    onStartUpLoad() {
        this.BarRef && this.BarRef.open()
    }
    onUploading(percent) {
        this.setState({
            progress_percent: percent
        })
    }

    success(success) {
        this.setState({
            success
        })

        this.BarRef && this.BarRef.close()
    }

    resetBar() {
        this.setState({
            progress_percent: 0,
        })
    }

    delImage(callback) {

        if (!this.state.success) {
            if (callback) callback()
            return;
        }

        if (this.state.choose === "") {
            if (callback) callback()
            return
        }

        userService.delImage(this.state.choose).then(res => {
            this.setState({
                choose_image: utils.imageHost("null_image.png"),
                success:false,
                choose: ""
            })

            this.resetBar()
            if (callback) callback()
        }, err => {
            if (callback) callback()
            utils.errorTips(err)
        })
    }

    render() {
        if (!userService.checkUserHasLogin()) {
            return (
                <div>
                    请先登录....
                </div>
            )
        }
        let userInfo = userService.getUserInfo();

        const options = {
            baseUrl : utils.uploadImageHost(),
            fileFieldName : 'upload_file',
            param:{
                username : userInfo.username
            },
            wrapperDisplay: 'block',
            dataType : 'json',
            accept: 'image/*',
            timeout: 5000,
            withCredentials: false,
            chooseFile : (files) => {
                let filename = typeof files == 'string' ? files : (files.length ? files[0].name : "");
                this.onChooseFile(filename)
            },
            beforeUpload : function(files,mill){
                if(typeof files === 'string') return true

                console.log("files", files, mill)
                if (!_.isObject(files) || !Object(files).length) {
                    return false;
                }


                if (files[0] === undefined || files[0].size === undefined) {
                    return false;
                }

                if(files[0].size<1024*1024*20){
                    files[0].mill = mill
                    return true
                }
                return false
            },
            doUpload : (files,mill) => {
                let filename = typeof files == 'string' ? files : (files.length ? files[0].name : "");
                this.onStartUpLoad(filename)
            },
            uploading : (progress) => {
                var percent = Math.floor( progress.loaded / progress.total * 100);
                this.onUploading(percent)
            },
            chooseAndUpload : false,
            uploadSuccess : (res) => {
                if (res.status === -1) {
                    utils.errorTips(res.data.msg)
                } else {
                    let tmp = res.data.image_path.split("/");
                    if (tmp.length < 2) {
                        console.error("invalid image path", res.data.image_path)
                        return;
                    }
                    let imageName = tmp[tmp.length-1]

                    this.setState({
                        choose_image: utils.uploadedImageHost(res.data.image_path),
                        choose: imageName
                    })

                    this.success(true)
                    this.props.onUploadSuccess(imageName);

                    utils.successTips("上传成功")
                }
                this.resetBar();
            },
            uploadError : (err) => {
                console.log("uploadError", err)
                this.resetBar();
                this.BarRef && this.BarRef.close()
            }
        }
        return (
            <FileUpload options={options}>

                <Input
                    className={"upload-input"}
                    ref={"chooseBtn"}
                    value={this.state.choose}
                    iconPosition='left'
                    icon={<Icon name='folder'/>}
                    placeholder='请选择图片...'
                />
                <Button className={"upload-btn"}  ref={"uploadBtn"}>上传</Button>

                <div className={"img-container"}>
                    <Image src={this.state.choose_image} size='tiny' className={"img"} />
                    {
                        this.state.success ? <Button size="mini" color={"red"} icon={"delete"} onClick={() => this.delImage() } className={"btn"}/> : ""
                    }
                </div>

                <CommonModal onRef={(ref) => this.BarRef = ref } tips={"上传图片..."}>
                    <Progress  percent={this.state.progress_percent} indicating />
                </CommonModal>
            </FileUpload>
        )
    }
}

export {
    ProgressFileUploader,
    FileUploader
}