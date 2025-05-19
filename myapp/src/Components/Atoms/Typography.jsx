import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
`;

export const Text = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: block;
`;

// Typography components for LoginPage
export const LoginTitle = styled.h1`
  font-size: ${(props) => props.fontSize || "2.5rem"};
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  text-align: ${(props) => props.align || "center"};
`;

export const LoginSubtitle = styled.h2`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-weight: 600;
  color: #555;
  margin-bottom: 20px;
  text-align: ${(props) => props.align || "center"};
`;

export const LoginText = styled.p`
  font-size: ${(props) => props.fontSize || "1rem"};
  color: ${(props) => props.color || "#666"};
  line-height: 1.5;
  margin-bottom: ${(props) => props.marginBottom || "15px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
`;

export const ErrorText = styled.p`
  color: #ff3860;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
`;

export const SuccessText = styled.p`
  color: #23d160;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
`;
