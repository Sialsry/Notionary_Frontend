import React, { useState, useEffect, useCallback } from "react";
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

// --- (스타일 컴포넌트들은 변경 없음) ---
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  color: #495057;
  word-break: break-all;
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

const MediaUploader = ({ files, setFiles, setNewFiles, existingFiles, onRemoveExistingFile }) => {
  const [error, setError] = useState("");
  const [internalNewFiles, setInternalNewFiles] = useState([]);

  // files prop이 변경될 때 internalNewFiles를 동기화
  useEffect(() => {
    const currentNewFiles = files.filter(file => file instanceof File);
    // 내용 비교를 통해 불필요한 업데이트 방지
    if (JSON.stringify(currentNewFiles.map(f => f.name)) !== JSON.stringify(internalNewFiles.map(f => f.name))) {
        setInternalNewFiles(currentNewFiles);
    }
  }, [files, internalNewFiles]); // internalNewFiles를 의존성에 추가하여 최신 값을 참조하도록 함

  const handleFileChange = useCallback((e) => {
    const newlySelectedFiles = Array.from(e.target.files);
    setError("");

    if ((existingFiles.length + internalNewFiles.length + newlySelectedFiles.length) > MAX_FILES) {
        setError(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
        e.target.value = null;
        return;
    }

    for (const file of newlySelectedFiles) {
        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (isVideo && !file.name.toLowerCase().endsWith(".mp4")) {
            setError(`영상 파일은 mp4 형식만 허용합니다: ${file.name}`);
            e.target.value = null;
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`파일 "${file.name}"이(가) ${MAX_FILE_SIZE_MB}MB를 초과합니다.`);
            e.target.value = null;
            return;
        }

        if (!isImage && !isVideo) {
            setError(`지원하지 않는 파일 형식입니다: ${file.name}`);
            e.target.value = null;
            return;
        }
    }

    const updatedInternalNewFiles = [...internalNewFiles, ...newlySelectedFiles];
    setInternalNewFiles(updatedInternalNewFiles);
    setNewFiles(updatedInternalNewFiles); // 부모의 `newFiles` 상태 업데이트

    setFiles([...existingFiles, ...updatedInternalNewFiles]); // 부모의 `files` 상태도 업데이트

    e.target.value = null;
  }, [existingFiles, internalNewFiles, setFiles, setNewFiles]);

  const handleRemoveFile = useCallback((fileToRemove) => {
    const isExistingFile = typeof fileToRemove === 'string';
    const isNewFile = fileToRemove instanceof File;

    if (isExistingFile) {
      if (onRemoveExistingFile) {
        onRemoveExistingFile(fileToRemove); // 부모의 existingFiles 상태 업데이트 요청
      }
      // `files` 상태도 업데이트 (기존 파일 URL 제거)
      setFiles(prevFiles => prevFiles.filter(f => f !== fileToRemove));

    } else if (isNewFile) {
      const updatedInternalNewFiles = internalNewFiles.filter(file => file !== fileToRemove);
      setInternalNewFiles(updatedInternalNewFiles);
      setNewFiles(updatedInternalNewFiles); // 부모의 newFiles 상태 업데이트

      // `files` 상태도 업데이트 (새로운 File 객체 제거)
      // 기존 파일 목록은 그대로 두고, 새로운 파일 목록에서만 제거된 후 합쳐짐
      setFiles(prevFiles => prevFiles.filter(f => f !== fileToRemove)); // files에서 해당 fileToRemove (File 객체) 제거

    }
  }, [existingFiles, internalNewFiles, setFiles, setNewFiles, onRemoveExistingFile]);


  const getFileNameAndType = (file) => {
    if (typeof file === 'string') {
      const parts = file.split('/');
      const name = parts[parts.length - 1];
      const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(name);
      const isVideo = /\.(mp4)$/i.test(name);
      return { name, isImage, isVideo, src: file };
    } else if (file instanceof File) {
      return {
        name: file.name,
        isImage: file.type.startsWith("image/"),
        isVideo: file.type.startsWith("video/"),
        src: URL.createObjectURL(file),
      };
    }
    return { name: "Unknown", isImage: false, isVideo: false, src: "" };
  };

  const totalSizeMB = (
    files.reduce((acc, file) => {
      if (file instanceof File) return acc + file.size;
      return acc;
    }, 0) / (1024 * 1024)
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

      {files.length > 0 && (
        <FileInfo>
          <span>📁 선택한 파일: {files.length}개</span>
          <span>💾 총 용량: {totalSizeMB} MB</span>
        </FileInfo>
      )}

      {files.length > 0 && (
        <PreviewContainer>
          {files.map((file, idx) => {
            const { name, isImage, isVideo, src } = getFileNameAndType(file);

            return (
              // 고유한 key를 위해 파일 이름과 파일 크기를 조합 (File 객체인 경우)
              // URL 문자열인 경우 URL 자체를 key로 사용
              <PreviewItem key={typeof file === 'string' ? file : `${file.name}-${file.size}`}>
                {isImage && (
                  <PreviewImage
                    src={src}
                    alt={name}
                  />
                )}
                {isVideo && (
                  <PreviewVideo
                    src={src}
                    autoPlay
                    muted
                    loop
                    controls
                  />
                )}
                {!isImage && !isVideo && (
                  <PreviewFile>
                    <Image size={24} color={colors.secondary} />
                    {name}
                  </PreviewFile>
                )}
                <RemoveButton
                  onClick={() => handleRemoveFile(file)}
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