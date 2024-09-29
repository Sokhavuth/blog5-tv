import { redirect } from '@sveltejs/kit'

export function GET({ cookies }){
    cookies.delete("access_token", { path: "/" })
    redirect(307, '/login')
}