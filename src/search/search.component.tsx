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

const SuggestionLink = styled.a`
  display: block;
  padding: 8px 16px;
  color: #f8f9fa;
  text-decoration: none;
  &:hover, &:focus {
    background-color: #495057;
    color: #f8f9fa;
    text-decoration: none;
  }
`;

const Highlight = styled.span`
  color: #0dcaf0; // Bootstrap's "info" color, bright cyan
  font-weight: bold;
`;

const Search = ({ onSubmit }: SearchProps) => {
  const [inputValue, setInputValue] = useDelayedSearch(onSubmit);
  const [suggestions, setSuggestions] = useState<{name: string, path: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Static data for demonstration, now with objects
  const allSuggestions = [
    { name: 'Suggestion 1', path: '/suggestion-1' },
    { name: 'Suggestion 2', path: '/suggestion-2' },
    { name: 'Suggestion 3', path: '/suggestion-3' },
    { name: 'Suggestion 4', path: '/suggestion-4' },
    { name: 'Suggestion 5', path: '/suggestion-5' },
    { name: 'Suggestion 6', path: '/suggestion-6' },
    { name: 'Suggestion 7', path: '/suggestion-7' },
    { name: 'Suggestion 8', path: '/suggestion-8' },
    { name: 'Suggestion 9', path: '/suggestion-9' },
    { name: 'Suggestion 10', path: '/suggestion-10' }
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
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filteredSuggestions.length === 0) {
        filteredSuggestions = allSuggestions.filter(suggestion =>
          value.toLowerCase().split('').every(char =>
            suggestion.name.toLowerCase().includes(char))
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
            <SuggestionLink key={index} href={suggestion.path} onClick={() => {
              setInputValue(suggestion.name);
              setSuggestions([]);
              onSubmit(suggestion.name);
            }}>
              {highlightMatch(suggestion.name, inputValue)}
            </SuggestionLink>
          ))}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  )
}

export { Search };
