import React, { useState } from 'react';
import Title from './Title';
import Text from '../../Atoms/susu/Text';

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 100;

const MediaUploader = ({ onFileSelect }) => {
  const [error, setError] = useState('');
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
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isVideo && !file.name.toLowerCase().endsWith('.mp4')) {
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

    setSelectedFiles(combinedFiles);
    setError('');
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
    <div>
        <Title>
          미디어 파일 업로드 (최대 {MAX_FILES}개, 개별 파일 최대 {MAX_FILE_SIZE_MB}MB, 영상은 mp4만)
        </Title>
        <input
          type="file"
          accept="image/*,video/mp4"
          multiple
          onChange={handleFileChange}
          name='media'
        />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Text>선택한 파일 수: {selectedFiles.length}</Text>
      <Text>선택한 파일 총 용량: {totalSizeMB} MB</Text>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {selectedFiles.map((file, idx) => {
          const isImage = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');

          return (
            <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
              {isImage && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                />
              )}
              {isVideo && (
                <video
                  src={URL.createObjectURL(file)}
                  autoPlay
                  muted
                  loop
                  controls
                  style={{ width: 120, height: 100, borderRadius: 8 }}
                />
              )}
              {!isImage && !isVideo && (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    textAlign: 'center',
                    padding: 4,
                  }}
                >
                  {file.name}
                </div>
              )}

              <button
                onClick={() => handleRemoveFile(idx)}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  lineHeight: '18px',
                  padding: 0,
                }}
                type="button"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaUploader;
