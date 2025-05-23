import React, { useState } from 'react';

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 100;

const MediaUploader = () => {
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > MAX_FILES) {
      setError(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
      e.target.value = null;
      return;
    }

    for (const file of files) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isVideo) {
        if (!file.name.toLowerCase().endsWith('.mp4')) {
          setError(`영상 파일은 mp4 형식만 허용합니다: ${file.name}`);
          e.target.value = null;
          return;
        }
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

    setSelectedFiles(files);
    setError('');
    e.target.value = null;
  };

  const totalSizeMB = (
    selectedFiles.reduce((acc, file) => acc + file.size, 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div>
      <label>
        미디어 파일 업로드 (최대 {MAX_FILES}개, 개별 파일 최대 {MAX_FILE_SIZE_MB}MB, 영상은 mp4만)
        <input
          type="file"
          accept="image/*,video/mp4"
          multiple
          onChange={handleFileChange}
          name='image'
        />
      </label>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>선택한 파일 수: {selectedFiles.length}</p>
      <p>선택한 파일 총 용량: {totalSizeMB} MB</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {selectedFiles.map((file, idx) => {
          if (file.type.startsWith('image/')) {
            return (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
              />
            );
          } else if (file.type.startsWith('video/')) {
            return (
              <video
                key={idx}
                src={URL.createObjectURL(file)}
                autoPlay
                muted
                loop
                controls
                style={{ width: 120, height: 100, borderRadius: 8 }}
              />
            );
          } else {
            return (
              <div
                key={idx}
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
            );
          }
        })}
      </div>
    </div>
  );
};

export default MediaUploader;
