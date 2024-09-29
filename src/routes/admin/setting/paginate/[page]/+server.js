import settingDb from "$lib/db/setting.js"
import { json } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    
    locals.body = params
    const settings = await locals.settings(locals)
    const items = await settingDb.paginateSettings(locals, settings.dashboard)
    return json(items)
}