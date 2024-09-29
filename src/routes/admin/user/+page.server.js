import { error } from '@sveltejs/kit'
import userDb from "$lib/db/user.js"
import { setFlash } from 'sveltekit-flash-message/server'
import { redirect } from 'sveltekit-flash-message/server'

export async function load({ locals }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}

    const count = await userDb.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await userDb.getUsers(locals, settings.dashboard)

    return {user, count, settings, items, info:"អ្នក​និពន្ធ", type:"user", pageNumber}
}

export const actions = {
	create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​ចុះ​ឈ្មោះ​អ្នក​និពន្ធ​​​ទេ!' }, cookies)
            return
        }

		const data = await request.formData()
        
        const title = data.get('title')
        const content = data.get('content')
        const role = data.get('role')
        const email = data.get('email')
        const password = data.get('password')
        const thumb = data.get("thumb")
        const datetime = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof content === 'string' &&
            typeof role === 'string' && role !== '' &&
            typeof email === 'string' && email !== '' &&
            typeof password === 'string' && password !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof datetime === 'string' && datetime !== ''
        )
        
		if(validate){
            locals.body = {title, content, role, email, password, thumb, datetime}
            await userDb.createUser(locals)
            setFlash({ type: 'success', message: 'អ្នក​និព្ធ​ម្នាក់​ត្រូវ​បាន​ចុះ​ឈ្មោះ​!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
	}
}