import DB from "../utils/Database";
class Role {
    constructor(saveID) {
        this.id = undefined;
        let data = DB.get(saveID, true);
        if (data) {
            for (const key in data) { // 赋值
                this[key] = data[key];
            }
            if (!this.color) this.color = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
        }
    }
    save() {
        DB.set(this.id, this, true);
    }
    getMaxHp() {
        return Role.maxHp(this.level, this.resist);
    }
    getMaxMp() {
        return Role.maxMp(this.level, this.wisdom);
    }
    getMaxExp() {
        return Math.pow(this.level, 4) + 88;
    }
    getHpValue(v) {
        return Math.ceil(this.hp / this.getMaxHp() * v);
    }
    getMpValue(v) {
        return Math.ceil(this.mp / this.getMaxMp() * v);
    }
    getExpValue(v) {
        return Math.ceil(this.exp / this.getMaxExp() * v);
    }
    getClassicalName() {
        let names = {mage:'法师',warrior:'战士',swordsman:'剑客',assassin:'刺客',monster:'士兵',boss:'BOSS',mageboss:'BOSS'}
        return names[this.classical];
    }
    // 普通进攻计算
    attack() {
        let isMagician = (this.classical === 'mage' || this.classical === 'mageboss');
        let isCrit = Math.random() < this.crit; // 是否暴击
        let atk = this.power;
        if (isMagician) atk = this.wisdom;
        let aggressivity = atk * this.level + this.weapon.attr.atk * this.weapon.attr.star;
        if (isCrit) {
            aggressivity = aggressivity * this.criticalDamage;
        } else {
            aggressivity = aggressivity * (Math.random() * 0.1 + 0.95);
        }
        return aggressivity;
    }
    // 被攻击计算实际伤害
    beAttacked(aggressivity) {
        let def = this.resist * this.level + this.weapon.attr.def * this.weapon.attr.star;
        let injure = aggressivity - def * (Math.random() * 0.1 + 0.9);
        if (injure < 0) injure = 0;
        return Math.ceil(injure);
    }
    // 受伤（返回是否死亡）
    injured(ihp) {
        this.hp = this.hp - ihp;
        if(this.hp < 0)
        {
            this.hp = 0;
            return true;
        }
        return false;
    }
    static maxHp(level, resist) {
        return Math.pow(level, 3) * resist + 100
    }
    static maxMp(level, wisdom) {
        return Math.pow(level, 2) * wisdom
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
            gold: 0,    // 财富
            mineral: 0, // 矿石（用于武器升星）
            chapter: {  // 剧本
                file: '赵云传',
                chapter: 0,
                line: 0,
                pid: 0
            },
            crit: Math.random() * 0.5, // 暴击率
            criticalDamage: Math.random() * 1.5 + 1.5, // 暴击伤害
            spells: [] // 技能（通过副本获得）
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
                data.resist = Math.floor(Math.random() * 30) + 10;  // 抵抗（防御）
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
                weapon.name = '';
                weapon.attr = { // 武器能力
                    star: 1,
                    atk: 0,
                    def: 0
                }
                data.wisdom = Math.floor(Math.random() * 10) + 0;
                data.power = Math.floor(Math.random() * 70) + 30;
                data.speed = Math.floor(Math.random() * 50) + 50;
                data.resist = Math.floor(Math.random() * 50) + 50;
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
                data.resist = Math.floor(Math.random() * 100) + 200;
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
                data.resist = Math.floor(Math.random() * 50) + 200;
                break
            }
            default: {
                
            }
        }
        data.hp = Role.maxHp(data.level, data.resist);
        data.mp = Role.maxMp(data.level, data.wisdom);
        data.weapon = weapon;
        DB.set(data.id, data, true);
        return data.id
    }
}

export default Role;