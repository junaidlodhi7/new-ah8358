var config = {
    apiKey: "AIzaSyA6iqgA93_6v6UmAtzVNApWPOvTmlbMrbQ",
    authDomain: "ah8358-50ab9.firebaseapp.com",
    databaseURL: "https://ah8358-50ab9.firebaseio.com",
    projectId: "ah8358-50ab9",
    storageBucket: "ah8358-50ab9.appspot.com",
    messagingSenderId: "590824439259"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

   function snapshotToArray () {
    var returnArr = [];
    firebase.database().ref().child('users').once('value', function(snapshot) {
        var content = '';
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        content += '<tr>';
        // content += '<td>' + childSnapshot.key + '</td>'; //column1
        content += '<td>' + childSnapshot.val().Name + '</td>'; //column1
        content += '<td>' + childSnapshot.val().Address + '</td>';//column2
        content += '<td>' + childSnapshot.val().Email1 + '</td>';
        content += '<td>' + childSnapshot.val().Phone + '</td>';
        var id = childSnapshot.key;
        content += '<td> <button value="'+ childSnapshot.key+'" class="btn-danger" onclick="del(this.value)">Delete</button> </td>';
        content += '<td> <button value="'+ childSnapshot.key+'" class="btn-primary" onclick="update(this.value)">Update</button> </td>';
        content += '</tr>';

        returnArr.push(item);
    });
    $('#tableID').find('tbody').append(content);
});
    return returnArr;
};
snapshotToArray();



     
var abc= function() {

    $.ajax
    ({
    type: "GET",
    url: "/api/users",
    success: function(res)
    {
       
        alert(res);
    }
    });
};

var AddIntoFireBase = function(){
    event.preventDefault();
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    var Name = $('#Name').val();
    var Email1 = $('#Email1').val();
    var Phone = $('#Phone').val();
    var Address = $('#Address').val();
    var password = $('#password').val();

    var UserObject ={
        "Name": Name,
        "Email1":Email1,
        "Phone":Phone,
        "Address":Address,
        "password":password
    };
        const usersRef = firebase.database().ref().child('users').push(UserObject).key;
        location.reload();
        console.log(usersRef);
}

var del = function (btnObj) {
    const userRef = firebase.database().ref().child('users/'+btnObj);
  userRef.remove();
  location.reload();
};

var update = function (btnBjt) {
    //const userRef = firebase.database().ref().child('users/'+btnBjt);
    //console.log(userRef);
};

