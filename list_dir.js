var fs = require('fs');

module.exports = {
    listDir: function (path, myCallback) {
        var resultObj = [];

        fs.readdir(path, function (err, data) {
            console.log('In listDir');
            if (err) {
                switch(err.code){
                    case 'EACCES':
                        return myCallback({errno: err.errno, description: 'An attempt was made to access a file in a way forbidden by its file access permissions.'}, null);
                    case 'ENOENT':
                        return myCallback({errno: err.errno, description: 'The specified path does not exist.'});
                    case 'EPERM':
                        return myCallback({errno: err.errno, description: 'An attempt was made to perform an operation that requires elevated privileges.'})
                    case 'ENOTDIR':
                        return myCallback({errno: err.errno, description: 'The specified path is not a directory.'})

                }
                return myCallback(err, null);
            }

            var itemsCompleted = 0;
            data.forEach(function (value) {
                fs.lstat(path + '/' + value, function (err, stats) {
                    itemsCompleted++;
                    if (err) {
                        console.log(err);
                    } else {
                        if (stats.isFile()) {
                            resultObj.push({
                                type: 'file',
                                name: value,
                                size: stats['size']
                            });
                            //resultObj.push(value);
                            //console.log(resultObj + '\n');
                        } else if (stats.isDirectory()) {
                            resultObj.push({
                                type: 'folder',
                                name: value,
                                size: stats['size']
                            });
                        }
                    }

                    if (itemsCompleted >= data.length) {
                        //console.log(resultObj);
                        return myCallback(null, resultObj)
                    }
                });
            });
        });
    }
};

