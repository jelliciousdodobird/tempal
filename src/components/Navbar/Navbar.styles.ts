import styled from "@emotion/styled";

// import
import { contentCenter } from "../../styles/content-centerer";
import { changeColorOpacity } from "../../styles/theme/Theme.utils";

export const Container = styled.nav`
  position: relative;

  height: 5rem;

  background-color: ${({ theme }) =>
    changeColorOpacity(theme.colors.surface[5], 0.95)};

  backdrop-filter: blur(5px);

  border-bottom: 1px solid ${({ theme }) => theme.colors.surface[7]};

  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  /* border: 2px dashed orange; */

  ${({ theme }) => contentCenter(theme)}

  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 1rem;
`;

export const Item = styled.li`
  color: white;
`;

export const StretchedItem = styled(Item)`
  flex: 1;
`;
