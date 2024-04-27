import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import diagramList from '../assets/data/diagram-list.json';

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

const SuggestionLink = styled(Link)`
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
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<{name: string, path: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) => 
      regex.test(part) ? <Highlight key={index}>{part}</Highlight> : part
    );
  };

  const fetchSuggestions = (value: string) => {
    if (value.length > 0) {
      const filteredSuggestions = diagramList.filter(suggestion =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit the number of suggestions to 5
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
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
            <SuggestionLink key={index} to={`${suggestion.path}`} onClick={() => {
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
  );
}

export { Search };
