//cus array
let customer_array =[];
let item_array =[];
let order_array=[];

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td>`
        $("#customerTableBody").append(data);
    })
}
const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.description}</td><td>${item.qty}</td><td>${item.price}</td></tr>`
        $("#itemTableBody").append(data);
    })
}
const loadOrderTable = () => {
    $("#orderTableBody").empty();
    order_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.customer}</td><td>${item.item}</td><td>${item.quantity}</td><td>${item.price}</td><td>${item.total}</td></tr>`
        $("#orderTableBody").append(data);
    })
}

//add customer
$("#customer_add_button").on("click", function (){
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    let customer = {
        id : customer_array.length + 1,
        first_name : first_name,
        last_name : last_name,
        mobile : mobile,
        email : email,
        address : address

    }
    customer_array.push(customer);
    loadCustomerTable();

});
// add item
$("#item_add_button").on("click", function (){
    let description = $('#description').val();
    let price = $('#price').val();
    let qty = $('#qty').val();


    let item = {
        id : item_array.length + 1,
        description : description,
        price : price,
        qty : qty

    }
    item_array.push(item);
    loadItemTable();


});
// add order
$("#order_add_btn").on("click", function (){
    let customer = $('#customerSelect').val();
    let description= $('#itemSelect').val();
    let qty = $('#quantity').val();
    /* let price = $('#').val();
     let total = $('#price').val();
 */

    let order = {
        id : order_array.length + 1,
        customer : customer,
        item : description,
        quantity : qty,
        price : price,
        total : total

    }
    item_array.push(order);
    loadOrderTable();


});