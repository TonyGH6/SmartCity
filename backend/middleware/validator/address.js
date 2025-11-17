import vine from '@vinejs/vine';

const addAddress = vine.object ({
    city:vine.string().trim(), 
    postalCode:vine.number(), 

})

const updateAddress= vine.object ({
    city:vine.string().trim().optional(), 
    postalCode:vine.string().optional()
})


const addAddressValidator = vine.compile(addAddress);
const updateAddressValidator = vine.compile(updateAddress); 
