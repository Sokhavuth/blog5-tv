import categoryDB from "$lib/db/category.js"
import { redirect } from 'sveltekit-flash-message/server'
import { setFlash } from 'sveltekit-flash-message/server'
import { error } from '@sveltejs/kit'

export async function load({ locals, params, url }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    locals.params  = params
    const navPage = url.searchParams.get('p')
    locals.body = {page:navPage}

    const count = await categoryDB.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const category = await categoryDB.getCategory(locals)
    const items = await categoryDB.paginate(locals, settings.dashboard)

    return {user, count, settings, category, items, info:"ជំពូក", type:"category", pageNumber, navPage}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​​ជំពូក​ទេ!' }, cookies)
            return
        }

        const data = await request.formData()

        const params = {}
        params.id = data.get('id')
        locals.params = params

        const label = data.get('label')
        const thumb = data.get("thumb")
        const datetime = data.get("datetime")

        const validate = (
            typeof label === 'string' && label !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof datetime === 'string' && datetime !== ''
        )
        
	    if(validate){
            locals.body = {label, thumb, datetime}
            await categoryDB.updateCategory(locals)
            setFlash({ type: 'success', message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}