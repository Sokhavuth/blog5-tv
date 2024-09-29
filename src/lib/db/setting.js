//models/setting.js

class Setting{
    async count(req){
        return await req.prisma.setting.count()
    }
    async createSetting(req){
        const setting = {
            title: req.body.title,
            description: req.body.description,
            dashboard: parseInt(req.body.dashboard),
            frontend: parseInt(req.body.frontend),
            categories: parseInt(req.body.categories),
            thumb: req.body.thumb,
            date: req.body.date
        }

        await req.prisma.setting.create({ data: setting })
    }

    async getSettings(req, amount){
        const settings = await req.prisma.setting.findMany({ 
            take: amount, 
            orderBy: [{ date: "desc" }, { id: "desc" }]
        })
        return settings
    }

    async getSetting(req){
        return await req.prisma.setting.findUnique({ where: {id: req.params.id }})
    }

    async paginateSettings(req, amount){
        const settings = await req.prisma.setting.findMany({ 
            orderBy: [{ date: "desc" }, { id: "desc" }],
            skip: amount * (parseInt(req.body.page)-1),
            take: amount
        })

        return settings
    }

    async updateSetting(req){
        const setting = {
            title: req.body.title,
            description: req.body.description,
            dashboard: parseInt(req.body.dashboard),
            frontend: parseInt(req.body.frontend),
            categories: parseInt(req.body.categories),
            thumb: req.body.thumb,
            date: req.body.date
        }

        await req.prisma.setting.update({ where: {id: req.params.id }, data: setting })
    }

    async deleteSetting(req){
        await req.prisma.setting.delete({ where: {id: req.params.id } })
    }
}

export default new Setting()