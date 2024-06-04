import styled from 'styled-components';

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
  border-collapse: collapse;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #f0f3f7;
`;

export const Header = styled.th`
  position: sticky;
  top: 0;
  text-align: left;
  font-weight: 500;
  background: #f0f3f7;
`;

export const Pagination = styled.div`
  padding: 0 4px;
  border: 1px solid #f0f3f7;
  border-collapse: collapse;
  display: flex;
  justify-content: right;
`;

export const Button = styled.button`
  margin: 4px;
`;

export const Row = styled.tr`
  border: 1px solid #f0f3f7;
  border-collapse: collapse;
  &:hover {
    background-color: #f7f8f9;
  }
`;

export const DeleteButton = styled.button`
    display: none;


    ${Row}:hover & {
        display: inline;
    }
\

}
`;
