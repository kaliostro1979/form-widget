let selectData = [];

fetch('https://reqres.in/api/users?page=1')
    .then((req)=>{
        return req.json()
    })
.then((res)=>{
    res.data.map((e)=>{
        getUserData(e.first_name, e.last_name)
    })
});


function getUserData(first_name, last_name) {
    $('#cont_name').append('<option>' + `${first_name}  ${last_name}` + '</option>' );
}

