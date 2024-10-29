import CustomerModels from "../models/customerModels.js";
import {customer_array} from "../db/database.js";
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

const cleanForm  = () => {
    $('#firstName').val("");
    $('#lastName').val("")
    $('#email').val("");
    $('#mobile').val("");
    $('#address').val("");
}

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr>
                    <td>${item.first_name}</td>
                    <td>${item.last_name}</td>
                    <td>${item.mobile}</td>
                    <td>${item.email}</td>
                    <td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    })
}

//Add Customer
$("#customer_add_btn").on("click", function() {
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    if(first_name.length===0){
        alert("invalid customer");
    }else if(last_name.length===0){
        alert("invalid last name");
    }else if(!validateEmail(email)){
        alert("invalid email");
    }else if(!validateMobile(mobile)){
        alert("invalid mobile");
    }else if(address.length===0){
        alert("invalid address");
    }else{
        let customer = new CustomerModels(
            customer_array.length + 1,
            first_name,
            last_name,
            mobile,
            email,
            address
        );
        new CustomerModels();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "customer has been saved",
            showConfirmButton: false,
            timer: 1500
        });

        customer_array.push(customer);
        loadCustomerTable();
        cleanForm();
    }
});


let selected_customer_index = null;
$('#customerTableBody').on("click", "tr", function () {
    let index = $(this).index();

    selected_customer_index = $(this).index();

    // get customer object by index
    let customer = customer_array[index];

    // get customer's data
    let first_name = customer.first_name;
    let last_name = customer.last_name;
    let email = customer.email;
    let mobile = customer.mobile;
    let address = customer.address;

    // fill data into the form
    $('#firstName').val(first_name);
    $('#lastName').val(last_name);
    $('#email').val(email);
    $('#mobile').val(mobile);
    $('#address').val(address);
});

$("#customer_delete_btn").on("click", function() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            customer_array.splice(selected_customer_index, 1);

            // clean customer form
            cleanForm();

            // reload the table
            loadCustomerTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your customer has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});


$("#customer_update_btn").on("click", function() {
    let index = selected_customer_index;

    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    // let customer = {
    //     id: customer_array[index].id,
    //     first_name: first_name,
    //     last_name: last_name,
    //     mobile: mobile,
    //     email: email,
    //     address: address
    // };

    let customer = new CustomerModels(
        customer_array[index].id,
        first_name,
        last_name,
        mobile,
        email,
        address
    );
    // update item
    customer_array[selected_customer_index] = customer;

    // clean customer form
    cleanForm();

    // reload the table
    loadCustomerTable();
});