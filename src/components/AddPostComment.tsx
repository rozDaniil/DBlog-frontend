import React, { FC, useState } from "react";
import { PictureOutlined } from "@ant-design/icons";
import { Input, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { fetchAddComment } from "../redux/slices/comment/commentSlice";

const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface AddPostCommentProps {}

export const AddPostComment: FC<AddPostCommentProps> = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { id } = useParams();

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const addCommentHandler = () => {
    dispatch(fetchAddComment({ text: value, postId: id }));
    setValue("");
  };

  return (
    <div className="addPostContainer">
      <div className="addPostContainer--control">
        <Upload
          className="upload"
          action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={() => setFileList([])}
        >
          {fileList.length < 1 && <PictureOutlined />}
        </Upload>

        {(value.length > 0 || fileList.length >= 1) && (
          <button onClick={addCommentHandler} className="button btn--type-3">
            Отправить
          </button>
        )}
      </div>

      <TextArea
        style={{ paddingBottom: fileList.length >= 1 ? "125px" : "50px" }}
        className="fullPost__addComment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ваш комментарий"
        autoSize={{ minRows: fileList.length >= 1 ? 7 : 4 }}
      />

      <Modal
        visible={previewVisible}
        title={previewTitle}
        onCancel={handleCancel}
        footer={null}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
