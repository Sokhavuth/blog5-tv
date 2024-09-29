import { error } from '@sveltejs/kit'
import pageDb from "$lib/db/page.js"
import { setFlash } from 'sveltekit-flash-message/server'
import { redirect } from 'sveltekit-flash-message/server'

export async function load({ locals }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const count = await pageDb.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await pageDb.getPages(locals, settings.dashboard)

    return {user, count, settings, items, info:"ទំព័រ​ស្តាទិក", type:"page", pageNumber}
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​បង្កើត​ទំព័រ​ស្តាទិក​​ទេ!' }, cookies)
            return
        }

		const data = await request.formData()
        
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
            await pageDb.createPage(locals)
            setFlash({ type: 'success', message: 'ទំព័រ​ស្តាទិក​​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
	}
}