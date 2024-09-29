import pageDb from "$lib/db/page.js"
import { redirect } from 'sveltekit-flash-message/server'
import { error } from '@sveltejs/kit'
import { setFlash } from 'sveltekit-flash-message/server'

export async function load({ locals, params, url }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    locals.params  = params
    const navPage = url.searchParams.get('p')
    locals.body = {page:navPage}

    const count = await pageDb.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const page = await pageDb.getPage(locals)
    const items = await pageDb.paginatePages(locals, settings.dashboard)

    return {user, count, settings, page, items, info:"ទំព័រ​ស្តាទិក", type:"page", pageNumber, navPage}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​ទំព័រ​ស្តាទិក​​ទេ!' }, cookies)
            return
        }
        const data = await request.formData()

        const params = {}
        params.id = data.get('id')
        locals.params = params

        const title = data.get('title')
        const content = data.get('content')
        const thumb = data.get("thumb")
        const datetime = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' && content !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof datetime === 'string' && datetime !== ''
        )
        
	    if(validate){
            locals.body = {title, content, thumb, datetime}
            await pageDb.updatePage(locals)
            setFlash({ type: 'success', message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}