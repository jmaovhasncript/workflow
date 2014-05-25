/***
 * model class holds the data
 * and APIs to manipulate data
 */
if (!window.workflow) window.workflow = {};

workflow.model = function () {
    var data = null;
    /**
     * public API to set data
     * @param item  data array
     */
    this.setData = function (item) {
        data = item.length > 0 ? item : {}
    };

    /***
     * public return data
     * @returns {*}
     */
    this.getData = function () {
        return data;
    };

    /***
     * public add new item
     * @param groupId  : to identify which group the item to be pushed
     * @param item : item to be pushed
     */

    this.addItem = function (groupId, item) {
        var itemData = findGroup(groupId);
        itemData.items.push(item);
    };

    /**
     * public remove item from one group and add to another
     * @param source :  remove item from source group
     * @param dest :  add item to dest group
     * @param itemId : to remove particular item from group
     * @returns {boolean} true if sucess else false
     */

    this.swapGroup = function (source, dest, itemId) {

        if (source == dest) return;

        var SourceGroup = findGroup(source);
        var destinationGroup = findGroup(dest);

        var item = removeGroupItem(SourceGroup, itemId);
        if (!item)  return false;

        addGroupItem(dest, item);
        return true;
    };

    this.editItem = function (groupId, itemId, data) {
        var group = findGroup(groupId);
        var itemData = findGroupItem(group, itemId);
        if (!itemData) return false;

        itemData.item.data = data;

        return true;
    };

    this.getValue = function (id) {
        return findGroup(id);
    };


    var findGroup = function (id) {
        if (id == null) return null;
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].groupId === id) {
                return data[i];
            }
        }
        return null;

    };

    var findGroupItem = function (group, itemId) {
        var i = 0,
            items = group.items,
            len = items.length,
            item = null;

        for (; i < len; i++) {
            item = items[i];

            if (item.itemId == itemId) {
                return {
                    item: item,
                    index: i
                };
            }
        }
        return null;
    };

    var removeGroupItem = function (group, itemId) {
        var item = findGroupItem(group, itemId);
        if (!item) return null;

        return group.items.splice(item.index, 1);

    };

    var addGroupItem = function (group, item) {
        if (!group && !group.item) return null;

        group.item.push(item);
    }


}