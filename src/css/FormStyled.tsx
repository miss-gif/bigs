import styled from "@emotion/styled";

export const FormStyled = styled.form`
  fieldset {
    margin-bottom: 15px;
    text-align: left;

    legend {
      visibility: hidden;
      overflow: hidden;
      height: 1px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
