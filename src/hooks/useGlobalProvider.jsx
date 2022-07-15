import { useState, useEffect } from 'react';

export default function useGlobalProvider() {

    return {
        useState, useEffect,
    };
};