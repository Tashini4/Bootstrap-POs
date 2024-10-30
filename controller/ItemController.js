import {customer_array, item_array} from "../db/database.js";
import ItemModels from "../models/itemModels.js";

const clearForm = () => {
    $('#itemForm')[0].reset(); // Reset the form fields
    let selectedItemIndex = undefined; // Reset the selected item index
    $("#itemTableBody tr").removeClass("table-active"); // Clear any row highlights
};

const loadItemTable = () => {
    $('#itemTableBody').empty();
    item_array.map((item,index) => {
        console.log(item);
        let data = `<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.description}</td>
            <td>${item.price}</td></tr>`
        $('#itemTableBody').append(data);
    })
}

//Add Item
$('#item_add_btn').on("click", function (){
    let name = $('#itemName').val();
    let qty = $('#qty').val();
    let description = $('#itemDescription').val();
    let price = $('#price').val();

    if (name.length===0){
        alert("invalid name");
    }
    if (qty.length===0){
        alert("invalid qty");
    }
    if (description.length===0){
        alert("invalid description");
    }
    if (price.length===0){
        alert("invalid price");
    }else {
        let item = new ItemModels(
            item_array.length+1,
            name,
            qty,
            description,
            price
        );
        new ItemModels();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "item has been saved",
            showConfirmButton: false,
            timer: 1500
        });

        item_array.push(item);
        loadItemTable();
        clearForm();
    }
});

let selected_item_index =null
$('#itemTableBody').on("click","tr",function () {
    selected_item_index = $(this).index(); // Get the index of the clicked row
    let item = item_array[selected_item_index]; // Get the item data
    // Populate the form with the selected item's data
    $('#itemName').val(item.name);
    $('#qty').val(item.qty);
    $('#itemDescription').val(item.description);
    $('#price').val(item.price);

    // Highlight the selected row
    $("#itemTableBody tr").removeClass("table-active"); // Remove highlight from all rows
    $(this).addClass("table-active"); // Highlight the selected row
});

$('#item_delete_btn').on("click",function () {
    if (selected_item_index !== undefined) {
        item_array.splice(selected_item_index, 1); // Remove the selected item
        loadItemTable(); // Refresh the table
        clearForm(); // Clear the form
    } else{
        alert("Please select an item to delete.");
    }
});
$('#item_update_btn').on("click",function (){
    if (selected_item_index !== undefined) {
        let name = $('#itemName').val().trim();
        let qty = $('#qty').val().trim();
        let description = $('#itemDescription').val().trim();
        let price = $('#price').val().trim();

        if (name.length === 0 || qty.length === 0 || isNaN(qty) || qty <= 0 ||
            description.length === 0 || price.length === 0 || isNaN(price) || price < 0) {
            alert("Please fill out all fields correctly.");
            return;
        }

        // Update the selected item
        item_array[selected_item_index] = new ItemModels(
            selected_item_index + 1, // Keep the same ID for simplicity
            name,
            qty,
            description,
            price
        );

        loadItemTable(); // Refresh the table
        clearForm(); // Clear the form
        selected_item_index = undefined; // Reset selection
    } else {
        alert("Please select an item to update.");
    }
});


