import pageDb from "$lib/db/page.js"
import { redirect } from 'sveltekit-flash-message/server'

export async function GET({ locals, params, cookies }){
    const user = locals.user
    if(!user){throw redirect(307, '/login')}
    
    locals.params = params

    if(user.role !== "Admin"){
        redirect('/admin/page', { type: 'error', message: 'អ្នក​គ្មាន​សិទ្ធ​លុប​ទំព័រ​ស្តាទិក​​ទេ!' }, cookies)
        return
    }
    
    await pageDb.deletePage(locals)
    redirect('/admin/page', { type: 'success', message: 'លុប​បាន​ដោយ​ជោគជ័យ' }, cookies)
}