import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import diagramList from '../assets/data/diagram-list.json';
import { Suggestion } from '../models/suggestion.model'; // Assuming this is your type definition
import { formatPath } from '../helpers/format-path';

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
  word-break: break-word;
`;

const Highlight = styled.span`
  color: #0dcaf0; // Bootstrap's "info" color, bright cyan
  font-weight: bold;
`;

const tooltipStyles = `
  .tooltip-dark .tooltip-inner {
    padding:10px;
    background-color: #343a40; /* Dark background */
    color: #f8f9fa; /* Light text */
  }
  .tooltip-dark .tooltip-arrow::before {
    border-top-color: #343a40; /* Arrow color for top tooltip */
  }
`;

const Search = ({ onSubmit }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTooltip = (props: any, suggestionPath: string) => (
    <Tooltip id="button-tooltip" {...props} className="tooltip-dark">
      {suggestionPath}
    </Tooltip>
  );

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
      setSuggestions([]);
      setInputValue('');
      if (!document.activeElement || document.activeElement !== inputRef.current) {
        setSuggestions([]);
      }
    }, 150);
  };

  const formatDiagramName = (title: string): string => { 
    return title.replace('/ Diagram /', '');
};

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.name);
    setSuggestions([]);
    onSubmit(suggestion.name);
    navigate(`${suggestion.path}`, { state: { diagramName: formatDiagramName(suggestion.name), path: suggestion.path } });
  };

  return (
    <SearchContainer>
      <style>{tooltipStyles}</style>
      <input
        ref={inputRef}
        className="form-control"
        type="text"
        name="search"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Search for diagrams..."
        autoComplete="off"
      />
      {inputValue.length > 0 && (
        <SuggestionsDropdown>
          {suggestions.map((suggestion, index) => (
            <OverlayTrigger
              key={index}
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, formatPath(suggestion.path))}
            >
              <SuggestionItem onClick={() => handleSuggestionClick(suggestion)}>
                {highlightMatch(suggestion.name, inputValue)}
              </SuggestionItem>
            </OverlayTrigger>

))}
          {!suggestions.length && (
            <SuggestionItem>
              No suggestions found for <Highlight>{inputValue}</Highlight>
            </SuggestionItem>
          )}
        </SuggestionsDropdown>
      )}
    </SearchContainer>
  );
};

export { Search };