class Role {
    constructor(saveID) {
        this.id = undefined;
        let dt = localStorage.getItem(saveID);
        if (dt && dt.length > 0) {
            let data = JSON.parse(dt)
            for (const key in data) { // 赋值
                this[key] = data[key];
            }
            console.log("load:", this);
        }
    }
    /**
     * 创建角色
     * args：{
     * id: 存档名
     * name: 角色名
     * sex: 性别
     * classical: 职业
     * icon: 头像
     * }
     */
    static create(args) {
        let data = {
            id: args.id,
            name: args.name,
            sex: args.sex,
            classical: args.classical,
            icon: args.icon,
            level: args.level || 1,   // 等级
            exp: 0,     // 经验
            hp: 100,    // 血量
            mp: 0       // 法力
        }
        let weapon = {}
        switch (data.classical) {
            case 'mage': {
                weapon.name = '水晶魔法杖';
                weapon.attr = { // 武器能力
                    star: 1,
                    atk: Math.floor(Math.random() * 20) + 20,
                    def: 0
                }
                data.wisdom = Math.floor(Math.random() * 60) + 60; // 智慧
                data.power = Math.floor(Math.random() * 30) + 0;   // 力量
                data.speed = Math.floor(Math.random() * 50) + 30;  // 速度
                data.resist = Math.floor(Math.random() * 30) + 0;  // 抵抗（防御）
                data.mp = Math.floor(Math.random() * data.wisdom / 2) + data.wisdom // 法力
                break
            }
            case 'warrior': {
                weapon.name = '烈焰拳套';
                weapon.attr = { // 武器能力
                    star: 1,
                    atk: Math.floor(Math.random() * 5) + 5,
                    def: Math.floor(Math.random() * 10) + 10,
                }
                data.wisdom = Math.floor(Math.random() * 30) + 0;
                data.power = Math.floor(Math.random() * 60) + 60;
                data.speed = Math.floor(Math.random() * 50) + 30;
                data.resist = Math.floor(Math.random() * 80) + 30;
                break
            }
            case 'swordsman': {
                weapon.name = '青水流光剑';
                weapon.attr = { // 武器能力
                    star: 1,
                    atk: Math.floor(Math.random() * 15) + 15,
                    def: Math.floor(Math.random() * 5) + 5
                }
                data.wisdom = Math.floor(Math.random() * 50) + 50;
                data.power = Math.floor(Math.random() * 50) + 60;
                data.speed = Math.floor(Math.random() * 50) + 50;
                data.resist = Math.floor(Math.random() * 50) + 20;
                data.mp = 60 // 法力
                break
            }
            case 'assassin': {
                weapon.name = '鱼肠';
                weapon.attr = { // 武器能力
                    star: 1,
                    atk: Math.floor(Math.random() * 30) + 10,
                    def: 0
                }
                data.wisdom = Math.floor(Math.random() * 40) + 0;
                data.power = Math.floor(Math.random() * 80) + 40;
                data.speed = Math.floor(Math.random() * 60) + 60;
                data.resist = Math.floor(Math.random() * 30) + 10;
                break
            }
            case 'monster': {
                data.wisdom = Math.floor(Math.random() * 10) + 0;
                data.power = Math.floor(Math.random() * 70) + 30;
                data.speed = Math.floor(Math.random() * 50) + 50;
                data.resist = Math.floor(Math.random() * 50) + 50;
                data.hp = data.level * data.level * 100;
                break
            }
            case 'boss': {
                weapon.name = '魔剑';
                weapon.attr = { // 武器能力
                    star: 6,
                    atk: Math.floor(Math.random() * 100) + 80,
                    def: 30
                }
                data.wisdom = Math.floor(Math.random() * 100) + 0;
                data.power = Math.floor(Math.random() * 100) + 20;
                data.speed = Math.floor(Math.random() * 50) + 50;
                data.resist = Math.floor(Math.random() * 100) + 50;
                data.hp = data.level * data.level * 100 + data.level * 500;
                break
            }
            case 'mageboss': {
                weapon.name = '邪恶之力法杖';
                weapon.attr = { // 武器能力
                    star: 6,
                    atk: Math.floor(Math.random() * 100) + 100,
                    def: 0
                }
                data.wisdom = Math.floor(Math.random() * 80) + 50;
                data.power = Math.floor(Math.random() * 20) + 0;
                data.speed = Math.floor(Math.random() * 50) + 50;
                data.resist = Math.floor(Math.random() * 50) + 0;
                data.hp = data.level * data.level * 100 + data.level * 800;
                break
            }
        }
        data.weapon = weapon;
        localStorage.setItem(data.id, JSON.stringify(data));
        return data.id
    }
}


export default Role;