import pageDb from "$lib/db/page.js"
import { json } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export async function GET({ locals, params }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    locals.body = params
    const settings = await locals.settings(locals)
    const items = await pageDb.paginatePages(locals, settings.dashboard)
    return json(items)
}