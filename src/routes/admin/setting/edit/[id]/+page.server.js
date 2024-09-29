import settingDb from "$lib/db/setting.js"
import { redirect } from 'sveltekit-flash-message/server'
import { setFlash } from 'sveltekit-flash-message/server'
import { error } from '@sveltejs/kit'

export async function load({ locals, params, url }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    locals.params  = params
    const navPage = url.searchParams.get('p')
    locals.body = {page:navPage}

    const count = await settingDb.count(locals) 
    const settings = await locals.settings(locals)
    const pageNumber = Math.ceil(count/settings.dashboard)
    const setting = await settingDb.getSetting(locals)
    const items = await settingDb.paginateSettings(locals, settings.dashboard)

    return {user, count, settings, setting, items, info:"setting ", type:"setting", pageNumber, navPage}
}

export const actions = {
    update: async ({ request, locals, cookies }) => {
        if(locals.user.role !== 'Admin'){
            setFlash({ type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​កែប្រែ​​​ setting ​ទេ!' }, cookies)
            return
        }

        const data = await request.formData() 

        const params = {}
        params.id = data.get('id')
        locals.params = params
        
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
            await settingDb.updateSetting(locals)
            setFlash({ type: 'success', message: 'ការ​កែប្រែ​​សំរេច​បាន​ដោយ​ជោគជ័យ' }, cookies)
        }else{
            throw error(420, "ទិន្នន័យ​បញ្ជូន​មក​មិន​ត្រឹមត្រូវ​ទេ!")
        }
    }
}