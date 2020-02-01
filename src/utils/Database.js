class Database {
    static set(key, value, isJson) {
        if (isJson) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }
    static get(key, isJson) {
        let dt = localStorage.getItem(key)
        if (isJson) {
            if (dt && dt.length > 0) {
                return JSON.parse(dt);
            }
            return;
        } else {
            return dt;
        }
    }
}

export default Database;