import React, { useState } from "react";
import styled from "styled-components";
import FormField from "./FormField";
import Button from "../Atoms/SignupButton";
import { Text } from "../Atoms/Typography";

const AddressContainer = styled.div`
  margin-bottom: 20px;
`;

const AddressButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const DaumAddressField = ({ address, setAddress, error }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.roadAddress);
        setIsAddressModalOpen(false);
      },
    }).open();
  };

  return (
    <AddressContainer>
      <AddressButtonWrapper>
        <FormField
          label="주소"
          id="addr"
          name="addr"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          error={error}
          placeholder="주소 검색을 클릭하세요"
          readOnly
        />
        <Button
          type="button"
          onClick={openAddressModal}
          style={{ marginTop: "32px", height: "44px" }}
        >
          주소 검색
        </Button>
      </AddressButtonWrapper>
      {!isAddressModalOpen && (
        <Text style={{ fontSize: "14px", color: "#888" }}>
          ※ '주소 검색' 버튼을 클릭하여 정확한 주소를 입력해주세요
        </Text>
      )}
    </AddressContainer>
  );
};

export default DaumAddressField;
