import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
 width: 220px;
  background-color: #000; /* Black background */
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif; /* Poppins font */
`;

const SidebarLink = styled(Link)`
  display: block;
  padding: 10px;
  color: #fff; /* White text */
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &:hover {
    background-color: #1e90ff; /* Blue background on hover */
    color: #fff; /* White text on hover */
  }
  
  &:active {
    background-color: #1c86ee; /* Darker blue when clicked */
  }
`;

function Side() {
  return (
    <SidebarContainer>
      <SidebarLink to="/orcamentosrecebidos">Orçamentos Recebidos</SidebarLink>
      <SidebarLink to="/gestao-orcamentos">Gestão de Orçamentos</SidebarLink>
      <SidebarLink to="/ordens-finalizadas">Ordens Finalizadas</SidebarLink>
    </SidebarContainer>
  );
}

export default Side;
