
const updateLastSeen = (id, Model) => {
    
    return new Promise(resolve=>{
        Model.findOneAndUpdate({
            '_id': id
          }, {
            'last_seen': new Date()
          }, {
            fields: {
              'security.accesscode': 0,
              'security.accesskey': 0,
              'document_status': 0
            },
            new: true
          }, (err, user) => {
            if (err) {
              resolve({ success: false, user: {} });
            } else {
                resolve({ success: true, user });
            }
          });
    });
    
}

exports.updateLastSeen = updateLastSeen;

