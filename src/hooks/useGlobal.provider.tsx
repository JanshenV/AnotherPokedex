import { useState, useEffect } from "react";


export default function useGlobalProvider() {

  const [mode, setMode] = useState('');
  const [searchInput, setSearchInput] = useState('');

  return {
    mode, setMode,
    searchInput, setSearchInput
  }
}