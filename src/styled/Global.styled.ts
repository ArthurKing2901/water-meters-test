import styled from 'styled-components';
import ColdWaterIcon from '../styled/icons/CWA.png';

export const H3 = styled.h3`
  font-weight: 500;
  font-size: 28px;
  margin-top: 0;
  margin-bottom: 16px;
  padding: 0;
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;
  border: 1px solid #f0f3f7;
`;

export const Header = styled.th`
  padding: 8px 12px;
  position: sticky;
  top: 0;
  text-align: left;
  font-size: 18px;
  font-weight: 500;

  background: #f0f3f7;
`;

export const Pagination = styled.div`
  height: 48px;
  padding: 0 4px;
  border: 1px solid #f0f3f7;
  border-collapse: collapse;
  display: flex;
  align-items: center;
  justify-content: right;
`;

export const Button = styled.button`
  width: 32px;
  height: 32px;
  margin: 4px;
`;

export const Row = styled.tr`
  height: 52px;

  align-items: center;

  border: 1px solid #f0f3f7;
  border-collapse: collapse;

  &:hover {
    background-color: #f7f8f9;
  }
`;

export const DeleteButton = styled.button`
  margin: 0;
  padding: 0;

  display: none;
  border: none;
  background: none;

  img {
    margin: 0;
    width: 40px;
    height: 40px;
  }

  &:hover {
    cursor: pointer;
  }

  ${Row}:hover & {
    display: flex;
  }
`;
