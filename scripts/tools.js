/*
 * 根据数据创建文件夹
 * */
function showList(data) {
    rightContainer.innerHTML = '';
    data.forEach(function(v, k) {
        createFolder(v);
    })

    var parents = getParentsAll( currentParentId );
    if (!parents) {
        parents = [];
    }

    showCrumbs( parents );
}


/*
* 显示面包屑导航
* */
function showCrumbs(data) {
    var crumbs = document.getElementById('crumbs');

    var html = '<span folderId="0">顶级</span>';
    for ( var i=data.length - 1; i>=0; i-- ) {

        html += ' / <span folderId="'+ data[i].id +'">'+ data[i].name + '</span>';

    }
    var self = getById(currentParentId);
    if (self) {
        html += ' / <span folderId="'+ self.id +'">'+ self.name +'</span>';
    }
    crumbs.innerHTML = html;

    var spans = crumbs.getElementsByTagName('span');
    for ( var i=0; i<spans.length; i++ ) {
        spans[i].onmousedown = function() {
            currentParentId = this.getAttribute('folderId');
            var fileData = getChildren(currentParentId);
            showList( fileData );
        }
    }
}

/*
 * 创建文件夹的函数
 * */
function createFolder(data) {
    var fileBox = document.createElement('div');
    fileBox.className = 'fileBox';
    fileBox.isSelected = false;
    fileBox.fileId = data.id;

    var fileImage = document.createElement('div');
    fileImage.className = 'fileImage';

    var fileText = document.createElement('div');
    fileText.className = 'fileText';
    fileText.innerHTML = data.name;


    //选择
    var checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    checkbox.style.display = 'none';

    checkbox.onmousedown = function() {
        if (fileBox.isSelected) {
            this.className = 'checkbox';
            this.innerHTML = '';
        } else {
            this.className = 'checkboxed';
            this.innerHTML = '√';
        }
        fileBox.isSelected = !fileBox.isSelected;
    }


    fileBox.onmouseover = function() {
        this.className = 'fileBoxSelected';
        checkbox.style.display = 'block';
    }
    fileBox.onmouseout = function() {
        if (!this.isSelected) {
            this.className = 'fileBox';
            checkbox.style.display = 'none';
        }
    }

    fileBox.ondblclick = function() {
        currentParentId = this.fileId;

        var fileData = getChildren(currentParentId);
        showList( fileData );
    }

    fileBox.appendChild(fileImage);
    fileBox.appendChild(fileText);
    fileBox.appendChild(checkbox);
    rightContainer.appendChild(fileBox);
}



/*
* ******************************************************
* */

/*
 * 获取最大的id值
 * */
function getMaxId() {
    var maxId = dataList[0].id;
    dataList.forEach(function(v, k) {
        if ( v.id > maxId ) {
            maxId = v.id;
        }
    })
    return maxId;
}

/*
* 根据指定的id查找所有的父级
* */
function getParentsAll(id) {
    var parents = [];
    var parent = getParent(id);
    if (parent) {
        parents.push(parent);
        if (parent.parentId != 0) {
            var p = getParentsAll( parent.id );
            parents = parents.concat(p);
        }
    }
    return parents;
}

/*
* 根据指定的id查找父级
* */
function getParent(id) {
    var data = getById(id);
    if (data) {
        return getById(data.parentId);
    }
}


/*
* 根据指定id获取元素
* */
function getById(id) {
    for (var i=0; i<dataList.length; i++) {
        if (dataList[i].id == id ) {
            return dataList[i];
        }
    }
}

/*
 * 根据传入的父级id查找子级数据
 * */
function getChildren(parentId) {
    var data = [];
    dataList.forEach(function(v, k) {
        if (v.parentId == parentId) {
            data.push( v );
        }
    });
    return data;
}

