import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createPinia } from 'pinia'
import EmplpoyeeList from '../EmployeeList.vue'
import EmployeeItemVue from '../EmployeeItem.vue'
import useEmployeesStore from '../../stores/employeesStore'

describe('EmployeeList.vue Test', () => {
    it('should render correctly', () => {
        const wrapper = shallowMount(EmplpoyeeList, {
            global: {
                plugins: [createPinia()]
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render child components', () => {
        const wrapper = shallowMount(EmplpoyeeList, {
            global: {
                plugins: [createPinia()]
            }
        })
        expect(wrapper.findComponent(EmployeeItemVue)).toBeTruthy()
    })

    it('should render child components', () => {
        const wrapper = shallowMount(EmplpoyeeList, {
            global: {
                plugins: [createPinia()]
            }
        })
        expect(wrapper.findComponent(EmployeeItemVue).exists())
    })



})

