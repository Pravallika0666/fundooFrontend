function filterBy(list, value) {
    if (!list) return null;
    if (!value) return value;
    return list.filter(function (item) {
        return item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
}

function filterBylabel(list, value) {
    return list.filter(function(item) {
    return item.indexOf(value) > -1;
    });
    }

module.exports = { filterBy,filterBylabel }