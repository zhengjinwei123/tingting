module.exports = {
    getNowYear: function(timestamp) {
        var date = null;
        if (timestamp) {
            date = new Date(timestamp)
        } else {
            date = new Date()
        }
        return date.getFullYear();
    }
}