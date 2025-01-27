import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../types";

export async function findUserByEmail({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const reponse = await api.post(url,formData)
        return reponse.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id} : {projectId: Project['_id'], id : TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const reponse = await api.post<string>(url, {id})
        return reponse.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId : Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const {data} = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({projectId, userId} : {projectId: Project['_id'], userId : TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const reponse = await api.delete<string>(url)
        return reponse.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}