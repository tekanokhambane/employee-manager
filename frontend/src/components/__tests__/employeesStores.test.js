// Runnable Unit Tests

import assert from 'assert';
import { describe, expect, it } from 'vitest'
import { useEmployeesStore } from '../../stores/employeesStore';
import { createPinia } from 'pinia'

const state = () => {
    return useEmployeesStore();
}

describe('Initial state', () => {
    it('should initialize employees as an empty array', () => {
        // create global pinia
        const pinia = createPinia();
        const store = useEmployeesStore(pinia);
        assert.deepStrictEqual(store.employees, []);
    });

    it('should initialize skills as an empty array', () => {
        const initialState = state();
        assert.deepStrictEqual(initialState.skills, []);
    });

    it('should initialize filterDate as an empty string', () => {
        const initialState = state();
        assert.strictEqual(initialState.filterDate, '');
    });

    it('should initialize selectedFilter as an empty string', () => {
        const initialState = state();
        assert.strictEqual(initialState.selectedFilter, '');
    });

    it('should initialize updatedData as null', () => {
        const initialState = state();
        assert.strictEqual(initialState.updatedData, null);
    });

    it('should initialize dataChanged as false', () => {
        const initialState = state();
        assert.strictEqual(initialState.dataChanged, false);
    });

    it('should initialize message as null', () => {
        const initialState = state();
        assert.strictEqual(initialState.message, null);
    });

    it('should initialize newEmployee with empty strings and an empty skills array', () => {
        const initialState = state();
        assert.deepStrictEqual(initialState.newEmployee, {
            first_name: '',
            last_name: '',
            date_of_birth: '',
            email: '',
            phone_number: '',
            address: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            skills: []
        });
    });
});