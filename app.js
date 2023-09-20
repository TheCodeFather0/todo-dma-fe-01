const users = [
    {id:0,name:'Ramin',surname:'Mamamdzada',age:21},
    {id:1,name:'Sada',surname:'Sukurlu',age:12},
    {id:2,name:'Muxtar',surname:'Rehmanov',age:8},
    {id:3,name:'Rəman',surname:'Bayramov',age:400},
];
const usersContainer = document.getElementById("usersContainer");
const addUserForm = document.getElementById('addUserForm');
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const ageInput = document.getElementById('ageInput');


const showData = () => {
    usersContainer.innerHTML = "";
    users.forEach(user => {
        let data = `<tr><td>${user.id}</td><td>${user.name}</td><td>${user.surname}</td><td>${user.age}</td><td> <button onclick="deleteUser(${user.id})")>❌</button></td></tr>`;
        usersContainer.innerHTML += data;
    });
}
showData();


addUserForm.onsubmit = (e) => {
    e.preventDefault();

    const nameInputValue = nameInput.value;
    const surnameInputValue = surnameInput.value;
    const ageInputValue = ageInput.value;
   
    if (nameInputValue.trim() && surnameInputValue.trim() && ageInputValue) {
        const data = {
            id:users.length + 1,
            name:nameInputValue,
            surname:surnameInputValue,
            age:ageInputValue
        }
        users.push(data)
        showData();
        addUserForm.reset();
        Swal.fire(
            'Good job!',
            'User elave edildi!',
            'success'
          )
    
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Xanalarin hamsini doldurmaq lazimdir!'
          })
    }
}


const deleteUser = (id) => {
 

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Silmek isteyirsenmi?',
        text: "Eger silsen geri qaytara bilmeyeceksen lakin bir refreslik cani var!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sil getsin!',
        cancelButtonText: 'Bagisda qaqa elim deyib!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            users.filter((user,index) => user.id != id || users.splice(index,1))
            showData();
          swalWithBootstrapButtons.fire(
            'Sildindi getdi!',
            'Refres etsen geri qayidacaq',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Silmirsen',
            'daha diqqetli ol :)',
            'error'
          )
        }
      })
}