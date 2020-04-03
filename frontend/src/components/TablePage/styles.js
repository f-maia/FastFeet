import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export default createGlobalStyle`
  table{
    font-size: 16px;

    thead {
      tr {
        font-weight: bold;
      }
    }

    tbody {
      tr {
        background: #fff;
        margin-bottom: 21px;
        border-radius: 4px;
      }
    }

    tr {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 57px;
      padding: 0 20px;

      td, th {
        flex: 1;
        justify-content: flex-start;

        &:first-child {
          width: 100px;
          max-width: 100px;
          justify-content: flex-start;
        }

        &:last-child {
          justify-content: flex-end;
        }

        ${({ customStyle }) => customStyle}
      }

      th {
        display: flex;
        color: #444;

        &:last-child {
          width: 100px;
          max-width: 100px;
        }
      }

      td {
        display: flex;
        align-items: center;
        color: #666;
        line-height: 20px;

        &:last-child {
          margin: 0 12.5px;
          width: 75px;
          max-width: 75px;
          justify-content: flex-end;
        }

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }

      }
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 34px;
  width: 1200px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FiltersOption = styled.div`
  display: flex;
`;

export const SearchField = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  width: 237px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0px 16px;

  input {
    flex: 1;
    margin-left: 5px;
    border: none;
    font-size: 14px;
    color: #999;
  }
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;

  label {
    font-size: 14px;
    color: #999;
    margin-right: 5px;
  }
`;

export const RegisterButton = styled(Link)`
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: #7d40e7;
  width: 142px;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;

  span {
    margin-left: 7px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #444;
  margin-bottom: 34px;
`;
