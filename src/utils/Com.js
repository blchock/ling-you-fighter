class Com {
    static gblen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    }
}

export default Com;