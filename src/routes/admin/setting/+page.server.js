import { error } from '@sveltejs/kit'
import settingDB from "$lib/db/setting.js"
import { setFlash } from 'sveltekit-flash-message/server'
import { redirect } from 'sveltekit-flash-message/server'

export async function load({ locals }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    
    const count = await settingDB.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const items = await settingDB.getSettings(locals, settings.dashboard)

    return {user, count, settings, items, info:"setting ", type:"setting", pageNumber}
}

export const actions = {
    create: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​បង្កើត​​ setting ទេ!' }, cookies)
            return
        }

        const data = await request.formData() 
        
        const title = data.get('title')
        const description = data.get("description")
        const dashboard = data.get("dashboard")
        const frontend = data.get("frontend")
        const categories = data.get("categories")
        const thumb = data.get("thumb")
        const date = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof description === 'string' && description !== '' &&
            typeof dashboard === 'string' && dashboard !== '' &&
            typeof frontend === 'string' && frontend !== '' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== ''
        )

        if(validate){
            locals.body = {title, description, dashboard, frontend, categories, thumb, date}
            await settingDB.createSetting(locals)
            setFlash({ type: 'success', message: 'setting ​​មួយ​ត្រូវ​បាន​បង្កើត​ឡើង!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    },

    update: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​​ setting ​ទេ!' }, cookies)
            return
        }

        const data = await request.formData()
        
        const title = data.get('title')
        const description = data.get("description")
        const dashboard = data.get("dashboard")
        const frontend = data.get("frontend")
        const categories = data.get("categories")
        const thumb = data.get("thumb")
        const date = data.get("datetime")

        const validate = (
            typeof title === 'string' && title !== '' &&
            typeof description === 'string' && description !== '' &&
            typeof dashboard === 'string' && dashboard !== '' &&
            typeof frontend === 'string' && frontend !== '' &&
            typeof categories === 'string' && categories !== '' &&
            typeof thumb === 'string' && thumb !== '' &&
            typeof date === 'string' && date !== ''
        )
        
	    if(validate){
            locals.body = {title, description, dashboard, frontend, categories, thumb, date}
            await settingDB.updateSetting(locals)
            setFlash({ type: 'success', message: 'setting ​​​ត្រូវ​បាន​កែប្រែ!' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}