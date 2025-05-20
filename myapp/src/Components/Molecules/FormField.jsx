import React from "react";
import styled from "styled-components";
import Input from "../Atoms/ming/SignupInput";
import { Label } from "../Atoms/ming/Typography";

const FieldContainer = styled.div`
  width: 100%;
`;

const FormField = ({ label, id, error, ...props }) => {
  return (
    <FieldContainer>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} error={error} {...props} />
    </FieldContainer>
  );
};

export default FormField;
