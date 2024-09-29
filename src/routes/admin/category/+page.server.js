import { error } from '@sveltejs/kit'
import categoryDB from "$lib/db/category.js"
import { setFlash } from 'sveltekit-flash-message/server'
import { redirect } from 'sveltekit-flash-message/server'

export async function load({ locals }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const count = await categoryDB.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await categoryDB.getCategories(locals, settings.dashboard)

    return {user, count, settings, items, info:"ជំពូក", type:"category", pageNumber}
    
}

export const actions = {
    create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​បង្កើត​ជំពូក​ទេ!' }, cookies)
            return
        }
        const data = await request.formData()
        
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
            await categoryDB.createCategory(locals)
            setFlash({ type: 'success', message: 'ជំពូក​​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}