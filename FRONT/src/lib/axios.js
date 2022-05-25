import Axios from 'axios'

class API {
    adapter
    constructor() {
        this.adapter = Axios.create()
        this.token = localStorage.getItem('token')


        if(this.token){
            this.adapter.interceptors.request.use((config)=>{
                config.headers.Authorization = `Bearer ${this.token}`
                return config
            })
        }

    }

    getTodos(){
        return this.adapter.get('https://task-manager-devhouse.herokuapp.com/api/tasks?populate=image&populate=users_permissions_users')
    }

    addTodo(data){
        return this.adapter.post(`https://task-manager-devhouse.herokuapp.com/api/tasks`, data)
    }
    updateTodo(id, data){
        return this.adapter.put(`https://task-manager-devhouse.herokuapp.com/api/tasks/${id}`, {data})
    }
    deleteTodo(id){
        return this.adapter.delete(`https://task-manager-devhouse.herokuapp.com/api/tasks/${id}`)
    }

    login(data){
        return this.adapter.post('https://task-manager-devhouse.herokuapp.com/api/auth/local', data).then((response)=>{
            localStorage.setItem('token', response.data.jwt)
        })
    }

    register(data) {
        return this.adapter.post('https://task-manager-devhouse.herokuapp.com/api/auth/local/register', data)
    }

}

export default new API()
