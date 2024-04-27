import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import diagramList from '../assets/data/diagram-list.json';
import { Suggestion } from '../models/suggestion.model';

type SearchProps = {
  onSubmit: (value: string) => void;
};

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
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
  display: block;
  padding: 8px 16px;
  color: #f8f9fa;
  text-decoration: none;
  cursor: pointer;
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <Highlight key={index}>{part}</Highlight> : part
    );
  };

  const fetchSuggestions = (value: string) => {
    if (value.length > 0) {
      const filteredSuggestions = diagramList.filter(suggestion =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
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

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]);
    onSubmit(suggestion.name);
    navigate(`/diagram/${suggestion.path}`, { state: { diagramName: suggestion.name, path: suggestion.path } });
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
            <SuggestionItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {highlightMatch(suggestion.name, inputValue)}
            </SuggestionItem>
          ))}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  );
}

export { Search };
