import ProfileForm from "@/components/profile/ProfilForm"
import { useAuth } from "@/hooks/useAuth"

export default function ProfileView() {
    const {data, isLoading} = useAuth()
    if(isLoading) return 'Cargando...'

    if(data) return <ProfileForm data={data}/>
}
