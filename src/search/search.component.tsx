import { useDelayedSearch } from './delayed-search.hook';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

type SearchProps = {
  onSubmit: (value: string) => void;
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  background: #343a40;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.5);
  z-index: 1000;
  border-radius: 0.25rem;
`;

const SuggestionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #f8f9fa;
  &:hover {
    background-color: #495057;
  }
`;

const Highlight = styled.span`
  color: #0dcaf0; // Bootstrap's "info" color, bright cyan
  font-weight: bold;
`;

const Search = ({ onSubmit }: SearchProps) => {
  const [inputValue, setInputValue] = useDelayedSearch(onSubmit);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Static data for demonstration, now properly defined within the component
  const allSuggestions = [
    'Suggestion 1', 'Suggestion 2', 'Suggestion 3', 'Suggestion 4', 'Suggestion 5',
    'Suggestion 6', 'Suggestion 7', 'Suggestion 8', 'Suggestion 9', 'Suggestion 10'
  ];

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search.split('').join('|')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => regex.test(part) ? <Highlight key={index}>{part}</Highlight> : part);
  };

  const fetchSuggestions = (value: string) => {
    if (value.length > 0) {
      let filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredSuggestions.length === 0) {
        filteredSuggestions = allSuggestions.filter(suggestion =>
          value.toLowerCase().split('').every(char =>
            suggestion.toLowerCase().includes(char))
        );
      }

      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit the number of suggestions to 5
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement || document.activeElement !== inputRef.current) {
        setSuggestions([]);
      }
    }, 150);
  };

  return (
    <SearchContainer>
      <input
        ref={inputRef}
        className="form-control"
        type="text"
        name="search"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Search for diagrams..."
      />
      {suggestions.length > 0 && (
        <SuggestionsDropdown>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index} onClick={() => {
              setInputValue(suggestion);
              setSuggestions([]);
              onSubmit(suggestion);
            }}>
              {highlightMatch(suggestion, inputValue)}
            </SuggestionItem>
          ))}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  )
}

export { Search };
