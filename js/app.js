let cart = [];
let modalQt = 1;
modalkey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el)
//Listagem dos Hambugueres
burguer.map((item, index)=>{
    let burgerItem = c('.models .product-item').cloneNode(true);
    modalQt = 1;
    burgerItem.setAttribute('data-key', index)
    burgerItem.querySelector('.name').innerHTML = item.name;
    burgerItem.querySelector('.price').innerHTML = `R$ ${item.price.toFixed(2)}`
    burgerItem.querySelector('img').src = item.img
    burgerItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.product-item').getAttribute('data-key')//closest é ache o elemento mais próximo que tenha o referencial('')
        modalQt = 1;
        modalkey = key;
        c('.burgerName').innerHTML = burguer[key].name;
        c('.burgerBig img').src = burguer[key].img;
        c('.burger-desc').innerHTML = burguer[key].description;
        c('.actualPrice').innerHTML = `R$ ${burguer[key].price.toFixed(2)}`;


        c('.burgerInfo--qt').innerHTML = modalQt


        c('.burgerArea').style.opacity = 0
        c('.burgerArea').style.display = 'flex'
        setTimeout(()=>{
            c('.burgerArea').style.opacity = 1
        },200);
        

    })



   c('.area-burger').append(burgerItem)
})

//Eventos do MODAL
c('.cancel-button').addEventListener('click', removeWindown)

function removeWindown(){
    c('.burgerArea').style.opacity = 0
    setTimeout(()=>{
        c('.burgerArea').style.display ='none'
    },500);
}

c('.burgerInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){
        modalQt--;
        c('.burgerInfo--qt').innerHTML = modalQt;
    }
});
c('.burgerInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.burgerInfo--qt').innerHTML = modalQt;
});

c('.add-button').addEventListener('click', ()=>{
    let identifier = burguer[modalkey].id;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:burguer[modalkey].id,
            qt:modalQt,
        });
    };
    updatecart();
    removeWindown();
})
//CART 
c('.back').addEventListener('click',()=>{
    c('aside').style.display = 'none'
});
function updatecart(){
    c('.cart-area-info').innerHTML = '';
    let subtotal = 0;
    let desconto = 0;
    let total = 0; 
    if(cart.length > 0){
        c('aside').style.display = 'block';
        for(let i in cart){
            let burgeritem = burguer.find((item)=>item.id == cart[i].id);
            subtotal += burgeritem.price * cart[i].qt;
            let clonecart = c('.models .cart-item').cloneNode(true);
            clonecart.querySelector('img').src = burgeritem.img;
            clonecart.querySelector('.cart-item-name').innerHTML = burgeritem.name;
            clonecart.querySelector('.cart--burguerInfo--qt').innerHTML = cart[i].qt;
            clonecart.querySelector('.cart--burguerInfo--qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                } else{
                    cart.splice(i, 1);
                }
                updatecart();
            });
            clonecart.querySelector('.cart--burguerInfo--qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updatecart();
            })

            c('.cart-area-info').append(clonecart);
        }

        desconto = subtotal*0.1
        total = subtotal - desconto

        c('.subtotal span:last-child').innerHTML = subtotal.toFixed(2);
        c('.desconto span:last-child').innerHTML = desconto.toFixed(2);
        c('.total span:last-child').innerHTML = total.toFixed(2);

    } else{
        c('aside').style.display = 'none'
    }
}
//scroll
c('.button').addEventListener('click',(e)=>{
    e.preventDefault();
    scrollTo(0,600)
});
c('.sectionbutton .button').addEventListener('click',(e)=>{
    e.preventDefault();
    scrollTo(0,600)
});

