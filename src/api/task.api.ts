import { TaskDto } from './dto/tasks.dto';
import { CreateTaskDto } from "./dto/create-task.dto";

export class TaskAPI {
    public static async getAll() : Promise< TaskDto[]> {
        const response = await fetch ('http://localhost:3000/tasks', {
            method: "GET"
        })

        const data = await response.json();

        return data;
    }

    public static async createTask(createReq: CreateTaskDto) {
        const response = await fetch ('http://localhost:3000/tasks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createReq)
        })

        const data = await response.json();
        return data;
    }

    public static async deleteTask(id: string) {
        await fetch (`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        })
    }

    public static async updateTask(id: string, updateReq: CreateTaskDto) {
        const response = await fetch (`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateReq)
        })

        const data = await response.json();
        return data;
    }
}