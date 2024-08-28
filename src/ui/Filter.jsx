import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter() {
  //store the value into the URL
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    //we are going the pass the value into URL
    //at the beginning, the URL did not have any query params, we we need to set the params first
    searchParams.set("discount", value);
    //pass the searchParams into the setter to trigger re-render
    setSearchParams(searchParams);
  }
  return (
    <StyledFilter>
      <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
      <FilterButton onClick={() => handleClick("no-discount")}>
        No discount
      </FilterButton>
      <FilterButton onClick={() => handleClick("with-discount")}>
        With discount
      </FilterButton>
    </StyledFilter>
  );
}

export default Filter;
