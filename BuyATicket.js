document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault()
    var ticketType = document.getElementById('ticketType').value
    var quantity = parseInt(document.getElementById('quantity').value)
    var totalPrice = 0
    var price = 0
    if(ticketType == 'regular'){
        price = 44
    }
    else if (ticketType == 'vip'){
        price = 145 
    }
    else{
        price = 50
    }
    
   if (ticketType =='regular'){
    for (var i = 0; i < quantity; i++) {
        
        var priceForDiscount = price

        if(discount == 'Physically disable' || discount == 'solider' || discount == 'senior citizen'){
            priceForDiscount -= 29
        }
        else if (discount == 'card company'){
            priceForDiscount *= 0.8
        }
        else{
            priceForDiscount == price
        }

        totalPrice += priceForDiscount
    }
}
else{
    totalPrice = price * quantity
}

    document.getElementById('totalPrice').innerText = 'סך הכל לתשלום: ' + totalPrice.toFixed(2) + ' ש"ח'
})

function createDiscountFields(quantity) {
    var discountsContainer = document.getElementById('discountsContainer')
    discountsContainer.innerHTML = '' 
    
    for (var i = 0; i < quantity; i++) {
        var discountSelect = document.createElement('select')
        discountSelect.id = 'discount_' + i
        discountSelect.innerHTML = `
            <option value="none">none</option>
            <option value="Physically disable">Physically disable</option>
            <option value="solider">solider</option>
            <option value="card company">card company</option>
            <option value="senior citizen">senior citizen</option>
        `
        
        var label = document.createElement('label')
        label.innerText = 'discount (if you have) - for num ' + (i + 1) + ': '
        
        discountsContainer.appendChild(label)
        discountsContainer.appendChild(discountSelect)
        discountsContainer.appendChild(document.createElement('br'))
    }
}

createDiscountFields(1)

document.getElementById('quantity').addEventListener('input', function() {
    var quantity = parseInt(this.value)
    createDiscountFields(quantity)
})
