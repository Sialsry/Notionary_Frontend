import React, { useState } from "react";
import styled from "styled-components";
import { Upload, Image, Video, X } from "lucide-react";

const colors = {
  primary: "#667eea",
  secondary: "#764ba2",
  accent: "#f093fb",
  success: "#4ecdc4",
  warning: "#ffe066",
  info: "#74b9ff",
  danger: "#fd79a8",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 100;

const Wrapper = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin-bottom: 12px;
`;

const UploadArea = styled.div`
  border: 2px dashed #dee2e6;
  border-radius: 12px;
  padding: 32px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;

  &:hover {
    border-color: ${colors.primary};
    background: linear-gradient(135deg, #f8f9ff 0%, #fff5f8 100%);
    transform: translateY(-1px);
  }

  input[type="file"] {
    display: none;
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 16px;
  color: ${colors.primary};
`;

const UploadText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
`;

const UploadSubtext = styled.div`
  font-size: 12px;
  color: #6c757d;
  line-height: 1.4;
`;

const FileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 12px 16px;
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ffebee 0%, #fce4ec 100%);
  border: 1px solid #f8bbd9;
  border-radius: 8px;
  padding: 12px 16px;
  color: #c2185b;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
`;

const PreviewItem = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const PreviewVideo = styled.video`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

const PreviewFile = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  color: #495057;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.danger};
    transform: scale(1.1);
  }
`;

const MediaUploader = ({ onFileSelect }) => {
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const combinedFiles = [...selectedFiles, ...newFiles];

    if (combinedFiles.length > MAX_FILES) {
      setError(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
      e.target.value = null;
      return;
    }

    for (const file of newFiles) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (isVideo && !file.name.toLowerCase().endsWith(".mp4")) {
        setError(`영상 파일은 mp4 형식만 허용합니다: ${file.name}`);
        e.target.value = null;
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(
          `파일 "${file.name}"이(가) ${MAX_FILE_SIZE_MB}MB를 초과합니다.`
        );
        e.target.value = null;
        return;
      }

      if (!isImage && !isVideo) {
        setError(`지원하지 않는 파일 형식입니다: ${file.name}`);
        e.target.value = null;
        return;
      }
    }

    setSelectedFiles(combinedFiles);
    setError("");
    onFileSelect?.(combinedFiles);
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onFileSelect?.(updatedFiles);
  };

  const totalSizeMB = (
    selectedFiles.reduce((acc, file) => acc + file.size, 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <Wrapper>
      <Label>
        <Upload size={18} color={colors.primary} />
        미디어 파일 업로드
      </Label>

      <UploadArea>
        <input
          type="file"
          id="media-upload"
          accept="image/*,video/mp4"
          multiple
          onChange={handleFileChange}
          name="media"
        />
        <label
          htmlFor="media-upload"
          style={{ cursor: "pointer", display: "block" }}
        >
          <UploadIcon>
            <Upload size={32} />
          </UploadIcon>
          <UploadText>클릭하여 파일 선택</UploadText>
          <UploadSubtext>
            최대 {MAX_FILES}개 파일, 개별 파일 최대 {MAX_FILE_SIZE_MB}MB
            <br />
            이미지: JPG, PNG / 동영상: MP4
          </UploadSubtext>
        </label>
      </UploadArea>

      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

      {selectedFiles.length > 0 && (
        <FileInfo>
          <span>📁 선택한 파일: {selectedFiles.length}개</span>
          <span>💾 총 용량: {totalSizeMB} MB</span>
        </FileInfo>
      )}

      {selectedFiles.length > 0 && (
        <PreviewContainer>
          {selectedFiles.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");

            return (
              <PreviewItem key={idx}>
                {isImage && (
                  <PreviewImage
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                )}
                {isVideo && (
                  <PreviewVideo
                    src={URL.createObjectURL(file)}
                    autoPlay
                    muted
                    loop
                    controls
                  />
                )}
                {!isImage && !isVideo && <PreviewFile>{file.name}</PreviewFile>}
                <RemoveButton
                  onClick={() => handleRemoveFile(idx)}
                  type="button"
                >
                  <X size={14} />
                </RemoveButton>
              </PreviewItem>
            );
          })}
        </PreviewContainer>
      )}
    </Wrapper>
  );
};

export default MediaUploader;
