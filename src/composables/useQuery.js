import { useUserStore } from "@/stores/userStore"
import { storeToRefs } from "pinia"
import { useApiFetch } from "./useFetch"

export const useQuery = () => {
    const mainStore = useUserStore()
    const { isAuth, user, token } = storeToRefs(mainStore)

    const login = async (username, password) => {
        const { anyRequest } = useApiFetch()

        const response = await anyRequest('/login', { username, password })
        if (!response?.token) {
            console.log('Error in login when login syystem');
            
            return false
        }
        localStorage.setItem('jwt_token', response?.token)
        token.value = response?.token
        if (token.value) {
            isAuth.value = true
        }
        return true
    }

    const getMe = async () => {
        const { postRequest } = useApiFetch()

        const response = await postRequest('/users/me')
        user.value = response
    }

    const getPaged = async ({ serviceName }, params = {}) => {
        const { anyRequest } = useApiFetch()

        const response = await anyRequest(`/${serviceName}/getPaged`, params)
        return response
    }

    const getById = async ({ id, serviceName }) => {
        const { anyRequest } = useApiFetch()

        const response = await anyRequest(`/${serviceName}/getById`, id)
        return response
    }

    const create = async ({ item, serviceName }) => {
        const { postRequest } = useApiFetch()

        const response = await postRequest(`/${serviceName}/create`, item)
        return response
    }

    const register = async ({ item }) => {
        const { anyRequest } = useApiFetch()

        const response = await anyRequest(`/users/create`, item)
        return response
    }

    const update = async ({ item, serviceName }) => {
        const { postRequest } = useApiFetch()

        const response = await postRequest(`/${serviceName}/update`, item)
        return response
    }

    const remove = async ({ id, serviceName }) => {
        const { postRequest } = useApiFetch()

        const response = await postRequest(`/${serviceName}/remove`, id)
        return response
    }

    return {
        login, getMe, getPaged, create, update, remove, register, getById
    }
}