if (!window.workflow) window.workflow = {};

workflow.view = function () {

    var model = new workflow.model();
    model.setData(data);

    var index = 0;

    this.init = function () {
        var template = document.getElementById("workflowTmpl");
        template = _.template(template.innerHTML, data);
        document.getElementById("workflow").innerHTML = template;
        addListener('click', document.getElementsByClassName("addItem"), this.addItem);
        $("#workflow li").live("blur", this.editItem);
        $("#workflow .column").each(function () {
            this.addEventListener("dragenter", function (e) {
                e.preventDefault();
            });
            this.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            this.addEventListener("drop", function (e) {
                $(this).find("ul").append($("[data-id='" + e.dataTransfer.getData("id") + "']").detach());
            });
        });

    };

    this.editItem = function (event) {
        var el = event.target;
        var parentElement = event.target.parentNode.parentNode;
        var groupId = parseInt(parentElement.dataset.id);
        var itemId = parseInt(el.dataset.id);

        model.editItem(groupId, itemId, el.innerHTML);

        console.log(event);
    };

    this.addItem = function (event) {
        var template = document.getElementById('workflowItem');
        var item = {
            itemId: Date.now(),
            text: "item " + (index++)
        };
        var parentElement = event.target.parentNode;
        var id = parseInt(parentElement.dataset.id);

        model.addItem(id, data);
        template = $(_.template(template.innerHTML, item));

        $(parentElement).find('ul').append(template);
        template[0].addEventListener("dragstart", function (e) {
            if (!e.target && !e.target.dataset) return;
            try {
                e.dataTransfer.setData("id", e.target.dataset.id);
            } catch (e) {

            }

        });
    };


    var addListener = function (event, item, callback) {
        var i = 0 , len = item.length;
        if (!len) {
            if (item) {
                item.addEventListener(event, callback);
            }
            return;
        }
        for (; i < len; i++) {
            item[i].addEventListener(event, callback);
        }

    };

    var removeListener = function (event, item, callback) {
        item.removeEventListener(event, callback);
    };
};