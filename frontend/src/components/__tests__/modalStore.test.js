import { useModalStore } from '../../stores/modalStore'
import { describe, expect, it, vi } from 'vitest'
import { createPinia } from 'pinia'




describe('useModalStore', () => {

    // initializes state with default values
    it('should initialize state with default values when localStorage.getItem("employeeData") returns null', () => {
        const pinia = createPinia();
        const store = useModalStore(pinia);
        expect(store.isModalOpen).toBe(false);
        expect(store.isUpdatingEmployee).toBe(false);
        expect(store.employeeId).toBe(null);
        expect(store.employeeData).toBe(null);
    });

    // sets employeeData to null when state is initialized and localStorage.getItem('employeeData') returns null
    it('should set employeeData to null when state is initialized and localStorage.getItem(employeeData) returns null', () => {
        const pinia = createPinia();
        const store = useModalStore(pinia);
        expect(store.employeeData).toBe(null);
    });

    // sets isModalOpen to true and isUpdatingEmployee to false when openModalForCreate is called
    it('should set isModalOpen to true and isUpdatingEmployee to false when openModalForCreate is called', () => {
        // Arrange
        const employeesStore = {
            newEmployee: {}
        }
        const store = useModalStore()

        // Act
        store.openModalForCreate(employeesStore)

        // Assert
        expect(store.isModalOpen).toBe(true)
        expect(store.isUpdatingEmployee).toBe(false)
    });

    // // sets isUpdatingEmployee to true and employeeData to localStorageEmployeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData
    it('should set isUpdatingEmployee to true and employeeData to localStorageEmployeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData', () => {


        const store = useModalStore()

        const localStorageEmployeeData = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '1990-01-01',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip_code: '12345',
            country: 'USA',
            skills: ['JavaScript', 'React']
        }
        localStorage.setItem('employeeData', JSON.stringify(localStorageEmployeeData))

        store.openModalForUpdate(localStorageEmployeeData, store.employeesStore)
        expect(store.isUpdatingEmployee).toBe(true)
        expect(store.employeeData).toStrictEqual(localStorageEmployeeData)


    });

    // // sets employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData does not exist or has a different id than employeeData
    it('should set employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData does not exist or has a different id than employeeData', () => {
        // Arrange
        const store = useModalStore()

        const employeeData = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '1990-01-01',
            email: 'john.doe@example.com',
            phone_number: '1234567890',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip_code: '12345',
            country: 'USA',
            skills: ['JavaScript', 'React']
        }
        store.openModalForUpdate(employeeData, store.employeesStore)
        expect(store.employeeData).toStrictEqual(employeeData)

    });

    // // sets isModalOpen to false and resets employeeData when closeModal is called
    it('should set isModalOpen to false and reset employeeData when closeModal is called', () => {
        // Arrange
        const employeesStore = {
            dataChanged: false,
            updatedData: null,
            message: null
        }
        const store = useModalStore()

        // Act
        store.closeModal(employeesStore)

        // Assert
        expect(store.isModalOpen).toBe(false)
        expect(store.employeeData).toBe(null)
    });

    // // sets isModalOpen to false, isUpdatingEmployee to false, and employeeData to null when closeModalWithoutRefresh is called
    it('should set isModalOpen to false, isUpdatingEmployee to false, and employeeData to null when closeModalWithoutRefresh is called', () => {
        // Arrange
        const store = useModalStore()

        // Act
        store.closeModalWithoutRefresh()

        // Assert
        expect(store.isModalOpen).toBe(false)
        expect(store.isUpdatingEmployee).toBe(false)
        expect(store.employeeData).toBe(null)
    });

    // // removes employeeData and related items from local storage when resetEmployeeData is called
    it('should remove employeeData and related items from local storage when resetEmployeeData is called', () => {
        // Arrange
        const store = useModalStore()

        // Act
        store.resetEmployeeData()

        // Assert
        expect(store.employeeData).toBe(null)
        expect(localStorage.getItem('employeeData')).toBe(null)
    });

    // // sets employeeData to parsed localStorage.getItem('employeeData') when state is initialized and localStorage.getItem('employeeData') returns a string
    it('should initialize state with default values when localStorage.getItem(employeeData) returns null', () => {
        // Act
        const store = useModalStore()

        // Assert
        expect(store.isModalOpen).toBe(false)
        expect(store.isUpdatingEmployee).toBe(false)
        expect(store.employeeId).toBe(null)
        expect(store.employeeData).toBe(null)
    });

    // // sets employeeData to null when openModalForCreate is called and employeesStore.newEmployee is not defined
    it('should set employeeData to null when openModalForCreate is called and employeesStore.newEmployee is not defined', () => {
        // Arrange
        const store = useModalStore()

        // Act
        store.openModalForCreate(undefined)

        // Assert
        expect(store.employeeData).toBe(null)
    });

    // // sets employeeData to null when openModalForUpdate is called and employeeData is not defined
    it('should set employeeData to null when openModalForUpdate is called and employeeData is not defined', () => {
        // Arrange
        const store = useModalStore()

        // Act
        store.openModalForUpdate(undefined)

        // Assert
        expect(store.employeeData).toBe(null)
    });

    // // sets employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData, but there are no differences between the two
    it('should set employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData, but there are no differences between the two', () => {


        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify({ id: 1, name: 'John Doe' })),
        }
        global.localStorage = localStorageMock

        const employeesStoreMock = {
            newEmployee: null
        }

        const store = useModalStore()

        // Act
        store.openModalForUpdate({ id: 1, name: 'John Doe' }, employeesStoreMock)

        // Assert
        expect(store.employeeData).toEqual({ id: 1, name: 'John Doe' })
        expect(employeesStoreMock.newEmployee).toEqual(null)



    });

    // // sets employeeData to localStorageEmployeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData, but there are differences between the two
    it('should set employeeData to localStorageEmployeeData when openModalForUpdate is called and localStorageEmployeeData exists and has the same id as employeeData, but there are differences between the two', () => {
        // Arrange
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify({ id: 1, name: 'John Doe' }))
        }
        global.localStorage = localStorageMock

        const employeesStoreMock = {
            newEmployee: null
        }

        const store = useModalStore()

        // Act
        store.openModalForUpdate({ id: 1, name: 'Jane Doe' }, employeesStoreMock)

        // Assert
        expect(store.employeeData).toEqual({ id: 1, name: 'John Doe' })
        expect(employeesStoreMock.newEmployee).toEqual({ id: 1, name: 'John Doe' })
        expect(store.isModalOpen).toBe(true)
    });

    // // sets employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData does not exist
    it('should set employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData does not exist', () => {
        // Arrange
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(null)
        }
        global.localStorage = localStorageMock

        const store = useModalStore()

        // Act
        store.openModalForUpdate({ id: 1 }, {})

        // Assert
        expect(store.employeeData).toEqual({ id: 1 })
    });

    // // sets employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData exists but has a different id than employeeData
    it('should set employeeData to employeeData when openModalForUpdate is called and localStorageEmployeeData exists but has a different id than employeeData', () => {
        // Arrange
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(JSON.stringify({ id: '1' }))
        }
        global.localStorage = localStorageMock

        const employeesStoreMock = {
            newEmployee: null
        }

        const store = useModalStore()

        // Act
        store.openModalForUpdate({ id: '2' }, employeesStoreMock)

        // Assert
        expect(store.employeeData).toEqual({ id: '2' })
    });

    // // sets isModalOpen to false and resets employeeData when closeModal is called and employeesStore is not defined
    it('should set isModalOpen to false and reset employeeData when closeModal is called and employeesStore is not defined', () => {
        // Arrange
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(null),
            removeItem: vi.fn(),
            setItem: vi.fn()
        }
        global.localStorage = localStorageMock


        const store = useModalStore()

        // Act
        store.closeModal()

        // Assert
        expect(store.isModalOpen).toBe(false)
        expect(store.employeeData).toBe(null)
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('employeeData')
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('updatedData')
        // expect(localStorageMock.setItem).toHaveBeenCalledWith('dataChanged', 'false')
    });

    // // sets isModalOpen to false, isUpdatingEmployee to false, and employeeData to null when closeModalWithoutRefresh is called and employeesStore is not defined
    it('should set isModalOpen to false, isUpdatingEmployee to false, and employeeData to null when closeModalWithoutRefresh is called and employeesStore is not defined', () => {
        // Arrange
        const store = useModalStore()

        // Act
        store.closeModalWithoutRefresh()

        // Assert
        expect(store.isModalOpen).toBe(false)
        expect(store.isUpdatingEmployee).toBe(false)
        expect(store.employeeData).toBe(null)
    });

    // // removes employeeData and related items from local storage when resetEmployeeData is called and they do not exist in local storage
    it('should remove employeeData and related items from local storage when resetEmployeeData is called and they do not exist in local storage', () => {
        // Arrange
        const localStorageMock = {
            getItem: vi.fn().mockReturnValue(null),
            removeItem: vi.fn(),
            setItem: vi.fn()
        }
        global.localStorage = localStorageMock

        // Act
        const store = useModalStore()
        store.resetEmployeeData()

        // Assert
        expect(localStorageMock.removeItem).toHaveBeenCalledTimes(2)
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('employeeData')
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('updatedData')
        // spy called with 'dataChanged' key and 'false' value when resetEmployeeData is called
        // expect(localStorageMock.setItem).toHaveBeenCalledWith('dataChanged', 'false')

    });

    // // sets employeesStore.newEmployee to default values when openModalForCreate is called
    it('should set employeesStore.newEmployee to default values when openModalForCreate is called', () => {
        // Arrange
        const employeesStore = {
            newEmployee: null
        }
        const store = useModalStore()

        // Act
        store.openModalForCreate(employeesStore)

        // Assert
        expect(employeesStore.newEmployee).toEqual({
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
        })
    });

    // // sets document.body.style.overflow to 'hidden' when openModalForCreate and openModalForUpdate are called
    it('should set document.body.style.overflow to \'hidden\' when openModalForUpdate is called', () => {
        // Arrange
        const store = useModalStore()
        document.body.style.overflow = 'auto'

        // Act
        store.openModalForUpdate({ id: 1 })

        // Assert
        expect(document.body.style.overflowY).toBe('hidden')
    });
});
