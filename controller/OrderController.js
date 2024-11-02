import {customer_array,item_array, order_array} from "../db/database.js";
import ItemModels from "../models/itemModels.js";
import OrderModel from "../models/orderModels.js";
import CustomerModel from "../models/customerModels.js";

let TableItemId = null;
let orderTableDb = [];
/////////////////////////////////////////////////////////////////
/*Populate Customer in Order CustomerID Selection */
/////////////////////////////////////////////////////////////////

function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customer1");

    // Clear existing options if any
    customerSelect.innerHTML = "";

    // Loop through CustomerDB to create option elements
    customer_array.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        customerSelect.appendChild(option);
    });

}
function handleCustomerSelection() {
    const customerSelect = document.getElementById("customer1");
    const nameField = document.getElementById("name1");
    const addressField = document.getElementById("address1");

    // Find the selected customer from CustomerDB
    const selectedCustomerId = customerSelect.value;

    TableItemId = selectedCustomerId;

    const customer = customer_array.find(c => {
        return String(c.id) === String(selectedCustomerId);
    });
    // Update name and address fields if a customer is found
    if (customer) {
        nameField.value = customer.firstName;
        addressField.value = customer.address;
    } else {
        nameField.value = "";
        addressField.value = "";
    }
}

$("#customer1").on("click",function (){
    handleCustomerSelection();
});

/////////////////////////////////////////////////////////////////
/*Populate Item in Order ItemID Selection */
/////////////////////////////////////////////////////////////////

function populateItemDropdown(){
    const itemSelect = document.getElementById("item");

    itemSelect.innerHTML = "";

    item_array.forEach(item => {
        const option = document.createElement("option");
        option.value = item.Itemid;
        option.textContent = item.Itemid;
        itemSelect.appendChild(option);
    });
}

function handleItemSelection(){
    const itemSelect = document.getElementById("item");
    const ItemName = document.getElementById("itemName1");
    const price = document.getElementById("price1");
    const qty = document.getElementById("qty1");

    const selectedItemId = itemSelect.value;

    const item = item_array.find(i => {
        return String(i.Itemid) === String(selectedItemId);
    });


    if (item) {
        ItemName.value = item.itemName;
        price.value = item.price;
        qty.value = item.qty;
    } else {
        ItemName.value = "";
        price.value = "";
        qty.value = "";
    }
}
$("#item").on("click", function (){
    handleItemSelection();
});

/////////////////////////////////////////////////////////////////
/*Genarate Order Id */
/////////////////////////////////////////////////////////////////

function genarateOrderId () {
    if (order_array.length === 0) return 'O001'

    const lastOrderId = order_array[order_array.length - 1].orderId;
    const lastIdNum = parseInt(lastOrderId.slice(1),10);
    return 'O' + String(lastIdNum + 1).padStart(3, '0');
}

/////////////////////////////////////////////////////////////////
/*Content Load */
/////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const orderIdField = document.getElementById("orderID");
    if (orderIdField) {
        orderIdField.value = genarateOrderId();
    } else {
        console.error("Order ID field not found");
    }


});

$("#Order").on("click",function (){
    populateCustomerDropdown();
    populateItemDropdown();
});

/////////////////////////////////////////////////////////////////
/*Add to table */
/////////////////////////////////////////////////////////////////

const orderTable = () => {
    const itemId = $('#item').val();
    const itemName = $('#itemName1').val();
    const price = $('#price1').val();
    const qtyOnHand = $('#qty1').val();
    const orderQty = $('#orderQty').val();
    const total = price * orderQty;

    const orderItem = {
        itemId,
        itemName,
        price,
        qtyOnHand,
        orderQty,
        total
    };
    orderTableDb.push(orderItem);

    $("#OrderTable").empty();
    orderTableDb.forEach(order => {
        let orderData = `<tr>
            <td>${order.itemId}</td>
            <td>${order.itemName}</td>
            <td>${order.price}</td>
            <td>${order.orderQty}</td>
            <td>${order.total}</td>
        </tr>`;
        $("#OrderTable").append(orderData);
    });
}

const clearForm = () => {
    $('#customer1').val('');
    $('#item').val('');
    $('#itemName1').val('');
    $('#qty1').val('');
    $('#orderQty').val('');
    $('#price1').val('');
    $('#name1').val('');
    $('#address1').val('');
    $('#Total').val('');
    $('#date').val('');
    genarateOrderId();
}

/////////////////////////////////////////////////////////////////
/* Add Item  */
/////////////////////////////////////////////////////////////////

$("#AddItem").on('click', function() {
    orderTable();
    clearForm();
});

/////////////////////////////////////////////////////////////////
/* Set total */
/////////////////////////////////////////////////////////////////

